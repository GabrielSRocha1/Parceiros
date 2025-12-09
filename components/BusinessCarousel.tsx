
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, MapPin } from 'lucide-react';
import { Business, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface BusinessCarouselProps {
  businesses: Business[];
  language: Language;
}

export const BusinessCarousel: React.FC<BusinessCarouselProps> = ({ businesses, language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = TRANSLATIONS[language].carousel || { title: 'Tendencias' };

  // Imagens da pasta public
  const bannerImages = [
    '/banner.png',
    '/banner (1).png'
  ];

  // Filtrar apenas negócios que têm imagens válidas
  const featuredBusinesses = businesses.filter(b => b.imageUrl && b.imageUrl.length > 0).slice(0, 8);

  // Combinar imagens dos banners com os negócios
  const allItems = [
    ...bannerImages.map(img => ({ type: 'banner', imageUrl: img })),
    ...featuredBusinesses.map(b => ({ type: 'business', ...b }))
  ];

  // Auto-play logic (8 seconds)
  useEffect(() => {
    if (allItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === allItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [allItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === allItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? allItems.length - 1 : prev - 1));
  };

  if (allItems.length === 0) return null;

  const currentItem = allItems[currentIndex];
  const isBanner = currentItem.type === 'banner';

  return (
    <section className="bg-black border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-6">
            <div className="bg-amber-500/10 p-2 rounded-full border border-amber-500/20">
                <TrendingUp className="text-amber-500" size={20} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{t.title}</h2>
            </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-zinc-800 group shadow-2xl shadow-black/50">
          
          {/* Main Image */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out transform"
            style={{ 
                backgroundImage: `url(${currentItem.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
          >
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>

          {/* Text Content Overlay - Only show for businesses */}
          {!isBanner && 'category' in currentItem && (
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 z-10">
               <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                  {currentItem.category}
               </span>
               <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight drop-shadow-lg">
                  {currentItem.name}
               </h3>
               <p className="text-zinc-300 text-lg line-clamp-2 mb-4 drop-shadow-md">
                  {currentItem.description}
               </p>
               <div className="flex items-center text-zinc-400 font-medium">
                  <MapPin size={18} className="text-amber-500 mr-2" />
                  {currentItem.city}, {currentItem.department}
               </div>
            </div>
          )}

          {/* Controls (Visible on Hover or Mobile) */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-amber-500 text-white hover:text-black rounded-full backdrop-blur-sm transition-all border border-white/10 z-20 group-hover:opacity-100 md:opacity-0"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-amber-500 text-white hover:text-black rounded-full backdrop-blur-sm transition-all border border-white/10 z-20 group-hover:opacity-100 md:opacity-0"
          >
            <ChevronRight size={24} />
          </button>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 right-6 flex gap-2 z-20">
            {allItems.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                    }`}
                />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
