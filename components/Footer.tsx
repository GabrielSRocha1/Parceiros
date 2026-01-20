import React from 'react';
import { X, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const TelegramIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.37.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-900">
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('footer.heading')}</h2>
            <h3 className="text-xl md:text-2xl text-gold-500 mb-8">{t('footer.subheading')}</h3>
            <p className="text-gray-400 max-w-lg mb-8 text-lg leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/bode_coin/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all hover:scale-110">
                <Instagram size={24} />
              </a>
              <a href="https://x.com/bode_coin" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all hover:scale-110">
                <X size={24} />
              </a>
              <a href="https://www.tiktok.com/@bode_coin" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all hover:scale-110">
                <TikTokIcon size={24} />
              </a>
              <a href="https://t.me/+jDvl7qJkhINmYTZh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all hover:scale-110">
                <TelegramIcon size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8 text-white border-l-4 border-gold-500 pl-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#sobre" className="hover:text-gold-500 transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#beneficios" className="hover:text-gold-500 transition-colors">{t('footer.benefits')}</a></li>
              <li><a href="#timeline" className="hover:text-gold-500 transition-colors">{t('footer.roadmap')}</a></li>
              <li><a href="#tokenomics" className="hover:text-gold-500 transition-colors">{t('footer.tokenomics')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8 text-white border-l-4 border-gold-500 pl-4">{t('footer.legal')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-gold-500 transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="https://chatvolt.ai/@bodecoin" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
          <p className="mt-2 md:mt-0">{t('footer.developed')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;