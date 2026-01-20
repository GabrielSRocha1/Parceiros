import React, { useCallback } from 'react';
import { TrendingUp, Wrench, Heart, Shield, Users, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToPayment = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('pagamento-imagens');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.location.hash = '#pagamento-imagens';
    }
  }, []);

  const benefits = [
    {
      icon: <TrendingUp size={32} className="text-gold-500" />,
      title: t('features.benefit1.title'),
      desc: t('features.benefit1.desc')
    },
    {
      icon: <Wrench size={32} className="text-gold-500" />,
      title: t('features.benefit2.title'),
      desc: t('features.benefit2.desc')
    },
    {
      icon: <Heart size={32} className="text-gold-500" />,
      title: t('features.benefit3.title'),
      desc: t('features.benefit3.desc')
    }
  ];

  const differentials = [
    {
      icon: <Users size={24} />,
      title: t('features.diff1.title'),
      desc: t('features.diff1.desc')
    },
    {
      icon: <Shield size={24} />,
      title: t('features.diff2.title'),
      desc: t('features.diff2.desc')
    },
    {
      icon: <Globe size={24} />,
      title: t('features.diff3.title'),
      desc: t('features.diff3.desc')
    },
    {
      icon: <TrendingUp size={24} />,
      title: t('features.diff4.title'),
      desc: t('features.diff4.desc')
    }
  ];

  return (
    <section id="beneficios" className="py-24 bg-dark-800">
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Botão Empresas Parceiras - Mobile Only (início da seção) */}
        <div className="sm:hidden flex justify-center mb-8">
          <a
            href="https://parceiros.bodecoin.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 cursor-pointer text-base"
          >
            {t('nav.buyNow')}
          </a>
        </div>

        {/* Benefits Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('features.title')}</h2>
          <p className="text-gray-400 text-lg">{t('features.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {benefits.map((item, idx) => (
            <div key={idx} className="bg-dark-700 p-8 md:p-10 rounded-2xl border border-gray-800 hover:border-gold-500/50 transition-all hover:bg-dark-700/80 group">
              <div className="w-16 h-16 bg-dark-900 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-gray-800 group-hover:border-gold-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-24 flex justify-center">
          <a
            href="https://wa.link/cv1m27"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-extrabold text-xl sm:text-2xl transition-all transform hover:scale-105 cursor-pointer"
          >
            Comprar Agora
          </a>
        </div>

        {/* Differentials Grid (2x2) */}
        <div className="bg-dark-900 rounded-3xl p-8 md:p-16 border border-white/5">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white">{t('features.differentials.title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {differentials.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-6 p-6 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex-shrink-0 text-gold-500 mt-1 scale-125">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;