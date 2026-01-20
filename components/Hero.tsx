import React, { useState } from 'react';
import { Search, MapPin, Loader2, Sparkles, History } from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { User, SearchHistoryItem, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeroProps {
  onSearch: (query: string, dept: string, useAI: boolean) => void;
  isSearching: boolean;
  user?: User | null;
  searchHistory?: SearchHistoryItem[];
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, isSearching, user, searchHistory, language }) => {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('');
  const t = TRANSLATIONS[language].hero;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, dept, false);
  };

  const handleAISearch = (e: React.MouseEvent) => {
    e.preventDefault();
    onSearch(query, dept, true);
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    onSearch(historyQuery, '', false);
  };

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832" 
          alt="Crypto Network" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/90 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 md:pt-36 md:pb-40 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
          <span className="text-amber-400 font-bold text-sm tracking-wide uppercase">{t.badge}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          {t.title_prefix} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">{t.title_gradient}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.subtitle}
        </p>

        {/* Search Box Container */}
        <div className="bg-zinc-900/80 backdrop-blur-md p-2.5 rounded-2xl shadow-2xl shadow-amber-900/20 max-w-4xl mx-auto border border-zinc-800 transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            
            {/* What Input */}
            <div className="flex-grow relative group text-left">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium bg-zinc-950/50 border border-transparent focus:border-amber-500/30 transition-all"
                placeholder={t.search_placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-zinc-800 my-3"></div>

            {/* Where Input (Select) */}
            <div className="flex-shrink-0 w-full md:w-[35%] relative group text-left">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <select
                className="block w-full pl-12 pr-10 py-4 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none bg-zinc-950/50 border border-transparent focus:border-amber-500/30 font-medium cursor-pointer truncate transition-all"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                <option value="" className="bg-zinc-900 text-white">{t.dept_placeholder}</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d} className="bg-zinc-900 text-white">{d}</option>
                ))}
              </select>
              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isSearching}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 min-w-[140px] shadow-lg hover:shadow-amber-500/30"
            >
              {isSearching ? <Loader2 className="animate-spin h-5 w-5" /> : t.search_btn}
            </button>

             {/* AI Button */}
             <button
              type="button"
              onClick={handleAISearch}
              disabled={isSearching || !query}
              title={t.ai_btn_title}
              className="bg-zinc-800 hover:bg-zinc-700 text-amber-500 border border-zinc-700 font-bold py-4 px-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
               <Sparkles className="h-5 w-5" />
            </button>
          </form>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-sm text-zinc-400 font-medium">
          {user && searchHistory && searchHistory.length > 0 ? (
            <>
              <span className="flex items-center gap-1 text-zinc-500"><History size={14} /> {t.history}</span>
              {searchHistory.map((item, idx) => (
                <React.Fragment key={idx}>
                    <button onClick={() => handleHistoryClick(item.query)} className="hover:text-amber-400 hover:underline decoration-amber-500 underline-offset-4 transition-all bg-zinc-900/60 px-2 py-0.5 rounded-lg border border-zinc-800 hover:border-amber-500/50">
                        {item.query}
                    </button>
                    {idx < searchHistory.length - 1 && <span className="text-zinc-700">•</span>}
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <span>{t.trends}</span>
              <button onClick={() => setQuery('Restaurantes')} className="hover:text-amber-400 hover:underline decoration-amber-500 underline-offset-4 transition-all">{t.trend_restaurants}</button>
              <span className="text-zinc-600">•</span>
              <button onClick={() => setQuery('Farmacias')} className="hover:text-amber-400 hover:underline decoration-amber-500 underline-offset-4 transition-all">{t.trend_pharmacies}</button>
              <span className="text-zinc-600">•</span>
              <button onClick={() => setQuery('Mecánicos')} className="hover:text-amber-400 hover:underline decoration-amber-500 underline-offset-4 transition-all">{t.trend_mechanics}</button>
              <span className="text-zinc-600">•</span>
              <button onClick={() => setQuery('Hoteles')} className="hover:text-amber-400 hover:underline decoration-amber-500 underline-offset-4 transition-all">{t.trend_hotels}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};