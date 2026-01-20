import React from 'react';

const Carousel: React.FC = () => {
  const image = '/aaaaa.png';
  const imageDiv1 = '/Gemini_Generated_Image_95lpt395lpt395lp.png';
  const imageDiv2Text = '/IMG_20260105_141514.jpg';
  const imageDiv2Text2 = '/IMG_20260105_141828.jpg';
  const imageDiv2Text3 = '/IMG_20260105_141453.jpg';
  const imageDiv2Text4 = '/IMG_20260105_141812.jpg';

  const imageLinks = [
    {
      link: 'https://www.google.com/search?client=ms-android-xiaomi-terr1-rso2&hs=6ul9&sca_esv=9e62302b854df37b&sxsrf=AE3TifOfW5Aa7y22lV68ui2dbXedty4yuQ:1767568350654&udm=2&fbs=AIIjpHydJdUtNKrM02hj0s4nbm4y1vdq6TC81CkcHPVl5daMgGUrxzwsEp1lb2ssO9DF0PO8mnwuGL1qO9FRY60gZqZ-Tmlay-bznHThm2gD697WjoLbcjh7ya9pjeyK7ETAzk82VyH1DptUQHhayM2n7JuJDd_Lrz9LaV1X0SQsU4KQurtQCSXXyjoKcp0sviTQmMb6QSIqePe7895oOpwTZZFQd2bF2w&q=elon+musk+e+as+criptomoedas&sa=X&ved=2ahUKEwjcvKCdgfORAxWNGrkGHbPyF0gQtKgLegQIFBAB&biw=406&bih=765&dpr=3#sv=CAMShQUa5QQKlwIKuQEStgEKd0FMa3RfdkZwbXZJUlk4bm55VlUtQWlwVFN5Rno0ZWNNWk95NTF4bXJwSFcxc1RpNm1nSmFTRDhXRjRzTWM5dmVEbzZpeEhhMlUxX0xfTjlJOS1aRW85c09EZDVhUnZDbjFMZnltUnVlTGNYcmk1cF9SWEtzQ3JBEhc0X05hYVpxbkxZZk01T1VQa3JpTTZRSRoiQUZNQUdHcldhdjZ6RHlZdy1ENjR0Wi1TVU81R3IxdUF2QRIDODQ5GgEzIiAKAXESG2Vsb24gbXVzayBlIGFzIGNyaXB0b21vZWRhcyIHCgN0YnMSACImCgRlcWxkEh5DZ0lJQUJBQU9nUUlBQkFBVmZ2TVhqMXQ1My01UFEStgIKzwESzAEKjAFBTGt0X3ZISEZYTDE4QWxuMFQxTGp6bFFPaW1QRm9QWWhFclNqeEJueVgwRl9hQ0lpY3J0UVA0X1M5V1pKaDc1RW9QYk1TMlN1RmtHWjVIal9xa3pmR3lGVHpMVm5wY2R6SWpETlU5ZWFQUlhScElVNVJyWUxXRFJ2QTlTQ3FkdnNIelVjX0xPLWtpeRIXNF9OYWFacW5MWWZNNU9VUGtyaU02UUkaIkFGTUFHR29QNHZYUm9oclVVSGc5aVVvTWdyakVoYmhVeHcSBDQ2OTgaATMiGAoGaW1nZGlpEg55WFMwU0ctbEZlMEdkTSIXCgVkb2NpZBIOdjYyYlZqRU1ldEJ1Sk0iJgoEZXFsZBIeQ2dJSUFCQUFPZ1FJQUJBQVZmdk1YajF0NTMtNVBRKhBlLXlYUzBTRy1sRmUwR2RNIAQqFwoBcxIQZS15WFMwU0ctbEZlMEdkTRgBMAEYByCOm-zzCjABSgoIAhACGAIgAigC',
      label: 'Elon Musk e Criptomoedas'
    },
    {
      link: 'https://www.google.com/search?q=btg+a+as+crpti+moedas&client=ms-android-xiaomi-terr1-rso2&hs=vFRU&sa=X&sca_esv=9e62302b854df37b&sxsrf=AE3TifMhBZRvYiRHlLz_g93Pw3YUnljwEQ:1767568786576&udm=2&fbs=AIIjpHydJdUtNKrM02hj0s4nbm4y1vdq6TC81CkcHPVl5daMgGUrxzwsEp1lb2ssO9DF0PO8mnwuGL1qO9FRY60gZqZ-TkpDXUm7RppT7K-eKB39p9DkOjS4nlIsEZrZhOOVKOU-mVC5BF1E7eSIP1O834mAi7E_owVLzx5FTux4BRtGfbzjNnlrqufE74e4ap-OHa8SxhDrc7IBccJHKVgbbb2NPY4gyg&ved=0ahUKEwjJiI_tgvORAxX0ILkGHSDJKfAQtKgLCBw&biw=406&bih=765&dpr=3#sv=CAMS_wQa3wQKkQIKuQEStgEKd0FMa3RfdkVTcmJSa1lXLTMzVWdtM3FTa1pPY1o5a1dOYklmRHZyRkN1MGFqczJpeFBmTklQTEZOblhGV3VTTkdqRkNiVHJvVGszWjNsZVpJU040QjFKb0dHV28xUk1JOEZWeDVIUDN6dUs0eFYtdXJaNVFueGxJEhdsZlZhYWZMQ0E4NjM1T1VQbXFhcXNRURoiQUZNQUdHcksyYzRNenhkTUR1M19TWTBlTWxtUU9vRkc1QRIDODQ5GgEzIhoKAXESFWJ0ZyBhIGFzIGNycHRpIG1vZWRhcyIHCgN0YnMSACImCgRlcWxkEh5DZ0lJQUJBQU9nUUlBQkFBVlRXXzBEMXRNZVRpUFEStgIKzwESzAEKjAFBTGt0X3ZFUWNHUW9GNXBrNHJtV0VkVzBSRExBNjJfY21vS0U3V3RIMkFDSWN4dFItWkphay11SllsbVhIeTdES0JtV0x3RFF3N3B0SjFWcGQzNFNSUmV5cWZ6NGlEMU1nZXhPbTlxai0tcndJeW5CRmJwejFxQTdJTkVZbWt4UFNLOEZZT0toUlRibxIXbGZWYWFmTENBODYzNU9VUG1xYXFzUVEaIkFGTUFHR29CNkFfelVqa1Rralpla2dzOV83WGFldEs5UmcSBDQ2OTgaATMiGAoGaW1nZGlpEg5lNjhqYndXZV80cWoxTSIXCgVkb2NpZBIOMzIxTG9tckh2c1JCek0iJgoEZXFsZBIeQ2dJSUFCQUFPZ1FJQUJBQVZUV18wRDF0TWVUaVBRKhBlLWU2OGpid1dlXzRxajFNIAQqFwoBcxIQZS1lNjhqYndXZV80cWoxTRgBMAEYByDL_sGpDTABSgoIAhACGAIgAigC',
      label: 'BTG e Criptomoedas'
    },
    {
      link: 'https://www.google.com/search?q=Ita%C3%BA+a+as+crpti+moedas+esta+vendendo&client=ms-android-xiaomi-terr1-rso2&hs=xFRU&sca_esv=9e62302b854df37b&udm=2&biw=406&bih=765&sxsrf=AE3TifNa0yUuCwoZgrmPrZDbs729pqkyZQ%3A1767568906690&ei=CvZaaf3lKd-75OUPmv7P-Q4&oq=Ita%C3%BA+a+as+crpti+moedas+esta+vendendo&gs_lp=EhJtb2JpbGUtZ3dzLXdpei1pbWciJUl0YcO6IGEgYXMgY3JwdGkgbW9lZGFzIGVzdGEgdmVuZGVuZG8yCBAAGIAEGKIESK45UIAVWNgwcAF4AJABAJgByQGgAZEOqgEGMC4xMC4xuAEDyAEA-AEBmAIJoALLCsICBxAjGCcYyQKYAwCIBgGSBwMxLjigB80psgcDMC44uAfDCsIHBTItNi4zyAdIgAgA&sclient=mobile-gws-wiz-img#sv=CAMSjwUa7wQKoQIKuQEStgEKd0FMa3RfdkU4dHh4U2pLY2NxU29MU0FSM3dvejhpQTdEenNMNVItY1dKN1pLeEZjVVZBMDZzVi14bFpSc0kzODhidldFcUFUMEQwOHptMFJzQnphTFVJVUtmUVphTGExVG56SkN3dmxTa215UFphMVpkbGNZVEpBEhdFX1phYWVLQk00WDg1T1VQaDRtdXlRYxoiQUZNQUdHby12N3hLV05iREVvcE5Dbm9GR1FFNzk0RDlsdxIDODQ5GgEzIioKAXESJUl0YcO6IGEgYXMgY3JwdGkgbW9lZGFzIGVzdGEgdmVuZGVuZG8iBwoDdGJzEgAiJgoEZXFsZBIeQ2dJSUFCQUFPZ1FJQUJBQVZmdk1YajF0elZlNVBRErYCCs8BEswBCowBQUxrdF92R3Q3dVlFLUwwM003S21HVmdSQzVJYWtFYTZkZTV1bG5tNmRnTUtrcUdBSC1lTER2eHUtUFlwaHpQdzNVVXAwSlZEMEt1R0pmdGV3Q3hmY1Bhd3dfRjR6NE12QlNrZ0Z5NFFKN1FENV9sZDF1d01NRm9mUWxXakNJSU1qMFZLNDFBdUJwLWQSF0VfWmFhZUtCTTRYODVPVVBoNG11eVFjGiJBRk1BR0dvWFctQTBfYWZZbjhidlRvbG1pT1IxLWRJTjlREgQ0Njk4GgEzIhgKBmltZ2RpaRIOZE1Jd3Z3X3V6ZkNIWU0iFwoFZG9jaWQSDmVSWWtsYjlsa2tWeG9NIiYKBGVxbGQSHkNnSUlBQkFBT2dRSUFCQUFWZnZNWGoxdHpWZTVQUSoQZS1kTUl3dndfdXpmQ0hZTSAEKhcKAXMSEGUtZE1Jd3Z3X3V6ZkNIWU0YATABGAcgqrLdpQEwAUoKCAIQAhgCIAIoAg',
      label: 'Itaú e Criptomoedas'
    }
  ];

  return (
    <section className="py-16 bg-dark-900">
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primeira parte - imagem e texto */}
          <div>
            <div className="mb-4">
              <img
                src={imageDiv1}
                alt="Imagem Gemini"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="text-left mt-6 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Por que a Bode Coin é a sua melhor decisão?
              </h3>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Muitos investidores perdem dinheiro em taxas e spreads bancários que só enriquecem grandes instituições. A Bode Coin inverte essa lógica, criando um ecossistema de ajuda mútua onde o valor permanece com quem realmente faz a engrenagem girar: você.
              </p>

              <h4 className="text-lg md:text-xl font-bold text-gold-500 mt-6 mb-3">
                O Caminho dos Gigantes
              </h4>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Grandes oportunidades like Ethereum e Binance Coin começaram pequenas. A BODE segue esse rastro de visão, mas com um diferencial exclusivo: onboarding assistido. Ensinamos você a navegar com segurança, transformando o complexo em algo simples.
              </p>

              <h4 className="text-lg md:text-xl font-bold text-gold-500 mt-6 mb-3">
                Os Pilares da nossa Segurança:
              </h4>

              <div className="space-y-4 mt-4">
                <div>
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">Soberania Financeira:</h5>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Suas chaves, seu dinheiro. Na rede descentralizada, ninguém confisca seu saldo.
                  </p>
                </div>

                <div>
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">Liquidez Real:</h5>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Comprometimento com o crescimento através de injeções semanais de capital (US$ 1.000 + 20.000 tokens) para garantir a saúde do projeto.
                  </p>
                </div>

                <div>
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">Comunidade de Verdade:</h5>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Nascemos nos motoclubes e nas palestras. Somos irmãos cuidando de irmãos, unindo a confiança do aperto de mão à transparência da tecnologia Blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda parte - imagem dividida em 4 partes clicáveis e texto */}
          <div>
            <div className="mb-4 relative">
              <img
                src={image}
                alt="Imagem Bode Coin"
                className="w-full h-auto object-contain rounded-lg"
              />
              {/* Áreas clicáveis sobrepostas */}
              <div className="absolute inset-0 grid grid-cols-2">
                {/* Parte superior esquerda */}
                <a
                  href={imageLinks[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:bg-black/10 transition-all border-r border-b border-transparent hover:border-gold-500/50"
                  title={imageLinks[0].label}
                ></a>

                {/* Parte superior direita */}
                <a
                  href={imageLinks[1].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:bg-black/10 transition-all border-l border-b border-transparent hover:border-gold-500/50"
                  title={imageLinks[1].label}
                ></a>

                {/* Parte inferior esquerda */}
                <a
                  href={imageLinks[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:bg-black/10 transition-all border-r border-t border-transparent hover:border-gold-500/50"
                  title={imageLinks[0].label}
                ></a>

                {/* Parte inferior direita */}
                <a
                  href={imageLinks[2].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:bg-black/10 transition-all border-l border-t border-transparent hover:border-gold-500/50"
                  title={imageLinks[2].label}
                ></a>
              </div>
            </div>
            <div className="text-left mt-6 space-y-4">
              <div>
                <h5 className="text-base md:text-lg font-semibold text-white mb-2">Exemplos a ser Seguidos</h5>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                  Na Bode Coin, o valor está travado na Blockchain com mecanismos anti-baleia e anti-bot.
                </p>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                  <strong className="text-white">Faça o que os Bilionarios Fazem:</strong> Seguimos o exemplo de líderes como Elon Musk e instituições como o BTG Pactual e HSBC, que usam a Blockchain pela sua segurança inabalável.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <img
                  src={imageDiv2Text}
                  alt="Imagem Exemplos"
                  className="w-full h-auto object-contain rounded-lg"
                />
                <img
                  src={imageDiv2Text2}
                  alt="Imagem Exemplos 2"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <img
                  src={imageDiv2Text3}
                  alt="Imagem Exemplos 3"
                  className="w-full h-auto object-contain rounded-lg"
                />
                <img
                  src={imageDiv2Text4}
                  alt="Imagem Exemplos 4"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
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
    </section>
  );
};

export default Carousel;
