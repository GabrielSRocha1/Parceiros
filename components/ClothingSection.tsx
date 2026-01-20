import React, { useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ClothingSection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const clothingImages = [
    '/Gemini_Generated_Image_1atbjb1atbjb1atb.png',
    '/Gemini_Generated_Image_3aubb43aubb43aub.png',
    '/Gemini_Generated_Image_3x9nfo3x9nfo3x9n.png',
    '/Gemini_Generated_Image_4hcsns4hcsns4hcs.png',
    '/Gemini_Generated_Image_7c4qts7c4qts7c4q.png',
    '/Gemini_Generated_Image_fib8kzfib8kzfib8.png',
    '/Gemini_Generated_Image_gk652hgk652hgk65.png',
    '/Gemini_Generated_Image_phfzrmphfzrmphfz.png',
    '/Gemini_Generated_Image_r3u1por3u1por3u1.png',
    '/Gemini_Generated_Image_trio39trio39trio.png',
    '/Gemini_Generated_Image_xsfbkgxsfbkgxsfb.png',
    '/Gemini_Generated_Image_z2rg1lz2rg1lz2rg.png',
    '/Gemini_Generated_Image_r3u1por3u1por3u1 (1).png',
    '/WhatsApp Image 2026-01-08 at 11.51.49 (1).jpeg',
    '/WhatsApp Image 2026-01-08 at 11.51.49 (2).jpeg',
    '/WhatsApp Image 2026-01-08 at 11.51.49.jpeg',
    '/WhatsApp Image 2026-01-08 at 11.51.50 (1).jpeg',
    '/WhatsApp Image 2026-01-08 at 11.51.50.jpeg'
  ];

  const handleScrollToPayment = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('pagamento-imagens');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.location.hash = '#pagamento-imagens';
    }
  }, []);

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // Previne scroll do body quando modal está aberto
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % clothingImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + clothingImages.length) % clothingImages.length);
    }
  };

  // Gestos de swipe para mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedImageIndex !== null) {
      nextImage();
    }
    if (isRightSwipe && selectedImageIndex !== null) {
      prevImage();
    }
  };

  // Fechar com ESC
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImageIndex !== null) {
        closeImage();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImageIndex]);

  // Dividir em duas linhas: 9 em cima, 9 em baixo (18 imagens no total)
  const topRow = clothingImages.slice(0, 9);
  const bottomRow = clothingImages.slice(9, 18);

  return (
    <section className="py-16 bg-dark-900">
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Na Compra de BODECoin Voce Ganha Produtos da Grif. Bode Coin 🎉
        </h2>
        <div className="space-y-4">
          {/* Primeira linha - 8 imagens centralizadas */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {topRow.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => openImage(index)}
              >
                <img
                  src={image}
                  alt={`Roupa ${index + 1}`}
                  className="h-20 md:h-28 w-auto object-contain rounded-lg hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Segunda linha - 9 imagens centralizadas */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {bottomRow.map((image, index) => (
              <div
                key={index + 9}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => openImage(index + 9)}
              >
                <img
                  src={image}
                  alt={`Roupa ${index + 10}`}
                  className="h-20 md:h-28 w-auto object-contain rounded-lg hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://wa.link/cv1m27"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-extrabold text-xl sm:text-2xl transition-all transform hover:scale-105 cursor-pointer"
          >
            Comprar Agora
          </a>
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
          onClick={closeImage}
        >
          {/* Botão Fechar - Mobile friendly */}
          <button
            onClick={closeImage}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gold-500 transition-colors z-10 p-2 sm:p-1 touch-manipulation"
            aria-label="Fechar"
          >
            <X size={28} className="sm:w-8 sm:h-8" />
          </button>

          {/* Botão Anterior - Mobile friendly */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 active:text-gold-400 transition-colors z-10 bg-black/70 sm:bg-black/50 rounded-full p-3 sm:p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
          </button>

          {/* Botão Próximo - Mobile friendly */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 active:text-gold-400 transition-colors z-10 bg-black/70 sm:bg-black/50 rounded-full p-3 sm:p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={24} className="sm:w-8 sm:h-8" />
          </button>

          {/* Imagem - Mobile optimized com suporte a swipe */}
          <div
            className="w-full h-full max-w-[95%] sm:max-w-[90%] max-h-[85%] sm:max-h-[90%] flex items-center justify-center px-8 sm:px-4 touch-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={clothingImages[selectedImageIndex]}
              alt={`Roupa ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg select-none"
              draggable={false}
            />
          </div>

          {/* Indicador de posição - Mobile friendly */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs sm:text-sm bg-black/70 sm:bg-black/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium">
            {selectedImageIndex + 1} / {clothingImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default ClothingSection;

