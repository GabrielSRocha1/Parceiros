import React from 'react';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface CategoryGridProps {
  onSelectCategory: (categorySlug: string) => void;
  language: Language;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, language }) => {
  const t = TRANSLATIONS[language].categories;

  return (
    <section className="py-12 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">{t.title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => {
            // Dynamically get icon component
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (Icons as any)[cat.iconName] || Icons.HelpCircle;
            
            // Get translated name using slug as key
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const translatedName = (t as any)[cat.slug] || cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)} // Pass original name for search filter
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-950 text-zinc-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all border border-zinc-800">
                  <IconComponent size={24} />
                </div>
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white text-center leading-tight">
                    {translatedName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};