
import React from 'react';
import { TRANSLATIONS, RESTAURANT_INFO } from '../constants.ts';
import { Language } from '../types.ts';

interface Props { lang: Language; }

const About: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;
  return (
    <section id="about" className="min-h-screen flex items-center py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#ff4d00]/5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center max-w-[1300px] mx-auto">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-8 stagger-item">
              <span className="text-[#ff4d00] font-black uppercase tracking-[0.4em] text-[9px]">{t.label}</span>
              <div className="h-px w-8 bg-white/10"></div>
              <span className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em]">Since {RESTAURANT_INFO.openedDate}</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold mb-10 leading-[0.9] text-white tracking-tighter stagger-item" style={{ transitionDelay: '150ms' }}>
              {t.title} <br /> <span className="text-[#ff4d00] italic">{t.titleAccent}</span>
            </h2>
            <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light mb-12 max-w-lg stagger-item" style={{ transitionDelay: '300ms' }}>
              {t.desc}
            </p>
            
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-white/5 stagger-item" style={{ transitionDelay: '450ms' }}>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tighter">100%</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black">{t.stat1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tighter italic">Riverside</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black">{t.stat2}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center stagger-item" style={{ transitionDelay: '200ms' }}>
            <div className="relative w-full aspect-[4/5] max-w-md group">
              <div className="absolute inset-0 bg-[#ff4d00]/10 rounded-[3rem] rotate-3 scale-95 transition-transform duration-1000 group-hover:rotate-0"></div>
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl liquid-glass">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1747"
                  alt="Fire Place Atmosphere"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
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
