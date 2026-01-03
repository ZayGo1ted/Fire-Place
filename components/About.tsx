
import React from 'react';
import { TRANSLATIONS, RESTAURANT_INFO } from '../constants.ts';
import { Language } from '../types.ts';

interface Props { lang: Language; }

const About: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;
  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#ff4d00]/5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#ff4d00] font-black uppercase tracking-[0.4em] text-[9px]">{t.label}</span>
              <div className="h-px w-8 bg-white/10"></div>
              <span className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em]">Established {RESTAURANT_INFO.openedDate}</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-[1] text-white tracking-tighter">
              {t.title} <br /> <span className="text-[#ff4d00] italic">Riverside</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light mb-10 max-w-lg">
              {t.desc}
            </p>
            
            <div className="flex gap-12 border-t border-white/5 pt-8">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-serif font-bold text-white tracking-tighter">100%</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-[0.2em] font-black">{t.stat1}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-serif font-bold text-white tracking-tighter">View</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-[0.2em] font-black">{t.stat2}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-[#ff4d00]/10 rounded-[2rem] rotate-3 scale-95 transition-transform duration-700 hover:rotate-0"></div>
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1747"
                  alt="Fire Place Mood"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
