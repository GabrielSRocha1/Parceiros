
import React, { useState } from 'react';
import { Menu, X, Coins, User as UserIcon, Search, LogOut, Globe, ChevronDown, Building2, PenLine } from 'lucide-react';
import { ViewState, User, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  user: User | null;
  userBusinessId?: string | null;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇵🇾' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' }
];

export const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  currentView, 
  user, 
  userBusinessId,
  onLogout, 
  language, 
  onLanguageChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = TRANSLATIONS[language].header;

  const handleNav = (view: ViewState, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogout();
    setIsMenuOpen(false);
  };

  const handleBuyClick = () => {
    window.open('https://www.bodecoin.digital/', '_blank');
    setIsMenuOpen(false);
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={(e) => handleNav('home', e)}
          >
            <div className="bg-amber-500 p-1.5 rounded-lg mr-2 transition-transform group-hover:scale-110">
              <Search className="h-6 w-6 text-black" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">BODE<span className="text-amber-500">COIN</span></span>
            <span className="ml-1 text-xs font-bold text-black bg-amber-500 px-1.5 py-0.5 rounded self-start mt-1">PY</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              onClick={(e) => handleNav('home', e)}
              className={`text-sm font-semibold transition-colors ${currentView === 'home' ? 'text-amber-500' : 'text-zinc-400 hover:text-amber-500'}`}
            >
              {t.home}
            </a>
            <a href="#" className="text-sm font-semibold text-zinc-400 hover:text-amber-500 transition-colors">{t.categories}</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Botão Registrar Negócio (Sempre visível) */}
            <button 
              onClick={(e) => handleNav('register_business', e)}
              className="flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-amber-500 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
            >
              <Building2 size={16} />
              {t.register_business}
            </button>

            {/* Botão Editar Negócio (Só se tiver negócio) */}
            {userBusinessId && (
                <button 
                  onClick={(e) => handleNav('register_business', e)}
                  className="flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/50"
                >
                  <PenLine size={16} />
                  {t.edit_business}
                </button>
            )}

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-800"
              >
                <Globe size={18} />
                <span className="text-sm font-medium uppercase">{language}</span>
                <ChevronDown size={14} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-zinc-800 transition-colors ${language === lang.code ? 'text-amber-500 font-bold' : 'text-zinc-400'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-zinc-800"></div>

            {user ? (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-zinc-300 font-semibold text-sm">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 border border-zinc-700">
                            <UserIcon size={16} />
                        </div>
                        <span>{t.greeting}, {user.name.split(' ')[0]}</span>
                    </div>
                    <button 
                        onClick={handleLogoutClick}
                        className="text-zinc-500 hover:text-red-500 transition-colors"
                        title={t.logout}
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            ) : (
                <button 
                    onClick={(e) => handleNav('auth', e)}
                    className={`font-semibold text-sm flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${currentView === 'auth' ? 'text-amber-500 bg-zinc-900' : 'text-zinc-400 hover:text-amber-500 hover:bg-zinc-900'}`}
                >
                    <UserIcon size={18} />
                    {t.login}
                </button>
            )}

            <button 
              onClick={handleBuyClick}
              className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Coins size={18} />
              {t.buy}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
             <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-zinc-400 hover:text-amber-500 p-2 mr-2"
              >
                <span className="text-xl">{currentLang.flag}</span>
              </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-400 hover:text-amber-500 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Language Menu Overlay */}
      {isLangOpen && (
          <div className="absolute top-16 right-4 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 p-2 md:hidden">
              <p className="text-xs font-bold text-zinc-500 px-2 py-2 uppercase">{t.language}</p>
              {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => {
                    onLanguageChange(lang.code);
                    setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 rounded-lg hover:bg-zinc-800 transition-colors ${language === lang.code ? 'bg-zinc-800 text-amber-500 font-bold' : 'text-zinc-300'}`}
                >
                    <span className="text-xl">{lang.flag}</span>
                    {lang.label}
                </button>
                ))}
          </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 absolute w-full shadow-lg h-screen z-40">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a 
              href="#" 
              onClick={(e) => handleNav('home', e)}
              className="block px-4 py-3 text-base font-medium text-white hover:bg-zinc-800 rounded-xl"
            >
              {t.home}
            </a>
            <a href="#" className="block px-4 py-3 text-base font-medium text-zinc-400 hover:bg-zinc-800 rounded-xl">{t.categories}</a>
            
            {/* Mobile Register */}
            <button 
              onClick={(e) => handleNav('register_business', e)}
              className="w-full text-left px-4 py-3 text-base font-medium text-zinc-400 hover:bg-zinc-800 rounded-xl flex items-center gap-3"
            >
                <Building2 size={20} /> {t.register_business}
            </button>
            
            {/* Mobile Edit (if exists) */}
            {userBusinessId && (
                <button 
                  onClick={(e) => handleNav('register_business', e)}
                  className="w-full text-left px-4 py-3 text-base font-medium text-amber-500 hover:bg-zinc-800 rounded-xl flex items-center gap-3"
                >
                   <PenLine size={20} /> {t.edit_business}
                </button>
            )}

            <div className="border-t border-zinc-800 my-4 pt-4">
              {user ? (
                  <>
                     <div className="px-4 py-2 mb-2 flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 font-bold text-lg border border-zinc-700">
                            {user.name.charAt(0)}
                         </div>
                         <div>
                            <p className="font-bold text-white">{user.name}</p>
                            <p className="text-xs text-zinc-500">{user.email}</p>
                         </div>
                     </div>
                     <button 
                        onClick={handleLogoutClick}
                        className="w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-zinc-800 rounded-xl flex items-center gap-3"
                    >
                        <LogOut size={20} /> {t.logout}
                    </button>
                  </>
              ) : (
                  <a 
                    href="#" 
                    onClick={(e) => handleNav('auth', e)}
                    className="block px-4 py-3 text-base font-medium text-zinc-400 hover:bg-zinc-800 rounded-xl flex items-center gap-3"
                  >
                    <UserIcon size={20} /> {t.login}
                  </a>
              )}
              
              <button 
                onClick={handleBuyClick}
                className="w-full mt-2 px-4 py-4 text-base font-bold bg-amber-500 text-black rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <Coins size={20} /> {t.buy}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
