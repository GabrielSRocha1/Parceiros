
import React, { useState } from 'react';
import { 
  CheckCircle2, Star, Navigation, Bookmark, Phone, Globe, Share2, 
  MapPin, Clock, ChevronDown, LayoutDashboard 
} from 'lucide-react';

// Tipo para os horários (Duplicate from RegisterPage needed here or imported if extracted to types)
type DaySchedule = {
  open: string;
  close: string;
  isClosed: boolean;
};

type WorkingHours = {
  [key: string]: DaySchedule;
};

interface BusinessProfilePreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; 
  gallery: string[]; 
  onEdit?: () => void; 
  onHome: () => void;
  isOwner?: boolean;
}

// Helper para verificar se está aberto agora
const checkIsOpen = (hours: WorkingHours | null) => {
  if (!hours) return { isOpen: false, text: 'Horário não informado' };

  const now = new Date();
  const daysMap = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const currentDayKey = daysMap[now.getDay()];
  const schedule = hours[currentDayKey];

  if (!schedule || schedule.isClosed) {
    return { isOpen: false, text: 'Fechado' };
  }

  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const [openHour, openMin] = schedule.open.split(':').map(Number);
  const [closeHour, closeMin] = schedule.close.split(':').map(Number);
  
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  if (currentTime >= openTime && currentTime < closeTime) {
    return { isOpen: true, text: `Aberto • Fecha às ${schedule.close}` };
  }

  return { isOpen: false, text: `Fechado • Abre às ${schedule.open}` };
};

