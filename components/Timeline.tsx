import React from 'react';
import { ShoppingCart, Handshake, HeartHandshake, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Timeline: React.FC = () => {
  const { t } = useLanguage();

const steps = [
  {
    id: "01",
      title: t('timeline.step1.title'),
      desc: t('timeline.step1.desc'),
    icon: <ShoppingCart className="text-gold-500" size={24} />
  },
  {
    id: "02",
      title: t('timeline.step2.title'),
      desc: t('timeline.step2.desc'),
    icon: <Handshake className="text-gold-500" size={24} />
  },
  {
    id: "03",
      title: t('timeline.step3.title'),
      desc: t('timeline.step3.desc'),
    icon: <HeartHandshake className="text-gold-500" size={24} />
  },
  {
    id: "04",
      title: t('timeline.step4.title'),
      desc: t('timeline.step4.desc'),
    icon: <TrendingUp className="text-gold-500" size={24} />
  }
];

  return (
    <section id="timeline" className="py-24 bg-dark-900">
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t('timeline.title')}</h2>
          <p className="text-gray-400 mt-2 text-lg">{t('timeline.subtitle')}</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-dark-800 md:bg-dark-900 p-6 rounded-xl md:rounded-none md:p-0 md:bg-transparent text-center md:hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-20 h-20 mx-auto bg-dark-800 border-2 border-gold-500 rounded-full flex items-center justify-center mb-6 relative shadow-[0_0_15px_rgba(234,179,8,0.3)] z-10 group-hover:bg-dark-700 transition-colors">
                  {React.cloneElement(step.icon as React.ReactElement<any>, { size: 32 })}
                  <div className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-dark-900">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;