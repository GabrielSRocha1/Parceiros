import React from 'react';
import { Search, Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface FooterProps {
    language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language].footer;
  return (
    <footer className="bg-black text-zinc-400 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4 text-white">
              <div className="bg-amber-500 p-1.5 rounded-lg mr-2">
                <Search className="h-5 w-5 text-black" />
              </div>
              <span className="font-bold text-2xl tracking-tight">BODE<span className="text-amber-500">COIN</span></span>
            </div>
            <p className="text-sm text-zinc-500 mb-6">
              {t.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.popular_depts}</h3>
            <ul className="space-y-2 text-sm">
              {DEPARTMENTS.slice(0, 6).map(dept => (
                <li key={dept}><a href="#" className="hover:text-amber-500 transition-colors">{dept}</a></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.company}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">{t.about}</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">{t.pricing}</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">{t.blog}</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">{t.work}</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">{t.terms}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.contact}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-amber-500 flex-shrink-0" />
                <span>Ciudad del Este/Paraguay</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-amber-500 flex-shrink-0" />
                <span>contato@parceiros.bodecoin.digital</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {t.rights}</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-zinc-400">{t.privacy}</a>
            <a href="#" className="hover:text-zinc-400">{t.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};