import React, { useState } from 'react';

const PaymentDownloadSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const linkToCopy = 'AeAQdgjGqtHErysb5FBvUxNxmob2mVBGnEXdmULJ7dH9';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  return (
    <div id="pagamento-imagens" className="mt-16 scroll-mt-32 md:scroll-mt-40 lg:scroll-mt-48">
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-8 md:mb-12">
        <span className="block">Assista o Video Para Saber</span>
        <span className="block">Como Comprar BODECOIN</span>
      </h3>
      <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center justify-center gap-6 md:gap-4 max-w-7xl mx-auto">
        {/* App Store and Google Play Section */}
        <div className="flex items-center justify-center gap-0 flex-shrink-0">
          <div className="flex flex-col items-center">
            <img src="/WhatsApp Image 2025-12-16 at 09.30.23 (3).jpeg" alt="Imagem 1 BodeCoin" className="h-24 md:h-32 w-auto object-contain" />
          </div>
          <a
            href="https://okx.com/pt-br/join/69600528"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
          >
            <img src="/conta.png" alt="Imagem 2 BodeCoin" className="h-24 md:h-32 w-auto object-contain" />
          </a>
        </div>

        {/* YouTube Section */}
        <div className="flex items-center justify-center gap-0 flex-shrink-0">
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer relative group"
            title={copied ? 'Link copiado!' : 'Clique para copiar o link'}
          >
            <img src="/ID bodecoin.png" alt="Imagem 3 BodeCoin" className="h-24 md:h-32 w-auto object-contain" />
            {copied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gold-500 text-black text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                Link copiado!
              </span>
            )}
          </button>
          <div className="flex flex-col items-center">
            <img src="/WhatsApp Image 2025-12-16 at 09.30.24 (1).jpeg" alt="Imagem 4 BodeCoin" className="h-24 md:h-32 w-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDownloadSection;
