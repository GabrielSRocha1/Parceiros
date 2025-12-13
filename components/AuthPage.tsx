
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Phone, ArrowRight, Search, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ViewState, User, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { supabase } from '../supabaseClient';

interface AuthPageProps {
  onNavigate: (view: ViewState) => void;
  onLogin: (user: User) => void;
  language: Language;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate, onLogin, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  const t = TRANSLATIONS[language].auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
        if (isLogin) {
            // LOGIN REAL
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                // Buscar dados extras do perfil (nome) se necessário, ou usar metadata
                // Por padrão, usamos o user_metadata que salvamos no registro
                const userData: User = {
                    id: data.user.id,
                    email: data.user.email || '',
                    name: data.user.user_metadata?.full_name || 'Usuário',
                };
                onLogin(userData);
            }

        } else {
            // REGISTRO REAL
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone
                    }
                }
            });

            if (error) throw error;

            if (data.user) {
                // LOGIN AUTOMÁTICO (Sem confirmação de email)
                // Nota: Certifique-se de que "Confirm email" esteja DESATIVADO no painel do Supabase
                const userData: User = {
                    id: data.user.id,
                    email: data.user.email || '',
                    name: name,
                };
                onLogin(userData);
            }
        }
    } catch (err: any) {
        console.error("Auth Error:", err);
        // Tradução simples de erros comuns
        let msg = err.message;
        if (msg.includes('Invalid login credentials')) msg = 'E-mail ou senha incorretos.';
        if (msg.includes('User already registered')) msg = 'Este e-mail já está cadastrado.';
        if (msg.includes('Password should be at least')) msg = 'A senha deve ter no mínimo 6 caracteres.';
        
        setError(msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration matching theme */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-800/30 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/4"></div>
      </div>

      <div className="bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-zinc-800">
        
        {/* Header Section */}
        <div className="bg-black/50 p-8 text-center relative overflow-hidden border-b border-zinc-800">
            <div className="relative z-10">
                <div 
                    className="inline-flex items-center justify-center bg-zinc-800 border border-zinc-700 p-3 rounded-xl mb-4 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => onNavigate('home')}
                >
                    <Search className="h-6 w-6 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? t.welcome_back : t.create_account}
                </h2>
                <p className="text-zinc-500 text-sm">
                    {isLogin 
                        ? t.login_subtitle 
                        : t.register_subtitle}
                </p>
            </div>
        </div>

        {/* Toggle Switches */}
        <div className="flex border-b border-zinc-800">
            <button
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${isLogin ? 'text-amber-500 border-b-2 border-amber-500 bg-zinc-800/50' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                {t.login_tab}
            </button>
            <button
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${!isLogin ? 'text-amber-500 border-b-2 border-amber-500 bg-zinc-800/50' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                {t.register_tab}
            </button>
        </div>

        {/* Form Content */}
        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-red-300 text-xs font-medium">{error}</span>
                    </div>
                )}

                {!isLogin && (
                    <div className="space-y-4 animate-fadeIn">
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">{t.name_label}</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                                <input 
                                    type="text" 
                                    required 
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-700 bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-zinc-600"
                                    placeholder="Juan Pérez"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">{t.phone_label}</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                                <input 
                                    type="tel" 
                                    required 
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-700 bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-zinc-600"
                                    placeholder="09XX 123 456"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">{t.email_label}</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                        <input 
                            type="email" 
                            required 
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-700 bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-zinc-600"
                            placeholder="ejemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1 ml-1">
                        <label className="block text-xs font-bold text-zinc-500 uppercase">{t.password_label}</label>
                        {isLogin && (
                            <a href="#" className="text-xs text-amber-500 hover:text-amber-400 hover:underline">
                                {t.forgot_password}
                            </a>
                        )}
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                        <input 
                            type="password" 
                            required 
                            minLength={6}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-700 bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-zinc-600"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {!isLogin && (
                    <div className="flex items-start gap-2 pt-2">
                         <div className="mt-0.5">
                            <input type="checkbox" required className="rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500 cursor-pointer" />
                         </div>
                         <p className="text-xs text-zinc-500 leading-tight">
                            {t.terms_prefix} <a href="#" className="text-amber-500 hover:underline">{t.terms_link}</a> {t.terms_suffix}
                         </p>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg transform active:scale-95 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} /> {t.processing}
                        </>
                    ) : (
                        <>
                            {isLogin ? t.submit_login : t.submit_register}
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>
            
            <div className="mt-8 text-center">
                <p className="text-zinc-500 text-sm">
                    {isLogin ? t.no_account : t.have_account}
                    <button 
                        onClick={() => { setIsLogin(!isLogin); setError(null); }}
                        className="ml-1 text-amber-500 font-bold hover:underline"
                    >
                        {isLogin ? t.register_link : t.login_link}
                    </button>
                </p>
            </div>

        </div>
      </div>
      
      {/* Simple Footer for Auth Page */}
      <div className="absolute bottom-4 text-center w-full text-zinc-600 text-xs">
         &copy; {new Date().getFullYear()} BODECOIN Paraguay
      </div>
    </div>
  );
};
