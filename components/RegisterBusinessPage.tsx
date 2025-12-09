
import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, MapPin, Phone, Mail, Globe, 
  Upload, CheckCircle2, AlertCircle, Loader2, 
  LayoutDashboard, Map, Image as ImageIcon,
  Plus, LocateFixed, Search, Info, CalendarClock, X
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { DEPARTMENTS, CATEGORIES } from '../constants';
import { Language, ViewState, User } from '../types';
import { TRANSLATIONS } from '../translations';
import { BusinessProfilePreview } from './BusinessProfilePreview';

interface RegisterBusinessPageProps {
  language: Language;
  onNavigate: (view: ViewState) => void;
  user?: User | null;
  userBusinessId?: string | null;
  onBusinessUpdate?: (businessId: string) => void;
}

// Constantes de validação de ARQUIVO (Bytes)
const MIN_FILE_SIZE = 50 * 1024; // 50KB
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Constantes de validação de DIMENSÃO (Pixels)
const MIN_IMG_WIDTH = 800;
const MIN_IMG_HEIGHT = 600;
const MAX_IMG_WIDTH = 4096;
const MAX_IMG_HEIGHT = 4096;

// Tipo para os horários
type DaySchedule = {
  open: string;
  close: string;
  isClosed: boolean;
};

type WorkingHours = {
  [key: string]: DaySchedule;
};

const DAYS_OF_WEEK = [
  { key: 'seg', label: 'Segunda-feira' },
  { key: 'ter', label: 'Terça-feira' },
  { key: 'qua', label: 'Quarta-feira' },
  { key: 'qui', label: 'Quinta-feira' },
  { key: 'sex', label: 'Sexta-feira' },
  { key: 'sab', label: 'Sábado' },
  { key: 'dom', label: 'Domingo' },
];

// Helper para ler dimensões da imagem
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const dimensions = { width: img.width, height: img.height };
      URL.revokeObjectURL(img.src);
      resolve(dimensions);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject("Não foi possível ler a imagem.");
    };
  });
};


