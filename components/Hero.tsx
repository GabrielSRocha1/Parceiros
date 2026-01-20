import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div id="home" className="relative w-full overflow-hidden bg-dark-900 sm:min-h-screen">
      {/* Mobile: apenas imagem de fundo */}
      <div className="relative w-full aspect-[4/3] sm:hidden">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: 'url("/site (2) (1).png")',
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Texto sobreposto - Mobile */}
        <div className="absolute inset-0 flex items-start justify-center pt-[75%] z-10">
          <h2 className="text-gold-500 text-base font-bold text-center px-4 drop-shadow-lg">
            A Cripto Oficial dos Motociclistas
          </h2>
        </div>
      </div>

      {/* Desktop: apenas imagem de fundo em tela cheia */}
      <div
        className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat z-0 min-h-[100vh]"
        style={{
          backgroundImage: 'url("/site (2) (1).png")',
        }}
      >
        <div className="absolute inset-0 bg-black/15 md:bg-black/20"></div>
      </div>

      {/* Texto sobreposto - Desktop */}
      <div className="hidden sm:flex absolute inset-0 items-start justify-end z-10 pt-[49vh] pr-[10vw]">
        <h2 className="text-gold-500 text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-2xl">
          A Cripto Oficial dos Motociclistas
        </h2>
      </div>
    </div>
  );
};

export default Hero;