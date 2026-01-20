import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const Tokenomics: React.FC = () => {
  const { t } = useLanguage();

  const data = [
    { name: t('tokenomics.allocation.liquidity'), value: 50, color: '#A16207' }, // Dark Gold
    { name: t('tokenomics.allocation.community'), value: 30, color: '#EAB308' }, // Gold - Equipe/Investidor
    { name: t('tokenomics.allocation.reserve'), value: 10, color: '#525252' }, // Dark Gray
    { name: t('tokenomics.allocation.gifts'), value: 8, color: '#78716C' }, // Brown Gray
    { name: t('tokenomics.allocation.charity'), value: 1, color: '#404040' }, // Medium Gray
    { name: t('tokenomics.allocation.marketing'), value: 1, color: '#262626' }, // Darker Gray
  ];

  return (
    <section id="tokenomics" className="py-24 bg-dark-800 border-y border-white/5">
      <div className="max-w-[90%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">

          {/* Chart Side */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative">
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white text-center">
              2 BI<br /><span className="text-sm text-gray-400 font-normal">BodeCoin</span>
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={160}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', color: '#fff' }}
                  itemStyle={{ color: '#FACC15' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Info Side */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{t('tokenomics.title')}</h2>
            <div className="space-y-6">

              <div className="bg-dark-900 p-6 md:p-8 rounded-lg border-l-4 border-gold-500 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-4 gap-3 sm:gap-0">
                  <span className="text-gray-400 text-base sm:text-lg">{t('tokenomics.totalSupply')}</span>
                  <span className="text-white font-bold text-xl sm:text-2xl break-words">2.000.000.000 BodeCoin</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-4 gap-3 sm:gap-0">
                  <span className="text-gray-400 text-base sm:text-lg">{t('tokenomics.network')}</span>
                  <span className="text-white font-bold text-base sm:text-lg break-words">Solana (SOL)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-2 rounded hover:bg-white/5 transition-colors">
                    <div className="w-5 h-5 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300 font-medium">{item.name} <span className="text-gold-500 font-bold">({item.value}%)</span></span>
                  </div>
                ))}
              </div>

                

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;