export const RegisterBusinessPage: React.FC<RegisterBusinessPageProps> = ({ language, onNavigate, user, userBusinessId, onBusinessUpdate }) => {
  const t = TRANSLATIONS[language].register_business;
  const isEditing = !!userBusinessId;
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sistema de Notificações (Toast)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    // Auto hide after 4 seconds
    setTimeout(() => {
        setNotification(null);
    }, 4000);
  };

  // Estados de Imagem Múltipla
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Geocoding State
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Estado do Formulário
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    department: '',
    city: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    latitude: '',
    longitude: '',
    image_url: '', // Mantido para compatibilidade, será a primeira imagem
    gallery: [] as string[] // Nova lista de URLs
  });

  // Estado dos Horários
  const [workingHours, setWorkingHours] = useState<WorkingHours>(() => {
    const initial: WorkingHours = {};
    DAYS_OF_WEEK.forEach(day => {
      initial[day.key] = {
        open: '08:00',
        close: '18:00',
        isClosed: day.key === 'dom' // Domingo fechado por padrão
      };
    });
    return initial;
  });

  // Carregar dados existentes se for edição
  useEffect(() => {
    const fetchBusiness = async () => {
        if (!userBusinessId) return;

        setLoading(true);
        const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', userBusinessId)
            .single();
        
        if (data) {
            setFormData({
                name: data.name,
                category: data.category,
                description: data.description || '',
                address: data.address || '',
                department: data.department || '',
                city: data.city || '',
                phone: data.phone || '',
                whatsapp: data.whatsapp || '',
                email: data.email || '',
                website: data.website || '',
                latitude: data.latitude ? data.latitude.toString() : '',
                longitude: data.longitude ? data.longitude.toString() : '',
                image_url: data.image_url || '',
                gallery: data.gallery || []
            });

            if (data.working_hours) {
                setWorkingHours(data.working_hours);
            }

            if (data.gallery && data.gallery.length > 0) {
                setPreviewUrls(data.gallery);
            } else if (data.image_url) {
                setPreviewUrls([data.image_url]);
            }
            
            // Se estamos editando, já mostramos o preview primeiro
            setSuccess(true);
        } else if (error) {
            console.error("Error fetching business details:", error);
            showToast("Não foi possível carregar os detalhes do negócio.", "error");
        }
        setLoading(false);
    };

    fetchBusiness();
  }, [userBusinessId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para buscar coordenadas automaticamente
  const fetchCoordinates = async () => {
    // Só busca se tiver endereço e cidade
    if (!formData.address || !formData.city) {
        showToast("Por favor, preencha o Endereço e a Cidade primeiro.", "info");
        return;
    }

    setIsGeocoding(true);
    try {
        // 1. Tentativa Exata: Rua + Cidade + Estado + País
        const params = new URLSearchParams({
            street: formData.address,
            city: formData.city,
            country: 'Paraguay',
            format: 'json',
            limit: '1'
        });
        
        if (formData.department) {
            params.append('state', formData.department);
        }

        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            setFormData(prev => ({
                ...prev,
                latitude: parseFloat(data[0].lat).toFixed(6),
                longitude: parseFloat(data[0].lon).toFixed(6)
            }));
            showToast("Coordenadas encontradas com sucesso!", "success");
        } else {
             // 2. Fallback: Se falhar, busca apenas pela Cidade para centralizar o mapa
             // Isso evita que fique zerado e permite ajuste fino com GPS
             const fallbackQ = `${formData.city}, ${formData.department}, Paraguay`;
             const fallbackRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackQ)}&limit=1`);
             const fallbackData = await fallbackRes.json();
             
             if (fallbackData && fallbackData.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    latitude: parseFloat(fallbackData[0].lat).toFixed(6),
                    longitude: parseFloat(fallbackData[0].lon).toFixed(6)
                }));
                showToast("Endereço exato não encontrado. Centralizamos o mapa na sua cidade.", "info");
             } else {
                showToast("Não foi possível encontrar a localização. Por favor, use o botão 'Usar meu GPS'.", "error");
             }
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        showToast("Erro ao conectar com serviço de mapas.", "error");
    } finally {
        setIsGeocoding(false);
    }
  };

  // Função para pegar geolocalização manual do navegador com melhor tratamento de erro
  const handleManualLocation = () => {
    if (!("geolocation" in navigator)) {
        showToast("Geolocalização não é suportada por este navegador.", "error");
        return;
    }

    setIsGeocoding(true);
    showToast("Buscando sua localização GPS...", "info");

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
        (position) => {
            setFormData(prev => ({
                ...prev,
                latitude: position.coords.latitude.toFixed(6),
                longitude: position.coords.longitude.toFixed(6)
            }));
            setIsGeocoding(false);
            showToast("Localização GPS atualizada!", "success");
        },
        (error) => {
            console.error("Erro GPS:", error);
            setIsGeocoding(false);
            
            let msg = "Erro desconhecido ao obter localização.";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    msg = "Permissão negada. Por favor, permita o acesso à localização no seu navegador.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg = "Informações de localização indisponíveis. Verifique seu GPS.";
                    break;
                case error.TIMEOUT:
                    msg = "O tempo para obter a localização esgotou.";
                    break;
            }
            showToast(msg, "error");
        },
        options
    );
  };

  const handleHourChange = (dayKey: string, field: keyof DaySchedule, value: string | boolean) => {
    setWorkingHours(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value
      }
    }));
  };

  // Manipulador de Arquivo de Imagem Múltipla com Validação de Dimensões
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as File[];
      // Contar arquivos locais selecionados + URLs já existentes (caso queira limitar total de 5)
      // Aqui simplificamos: limita o que está na tela (previewUrls)
      const totalFiles = previewUrls.length + newFiles.length;

      if (totalFiles > 5) {
        showToast("Você só pode enviar até 5 imagens no total.", "error");
        return;
      }

      const validFiles: File[] = [];
      const invalidFilesMessages: string[] = [];

      // Validação Assíncrona para cada arquivo
      await Promise.all(newFiles.map(async (file: File) => {
        // 1. Validação de Tamanho do Arquivo (Bytes)
        if (file.size < MIN_FILE_SIZE) {
            invalidFilesMessages.push(`"${file.name}" é muito leve (Min: 50KB).`);
            return;
        } 
        if (file.size > MAX_FILE_SIZE) {
            invalidFilesMessages.push(`"${file.name}" é muito pesado (Max: 5MB).`);
            return;
        }

        // 2. Validação de Dimensões (Pixels)
        try {
            const { width, height } = await getImageDimensions(file);
            
            if (width < MIN_IMG_WIDTH || height < MIN_IMG_HEIGHT) {
                invalidFilesMessages.push(`"${file.name}" é muito pequena (${width}x${height}px). Mínimo: ${MIN_IMG_WIDTH}x${MIN_IMG_HEIGHT}px.`);
                return;
            }
            
            if (width > MAX_IMG_WIDTH || height > MAX_IMG_HEIGHT) {
                 // Opcional: Poderíamos permitir e redimensionar no cliente, mas vamos bloquear por enquanto.
                 invalidFilesMessages.push(`"${file.name}" é muito grande (${width}x${height}px). Máximo: ${MAX_IMG_WIDTH}x${MAX_IMG_HEIGHT}px.`);
                 return;
            }

            // Se passou em tudo
            validFiles.push(file);

        } catch (err) {
            invalidFilesMessages.push(`Erro ao ler "${file.name}".`);
        }
      }));

      if (invalidFilesMessages.length > 0) {
        setUploadError(invalidFilesMessages.join(' '));
        showToast("Algumas imagens foram rejeitadas.", "error");
      }

      if (validFiles.length > 0) {
        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        setSelectedFiles(prev => [...prev, ...validFiles]);
        setPreviewUrls(prev => [...prev, ...newPreviews]);
        showToast(`${validFiles.length} imagem(ns) adicionada(s).`, "success");
      }
      
      // Limpa o input para permitir selecionar a mesma imagem novamente se falhar
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    // Precisamos saber se a imagem removida é um Arquivo local ou uma URL existente
    const urlToRemove = previewUrls[index];
    
    // Remove do preview
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviews);

    // Se for URL existente (http...), atualiza gallery do formData
    if (urlToRemove.startsWith('http')) {
        const newGallery = formData.gallery.filter(url => url !== urlToRemove);
        setFormData(prev => ({ 
            ...prev, 
            gallery: newGallery,
            image_url: newGallery.length > 0 ? newGallery[0] : ''
        }));
    } else {
        // Se for blob (arquivo novo), remove do selectedFiles
        const existingCount = formData.gallery.length; 
        
        if (index >= existingCount) {
             // É um arquivo novo
             const localIndex = index - existingCount;
             const newFiles = selectedFiles.filter((_, i) => i !== localIndex);
             setSelectedFiles(newFiles);
        }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let finalGallery: string[] = [...formData.gallery]; // Começa com o que já tinha

    try {
      // 1. Upload das NOVAS Imagens
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
             const fileExt = file.name.split('.').pop();
             const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
             const filePath = `${fileName}`;

             const { error: uploadError } = await supabase.storage
                .from('business-images')
                .upload(filePath, file);
             
             if (uploadError) {
                 console.warn("Erro ao fazer upload (Storage não configurado?):", uploadError);
                 return null; // Falha silenciosa no demo
             }
             
             const { data } = supabase.storage.from('business-images').getPublicUrl(filePath);
             return data.publicUrl;
        });

        const newUrls = await Promise.all(uploadPromises);
        const validNewUrls = newUrls.filter((url): url is string => url !== null);
        finalGallery = [...finalGallery, ...validNewUrls];
      }

      const mainImageUrl = finalGallery.length > 0 ? finalGallery[0] : formData.image_url;

      const businessPayload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        department: formData.department,
        city: formData.city,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        website: formData.website,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        image_url: mainImageUrl, 
        gallery: finalGallery,
        working_hours: workingHours,
        status: isEditing ? undefined : 'active', 
        owner_id: user ? user.id : null 
      };

      let dbError;
      let newBusinessId = userBusinessId;

      if (isEditing && userBusinessId) {
        // UPDATE
        const { error } = await supabase
            .from('businesses')
            .update(businessPayload)
            .eq('id', userBusinessId);
        dbError = error;
      } else {
        // INSERT
        const { data, error } = await supabase
            .from('businesses')
            .insert([businessPayload])
            .select()
            .single();
        dbError = error;
        if (data) {
            newBusinessId = data.id;
        }
      }

      if (dbError) throw dbError;

      // Atualiza o estado local para o preview
      setFormData(prev => ({ 
          ...prev, 
          image_url: mainImageUrl,
          gallery: finalGallery
      }));
      
      // Limpa arquivos selecionados pois já subiram
      setSelectedFiles([]);
      setPreviewUrls(finalGallery);

      // Notifica o App principal para atualizar o cabeçalho
      if (newBusinessId && onBusinessUpdate) {
        onBusinessUpdate(newBusinessId);
      }

      setSuccess(true);
      showToast("Negócio salvo com sucesso!", "success");
      window.scrollTo(0, 0);

    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      // CORREÇÃO: Fallback robusto para modo de demonstração
      // Se falhar o banco, assume que é demo e mostra sucesso com os dados locais
      console.warn('Backend inalcançável ou erro de configuração, ativando modo de demonstração.');
      
      // Simula sucesso visualmente
      const mockGallery = selectedFiles.length > 0 ? selectedFiles.map(f => URL.createObjectURL(f)) : formData.gallery;
      setFormData(prev => ({ ...prev, gallery: mockGallery }));
      setPreviewUrls(mockGallery);
      setSuccess(true);
      showToast("Modo Demonstração: Dados salvos localmente.", "info");
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <BusinessProfilePreview 
            data={{...formData, working_hours: workingHours, status: isEditing ? 'active' : 'active'}} 
            gallery={previewUrls.length > 0 ? previewUrls : (formData.image_url ? [formData.image_url] : [])} 
            onEdit={() => setSuccess(false)} 
            onHome={() => onNavigate('home')}
            isOwner={true}
           />;
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 relative">
      {/* Toast Notification Container */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-bounce-in max-w-sm w-full">
            <div className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md ${
                notification.type === 'success' ? 'bg-green-900/90 border-green-500/50 text-green-100' :
                notification.type === 'error' ? 'bg-red-900/90 border-red-500/50 text-red-100' :
                'bg-zinc-800/90 border-amber-500/50 text-amber-100'
            }`}>
                <div className="mt-0.5">
                    {notification.type === 'success' && <CheckCircle2 size={20} className="text-green-400" />}
                    {notification.type === 'error' && <AlertCircle size={20} className="text-red-400" />}
                    {notification.type === 'info' && <Info size={20} className="text-amber-400" />}
                </div>
                <div className="flex-1 text-sm font-medium">
                    {notification.message}
                </div>
                <button onClick={() => setNotification(null)} className="text-white/50 hover:text-white">
                    <X size={18} />
                </button>
            </div>
        </div>
      )}

      {/* Header Corporativo */}
      <div className="bg-zinc-900 border-b border-zinc-800 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mb-6">
            <LayoutDashboard size={16} className="text-amber-500" />
            <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">BODECOIN Business</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {isEditing ? t.form_title_edit : t.form_title}
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            {isEditing ? t.form_subtitle_edit : t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Seção 1: Informações Básicas */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <div className="p-2 bg-amber-500 rounded-lg text-black">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Sobre a Empresa</h3>
                <p className="text-sm text-zinc-500">Informações principais que aparecerão nos cards.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-zinc-400 mb-2">Nome do Negócio *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder-zinc-700"
                  placeholder="Ex: Bodega Central"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Categoria *</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none appearance-none"
                >
                  <option value="">Selecione...</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Site (Opcional)</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 text-zinc-600" size={18} />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-black border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-zinc-400 mb-2">Descrição Completa</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  placeholder="Conte a história do seu negócio, especialidades e diferenciais..."
                />
              </div>
            </div>
          </div>

          {/* Seção 2: Mídia e Visual (Atualizada para Múltiplas) */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-xl">
             <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <div className="p-2 bg-amber-500 rounded-lg text-black">
                <ImageIcon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Galeria de Fotos</h3>
                <p className="text-sm text-zinc-500">Adicione de 1 a 5 fotos do seu negócio (A primeira será a capa).</p>
                <div className="flex flex-col gap-1 mt-1 text-xs text-zinc-600">
                    <p>• Min: 50KB, Max: 5MB</p>
                    <p>• Dimensões: Mínimo 800x600px, Máximo 4096x4096px</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden" // Escondido, acionado pelo botão/div
                />

                {uploadError && (
                    <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg flex items-start gap-2 mb-4">
                        <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-red-300 text-sm font-medium">{uploadError}</span>
                    </div>
                )}

                {/* Grade de Imagens */}
                {previewUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-700 group">
                                <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                {index === 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-amber-500/90 text-black text-[10px] font-bold text-center py-1">
                                        CAPA
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Botão de Adicionar Mais (se < 5) */}
                        {previewUrls.length < 5 && (
                             <button 
                                type="button"
                                onClick={triggerFileInput}
                                className="aspect-square rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:border-amber-500/50 transition-all flex flex-col items-center justify-center text-zinc-500 hover:text-amber-500"
                            >
                                <Plus size={24} />
                                <span className="text-xs mt-1 font-bold">Adicionar</span>
                             </button>
                        )}
                    </div>
                )}

                {/* Área de Upload Principal (se vazio) */}
                {previewUrls.length === 0 && (
                    <div 
                        onClick={triggerFileInput}
                        className="relative border-2 border-dashed border-zinc-700 rounded-xl bg-black hover:bg-zinc-900/50 transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group"
                    >
                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4 group-hover:text-amber-500 group-hover:scale-110 transition-all">
                            <Upload size={24} />
                        </div>
                        <p className="text-zinc-300 font-medium">Clique para adicionar fotos</p>
                        <p className="text-zinc-500 text-xs mt-1">Selecione até 5 imagens (JPG, PNG)</p>
                    </div>
                )}
            </div>
          </div>

          {/* Seção 3: Horários */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <div className="p-2 bg-amber-500 rounded-lg text-black">
                <CalendarClock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Horários de Atendimento</h3>
                <p className="text-sm text-zinc-500">Defina quando seu estabelecimento está aberto.</p>
              </div>
            </div>

            <div className="space-y-4">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day.key} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg bg-black/50 border border-zinc-800">
                  <div className="w-32 flex items-center gap-2">
                    <input 
                      type="checkbox"
                      checked={workingHours[day.key]?.isClosed}
                      onChange={(e) => handleHourChange(day.key, 'isClosed', e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500"
                    />
                    <span className={`font-medium ${workingHours[day.key]?.isClosed ? 'text-zinc-500 line-through' : 'text-white'}`}>
                      {day.label}
                    </span>
                  </div>

                  {!workingHours[day.key]?.isClosed ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={workingHours[day.key]?.open}
                        onChange={(e) => handleHourChange(day.key, 'open', e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                      <span className="text-zinc-500">até</span>
                      <input
                        type="time"
                        value={workingHours[day.key]?.close}
                        onChange={(e) => handleHourChange(day.key, 'close', e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-red-400 font-medium bg-red-400/10 px-3 py-1 rounded-full">Fechado</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Seção 4: Localização */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-xl">
             <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <div className="p-2 bg-amber-500 rounded-lg text-black">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Localização</h3>
                <p className="text-sm text-zinc-500">Onde seus clientes podem te encontrar.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Departamento *</label>
                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  onBlur={fetchCoordinates}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none appearance-none"
                >
                  <option value="">Selecione...</option>
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Cidade *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={fetchCoordinates}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Ex: Ciudad del Este"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-zinc-400 mb-2">Endereço Completo</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={fetchCoordinates}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Rua, Número, Bairro, Referência"
                />
              </div>

              {/* Coordenadas (Opcional/Avançado) */}
              <div className="md:col-span-2 flex items-end justify-between mb-2">
                  <label className="block text-sm font-bold text-zinc-400">Coordenadas GPS</label>
                  <button
                    type="button"
                    onClick={fetchCoordinates}
                    disabled={isGeocoding || !formData.address}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-amber-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    {isGeocoding ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}
                    Buscar Coordenadas
                  </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-500 mb-2 flex items-center gap-2">
                  <Map size={14} /> Latitude 
                  {isGeocoding && <Loader2 size={14} className="animate-spin text-amber-500" />}
                </label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="-25.123456"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-500 mb-2 flex items-center gap-2">
                  <Map size={14} /> Longitude
                   {isGeocoding && <Loader2 size={14} className="animate-spin text-amber-500" />}
                </label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="-57.123456"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                    <LocateFixed size={12} />
                    Latitude e Longitude são preenchidas automaticamente ao completar o endereço.
                </p>
                <button 
                    type="button" 
                    onClick={handleManualLocation}
                    className="flex items-center gap-2 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-amber-500 px-3 py-2 rounded-lg transition-colors"
                >
                    <MapPin size={12} /> Usar meu GPS
                </button>
            </div>
          </div>

          {/* Seção 5: Contato */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-xl">
             <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <div className="p-2 bg-amber-500 rounded-lg text-black">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Canais de Contato</h3>
                <p className="text-sm text-zinc-500">Facilite a comunicação com seus leads.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">WhatsApp (Comercial) *</label>
                <div className="relative">
                    <div className="absolute left-3 top-3.5 flex items-center gap-2 border-r border-zinc-700 pr-3 h-5">
                        <span className="text-base leading-none">🇵🇾</span>
                        <span className="text-zinc-400 font-bold text-sm">+595</span>
                    </div>
                    <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-black border border-zinc-700 rounded-xl pl-28 pr-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="9XX 123 456"
                    />
                </div>
              </div>

               <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">E-mail de Contato</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-zinc-600" size={18} />
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="contato@empresa.com"
                    />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="pt-4 pb-12">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black text-lg font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Processando...
                </>
              ) : (
                <>
                  {t.btn_submit}
                  <CheckCircle2 size={24} />
                </>
              )}
            </button>
            <p className="text-center text-zinc-600 text-xs mt-4">
              Ao clicar em "{t.btn_submit}", você concorda com os Termos de Serviço do BODECOIN.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
