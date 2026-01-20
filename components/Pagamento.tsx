import React, { useState } from 'react';

const Pagamento: React.FC = () => {
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
    <section id="pagamento" className="py-24 bg-dark-900 min-h-[50vh]">
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center leading-tight mb-12">
          Nós da BodeCoin Usamos Cartões Globais
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Container Esquerdo */}
          <div className="bg-dark-800 p-8 rounded-2xl border border-gold-500/20 min-h-[300px] flex flex-col items-center justify-center gap-6">
            <img
              src="/WhatsApp Image 2025-12-16 at 09.30.25.jpeg"
              alt="Cartões Globais Bodecoin"
              className="max-w-full max-h-[675px] object-contain rounded-lg shadow-lg"
            />
            <div className="flex gap-4 w-full justify-center">
              <img
                src="/WhatsApp Image 2025-12-16 at 09.30.23 (3).jpeg"
                alt="Detalhe 1"
                className="w-[18.75%] h-auto object-contain rounded-lg shadow-md"
              />
              <a
                href="https://okx.com/pt-br/join/69600528"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[18.75%] cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src="/WhatsApp Image 2025-12-16 at 09.30.23.jpeg"
                  alt="Detalhe 2"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              </a>
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer relative group w-[18.75%]"
                title={copied ? 'ID coipado!' : 'Clique para copiar o ID'}
              >
                <img
                  src="/ID bodecoin.png"
                  alt="ID Bodecoin"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
                {copied && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gold-500 text-black text-sm font-bold px-3 py-1 rounded-md shadow-lg whitespace-nowrap animate-fade-in-up">
                    ID copiado!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Container Direito */}
          <div className="bg-dark-800 p-8 rounded-2xl border border-gold-500/20 min-h-[300px] flex flex-col items-center justify-center gap-6">
            <img
              src="/gemini sem logo.png"
              alt="Solflare Card"
              className="max-w-full max-h-[675px] object-contain rounded-lg shadow-lg"
            />
            <div className="flex gap-4 w-full justify-center">
              <img
                src="/WhatsApp Image 2025-12-16 at 09.30.23 (3).jpeg"
                alt="Detalhe 3"
                className="w-[18.75%] h-auto object-contain rounded-lg shadow-md"
              />
              <a
                href="https://www.solflare.com/guides/how-to-use-the-solflare-card/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[18.75%] cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src="/conta.png"
                  alt="Detalhe 4"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              </a>
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer relative group w-[18.75%]"
                title={copied ? 'ID coipado!' : 'Clique para copiar o ID'}
              >
                <img
                  src="/ID bodecoin.png"
                  alt="ID Bodecoin"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
                {copied && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gold-500 text-black text-sm font-bold px-3 py-1 rounded-md shadow-lg whitespace-nowrap animate-fade-in-up">
                    ID copiado!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Pagamento;
