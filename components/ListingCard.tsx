
import React from 'react';
import { Star, MapPin, Phone, BadgeCheck, Navigation } from 'lucide-react';
import { Business, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ListingCardProps {
  business: Business;
  language: Language;
  onViewDetails?: (business: Business) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ business, language, onViewDetails }) => {
  const t = TRANSLATIONS[language].listings;
  
  const handleNavigate = () => {
    let mapUrl = '';
    
    if (business.coordinates) {
        // Precise navigation using coordinates
        mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.lat},${business.coordinates.lng}`;
    } else {
        // Fallback navigation using address string
        const destination = encodeURIComponent(`${business.address}, ${business.city}, Paraguay`);
        mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    }
    
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="bg-zinc-900 rounded-xl shadow-lg shadow-black/50 border border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/80 to-transparent"></div>
        <div className="absolute top-3 left-3">
          <span className="bg-black/80 backdrop-blur-sm text-amber-500 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider border border-amber-500/20">
            {business.category}
          </span>
        </div>
        {business.isVerified && (
          <div className="absolute top-3 right-3" title={t.verified}>
            <div className="bg-amber-500 text-black p-1 rounded-full shadow-md border-2 border-black">
                <BadgeCheck size={16} />
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white leading-tight group-hover:text-amber-500 transition-colors">{business.name}</h3>
          <div className="flex items-center bg-zinc-800 px-2 py-1 rounded-lg text-amber-500 text-sm font-bold ml-2 border border-zinc-700">
            <span className="mr-1">{business.rating}</span>
            <Star size={12} fill="currentColor" />
          </div>
        </div>
        
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">{business.description}</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-start text-zinc-500 text-sm">
            <MapPin size={16} className="mr-2.5 mt-0.5 flex-shrink-0 text-amber-500" />
            <span className="text-zinc-400">{business.address}, {business.city}</span>
          </div>
          
          <div className="flex items-center text-zinc-500 text-sm">
            <Phone size={16} className="mr-2.5 flex-shrink-0 text-amber-500" />
            <span className="text-zinc-400">{business.phone === 'Consultar' ? t.consult_phone : business.phone}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-800 flex flex-col gap-3">
             <div className="flex gap-1.5 flex-wrap mb-1">
                {business.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-semibold bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full uppercase tracking-wide border border-zinc-700">{tag}</span>
                ))}
             </div>
             
             <div className="flex gap-2">
                 <button 
                    onClick={() => onViewDetails && onViewDetails(business)}
                    className="flex-1 bg-transparent border border-zinc-700 text-white font-bold py-2 px-3 rounded-lg text-sm hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
                 >
                    {t.view_details}
                 </button>
                 <button 
                    onClick={handleNavigate}
                    className="flex-1 bg-amber-500 text-black font-bold py-2 px-3 rounded-lg text-sm hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    title={t.get_directions}
                 >
                    <Navigation size={16} />
                    {t.get_directions}
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};
