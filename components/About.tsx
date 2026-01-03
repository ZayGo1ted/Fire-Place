
import React from 'react';
import { TRANSLATIONS } from '../constants.ts';
import { Language } from '../types.ts';

interface Props { lang: Language; }

const About: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;
  return (
    <section id="about" className="min-h-screen flex items-center py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#ff4d00]/10 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="text-[#ff4d00] font-black uppercase tracking-[0.5em] mb-6 block text-[10px]">{t.label}</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-10 leading-[0.9] text-white tracking-tighter">
              {t.title} <br /> <span className="text-[#ff4d00] italic">Riverside</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light mb-12 max-w-xl">
              {t.desc}
            </p>
            
            <div className="flex gap-16 border-t border-white/5 pt-10">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif font-bold text-white tracking-tighter">100%</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black">{t.stat1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif font-bold text-white tracking-tighter">View</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black">{t.stat2}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-[#ff4d00]/20 rounded-[3rem] rotate-6 scale-95 transition-transform duration-700 hover:rotate-0"></div>
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1747"
                  alt="Fire Place Mood"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-2xl hidden md:block">
                <p className="text-black font-serif text-3xl font-bold italic tracking-tighter">Authentique</p>
                <p className="text-[8px] text-black/40 font-black uppercase tracking-[0.3em] mt-1">Expérience Culinaire</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
