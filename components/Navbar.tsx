import React, { useState, useEffect } from 'react';
import { Menu, X, Bitcoin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Altura da navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: t('nav.about'), href: '#sobre' },
    { name: t('nav.benefits'), href: '#beneficios' },
    { name: t('nav.howItWorks'), href: '#timeline' },
    { name: t('nav.tokenomics'), href: '#tokenomics' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex-shrink-0 text-gold-500 flex items-center gap-1.5 md:gap-2 cursor-pointer"
            >
              <Bitcoin size={24} className="text-gold-500 md:w-8 md:h-8" />
              <span className="font-sans font-bold text-lg md:text-2xl tracking-wider text-white">BODE<span className="text-gold-500">COIN</span></span>
            </a>
            <div className="md:hidden">
              <LanguageSelector />
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-300 hover:text-gold-500 transition-colors px-3 py-2 rounded-md text-sm font-semibold uppercase tracking-wide cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <LanguageSelector />
              <a
                href="https://parceiros.bodecoin.digital/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-gold-600 hover:bg-gold-500 text-black px-5 py-2 rounded-lg font-bold transition-all transform hover:scale-105 cursor-pointer"
              >
                {t('nav.buyNow')}
              </a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://parceiros.bodecoin.digital/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-gold-600 text-black px-3 py-3 mt-4 rounded-lg font-bold cursor-pointer"
            >
              {t('nav.buyNow')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;