export const BusinessProfilePreview: React.FC<BusinessProfilePreviewProps> = ({ data, gallery, onEdit, onHome, isOwner = true }) => {
  const status = checkIsOpen(data.working_hours);
  const coverImage = gallery.length > 0 ? gallery[0] : (data.image_url || `https://source.unsplash.com/800x600/?${data.category ? data.category.split(' ')[0] : 'business'},building`);
  const [isSaved, setIsSaved] = useState(false);

  // Verifica disponibilidade dos dados para habilitar/desabilitar botões
  const hasPhone = !!(data.whatsapp || data.phone);
  const hasWebsite = !!(data.website && data.website.length > 0);

  // Ações dos Botões
  const handleRoute = () => {
    let mapUrl = '';
    if (data.latitude && data.longitude) {
        mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`;
    } else {
        const destination = encodeURIComponent(`${data.address}, ${data.city}, Paraguay`);
        mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    }
    window.open(mapUrl, '_blank');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Em produção, isso salvaria no banco de dados
  };

  const handleCall = () => {
    const phoneNum = data.phone || data.whatsapp; // Prioriza telefone fixo se houver, senão whats
    if (phoneNum) {
        // Remove tudo que não for dígito ou +
        const cleanNum = phoneNum.replace(/[^0-9+]/g, '');
        window.location.href = `tel:${cleanNum}`;
    }
  };

  const handleWebsite = () => {
    if (data.website) {
        let url = data.website;
        // Adiciona protocolo se faltar
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        window.open(url, '_blank');
    }
  };

  const handleShare = async () => {
    const shareData = {
        title: data.name,
        text: `Confira ${data.name} no BODECOIN!`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error sharing', err);
        }
    } else {
        alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header de Sucesso (Só aparece se for dono/editando) */}
      {isOwner && (
        <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-3 text-center">
            <p className="text-green-400 text-sm font-bold flex items-center justify-center gap-2">
            <CheckCircle2 size={16} />
            Visualização do Perfil Público
            </p>
        </div>
      )}

      {/* Botão Voltar (Se não for dono, ex: veio da home) */}
      {!isOwner && (
          <div className="max-w-5xl mx-auto px-4 pt-4">
               <button onClick={onHome} className="text-zinc-400 hover:text-amber-500 flex items-center gap-2 text-sm font-bold">
                   ← Voltar para a busca
               </button>
          </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coluna Principal (Estilo Perfil Google) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Card Principal */}
            <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
              {/* Capa */}
              <div className="relative h-64 md:h-80 bg-zinc-800 group">
                <img 
                  src={coverImage}
                  alt="Capa do Negócio" 
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-white shadow-black drop-shadow-md mb-1">{data.name}</h1>
                  <div className="flex items-center text-zinc-300 text-sm gap-2">
                     <span className="font-medium text-amber-500">{data.rating || '5.0'}</span>
                     <div className="flex text-amber-500">
                       {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                     <span className="text-zinc-500">• {data.category} • {data.city}</span>
                  </div>
                </div>
              </div>

              {/* Galeria de Miniaturas (se houver mais de 1) */}
              {gallery.length > 1 && (
                  <div className="flex gap-2 p-4 bg-zinc-900 overflow-x-auto">
                      {gallery.slice(1).map((img, idx) => (
                          <img key={idx} src={img} className="w-20 h-20 object-cover rounded-md border border-zinc-700" alt="Galeria" />
                      ))}
                  </div>
              )}

              {/* Ações Rápidas (Estilo Google Maps) */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 overflow-x-auto gap-4 scrollbar-hide">
                 {/* ROTA */}
                 <button onClick={handleRoute} className="flex flex-col items-center gap-1 group min-w-[60px]">
                    <div className="w-10 h-10 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                       <Navigation size={20} />
                    </div>
                    <span className="text-xs text-blue-400 font-medium">Rota</span>
                 </button>

                 {/* SALVAR */}
                 <button onClick={handleSave} className="flex flex-col items-center gap-1 group min-w-[60px]">
                    <div className={`w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 flex items-center justify-center group-hover:bg-zinc-700 group-hover:text-white transition-all ${isSaved ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' : ''}`}>
                       <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                    </div>
                    <span className={`text-xs font-medium ${isSaved ? 'text-amber-500' : 'text-zinc-400'}`}>{isSaved ? 'Salvo' : 'Salvar'}</span>
                 </button>

                 {/* LIGAR */}
                 <button 
                    onClick={hasPhone ? handleCall : undefined} 
                    disabled={!hasPhone}
                    className={`flex flex-col items-center gap-1 min-w-[60px] transition-all ${hasPhone ? 'group cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'}`}
                 >
                    <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 flex items-center justify-center group-hover:bg-zinc-700 group-hover:text-white transition-all">
                       <Phone size={20} />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">Ligar</span>
                 </button>

                 {/* SITE */}
                 <button 
                    onClick={hasWebsite ? handleWebsite : undefined} 
                    disabled={!hasWebsite}
                    className={`flex flex-col items-center gap-1 min-w-[60px] transition-all ${hasWebsite ? 'group cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'}`}
                 >
                    <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 flex items-center justify-center group-hover:bg-zinc-700 group-hover:text-white transition-all">
                       <Globe size={20} />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">Site</span>
                 </button>

                 {/* PARTILHAR */}
                 <button onClick={handleShare} className="flex flex-col items-center gap-1 group min-w-[60px]">
                    <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 flex items-center justify-center group-hover:bg-zinc-700 group-hover:text-white transition-all">
                       <Share2 size={20} />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">Partilhar</span>
                 </button>
              </div>

              {/* Abas */}
              <div className="flex border-b border-zinc-800 px-4 overflow-x-auto">
                <button className="px-4 py-3 text-sm font-bold text-amber-500 border-b-2 border-amber-500 whitespace-nowrap">Visão Geral</button>
                <button className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap">Novidades</button>
                <button className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap">Avaliações</button>
                <button className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap">Fotos</button>
              </div>

              {/* Conteúdo Principal */}
              <div className="p-6 space-y-6">
                 
                 {/* Descrição */}
                 <div className="space-y-2">
                    <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                       {data.description || 'Sem descrição fornecida.'}
                    </p>
                 </div>

                 <div className="border-t border-zinc-800 pt-6 space-y-4">
                    
                    {/* Endereço */}
                    <div className="flex items-start gap-4">
                       <MapPin className="text-zinc-500 mt-1 flex-shrink-0" size={20} />
                       <div>
                          <p className="text-zinc-200">{data.address}, {data.city}</p>
                          <p className="text-zinc-500 text-sm">{data.department}, Paraguay</p>
                       </div>
                    </div>

                    {/* Horário Dinâmico */}
                    <div className="flex items-start gap-4">
                       <Clock className="text-zinc-500 mt-1 flex-shrink-0" size={20} />
                       <div className="flex-1">
                          <div className="flex justify-between items-center cursor-pointer group">
                             <p className={`font-medium text-sm ${status.isOpen ? 'text-green-500' : 'text-red-400'}`}>
                                {status.text}
                             </p>
                             <ChevronDown size={16} className="text-zinc-600" />
                          </div>
                       </div>
                    </div>

                    {/* Telefone */}
                    <div className="flex items-center gap-4">
                       <Phone className="text-zinc-500 flex-shrink-0" size={20} />
                       <p className="text-zinc-200">{data.whatsapp || data.phone || 'Sem telefone'}</p>
                       <button 
                            onClick={hasPhone ? handleCall : undefined}
                            disabled={!hasPhone}
                            className={`ml-auto text-sm font-bold px-3 py-1 rounded-full border ${hasPhone ? 'text-blue-400 border-blue-400/30 hover:bg-blue-400/10' : 'text-zinc-600 border-zinc-700 cursor-not-allowed'}`}
                        >
                            Ligar
                        </button>
                    </div>

                    {/* Site */}
                    {data.website && (
                      <div className="flex items-center gap-4">
                        <Globe className="text-zinc-500 flex-shrink-0" size={20} />
                        <a href={data.website} target="_blank" rel="noreferrer" className="text-zinc-200 truncate hover:underline">{data.website}</a>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-zinc-500 text-sm pt-2">
                       <LayoutDashboard size={20} />
                       <p>Reivindicar esta empresa</p>
                    </div>

                 </div>
              </div>
            </div>

          </div>

          {/* Coluna Lateral (Mapa & Status) */}
          <div className="space-y-6">
             
             {/* Mapa Placeholder */}
             <div onClick={handleRoute} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-xl h-64 relative group cursor-pointer">
                {/* Imagem estática de mapa simulado */}
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                   <div className="opacity-30 absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/OpenStreetMap_Asuncion.png/640px-OpenStreetMap_Asuncion.png')] bg-cover bg-center grayscale"></div>
                   <div className="relative z-10 bg-red-600 text-white p-2 rounded-full shadow-lg transform group-hover:-translate-y-2 transition-transform">
                      <MapPin size={24} fill="currentColor" />
                   </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-3">
                   <p className="text-white text-xs font-bold truncate">{data.address}</p>
                </div>
             </div>

             {/* Ações Laterais - VISÍVEL APENAS PARA DONOS */}
             {isOwner && (
                <div className="bg-zinc-900 rounded-xl p-6 border border-amber-500/30 shadow-lg">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    Status: {data.status === 'active' ? 'Ativo' : 'Em Análise'}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-6">
                    {data.status === 'active' 
                        ? 'Seu perfil está visível para todos os usuários.' 
                        : 'Seu perfil está sendo revisado. Você pode editar as informações se notar algum erro.'}
                    </p>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={onHome}
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl transition-colors border border-zinc-700"
                        >
                            Voltar ao Início
                        </button>
                        {onEdit && (
                            <button 
                                onClick={onEdit} 
                                className="w-full text-zinc-500 hover:text-white text-sm py-2"
                            >
                                Editar Informações
                            </button>
                        )}
                    </div>
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};
