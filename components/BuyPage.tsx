import React from 'react';
import { CheckCircle2, TrendingUp, ShieldCheck, Zap, Coins, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface BuyPageProps {
    language: Language;
}

export const BuyPage: React.FC<BuyPageProps> = ({ language }) => {
  const t = TRANSLATIONS[language].buy;
  return (
    <div className="bg-black min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black"></div>
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 backdrop-blur-sm">
             <span className="text-amber-500 font-bold text-xs tracking-widest uppercase">{t.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            {t.title_prefix} <span className="text-amber-500">BODECOIN</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Starter */}
          <div className="bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
             <div className="mb-4">
                 <span className="text-white font-bold bg-zinc-800 px-3 py-1 rounded-full text-sm">{t.plan_starter}</span>
             </div>
             <h3 className="text-3xl font-extrabold text-white mb-2">100 BODE</h3>
             <div className="flex items-baseline mb-6">
                 <span className="text-4xl font-bold text-white">₲ 150.000</span>
             </div>
             <p className="text-zinc-500 mb-8 text-sm">Perfecto para comenzar a explorar el ecosistema BODECOIN y realizar micro-transacciones.</p>
             <ul className="space-y-4 mb-8 flex-1">
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /> {t.feature_wallet}
                 </li>
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /> {t.feature_no_fee}
                 </li>
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /> {t.feature_support}
                 </li>
             </ul>
             <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-colors">
                 {t.buy_now}
             </button>
          </div>

          {/* Pro / Featured */}
          <div className="bg-zinc-900 rounded-2xl shadow-2xl border-2 border-amber-500 p-8 flex flex-col transform md:-translate-y-4 relative shadow-amber-500/10">
             <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-500 rounded-t-2xl"></div>
             <div className="absolute top-4 right-4">
                 <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">{t.most_popular}</span>
             </div>
             <div className="mb-4 mt-2">
                 <span className="text-black font-bold bg-amber-500 px-3 py-1 rounded-full text-sm">{t.plan_investor}</span>
             </div>
             <h3 className="text-3xl font-extrabold text-white mb-2">1.000 BODE</h3>
             <div className="flex items-baseline mb-6">
                 <span className="text-4xl font-bold text-white">₲ 1.200.000</span>
                 <span className="ml-2 text-green-500 text-sm font-bold">-20% OFF</span>
             </div>
             <p className="text-zinc-400 mb-8 text-sm">La opción preferida por comerciantes y visionarios. Accedé a beneficios exclusivos.</p>
             <ul className="space-y-4 mb-8 flex-1">
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-amber-500 mr-3" /> {t.feature_all_starter}
                 </li>
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-amber-500 mr-3" /> {t.feature_staking_basic}
                 </li>
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-amber-500 mr-3" /> {t.feature_discounts}
                 </li>
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-amber-500 mr-3" /> {t.feature_support_prio}
                 </li>
             </ul>
             <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2">
                 {t.buy_now} <ArrowRight size={18} />
             </button>
          </div>

          {/* Whale */}
          <div className="bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
             <div className="mb-4">
                 <span className="text-white font-bold bg-zinc-800 px-3 py-1 rounded-full text-sm">{t.plan_business}</span>
             </div>
             <h3 className="text-3xl font-extrabold text-white mb-2">5.000 BODE</h3>
             <div className="flex items-baseline mb-6">
                 <span className="text-4xl font-bold text-white">₲ 5.000.000</span>
             </div>
             <p className="text-zinc-500 mb-8 text-sm">Para grandes volúmenes de transacción y máxima rentabilidad en el ecosistema.</p>
             <ul className="space-y-4 mb-8 flex-1">
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-zinc-500 mr-3" /> {t.feature_staking_premium}
                 </li>
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-zinc-500 mr-3" /> {t.feature_advisory}
                 </li>
                 <li className="flex items-center text-zinc-300 text-sm">
                     <CheckCircle2 className="h-5 w-5 text-zinc-500 mr-3" /> {t.feature_ads}
                 </li>
             </ul>
             <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-colors">
                 {t.contact_sales}
             </button>
          </div>
        </div>

        {/* Features / Benefits Grid */}
        <div className="py-12">
           <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-white">{t.why_choose}</h2>
               <p className="text-zinc-500 mt-4 max-w-2xl mx-auto">{t.why_desc}</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:shadow-lg transition-all hover:border-amber-500/30">
                   <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-amber-500 mb-4 border border-zinc-700">
                       <Zap size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t.fast_trans}</h3>
                   <p className="text-zinc-500 text-sm">{t.fast_desc}</p>
               </div>
               <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:shadow-lg transition-all hover:border-amber-500/30">
                   <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-amber-500 mb-4 border border-zinc-700">
                       <ShieldCheck size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t.security}</h3>
                   <p className="text-zinc-500 text-sm">{t.security_desc}</p>
               </div>
               <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:shadow-lg transition-all hover:border-amber-500/30">
                   <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-amber-500 mb-4 border border-zinc-700">
                       <TrendingUp size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t.growth}</h3>
                   <p className="text-zinc-500 text-sm">{t.growth_desc}</p>
               </div>
           </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-8 bg-zinc-900 rounded-2xl p-8 md:p-12 text-center overflow-hidden relative border border-zinc-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-700/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">{t.trust_title}</h3>
                <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Mock Logos */}
                    <div className="text-white font-bold text-xl flex items-center gap-2"><Coins size={20} /> SuperSeis</div>
                    <div className="text-white font-bold text-xl flex items-center gap-2"><Coins size={20} /> Farmacenter</div>
                    <div className="text-white font-bold text-xl flex items-center gap-2"><Coins size={20} /> Biggie</div>
                    <div className="text-white font-bold text-xl flex items-center gap-2"><Coins size={20} /> Petrobras</div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};