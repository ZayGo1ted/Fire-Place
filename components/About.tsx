
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface Props { lang: Language; }

const About: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;
  return (
    <section id="about" className="py-32 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff4d00]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1747"
                alt="Fire Place Atmosphere"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 glass p-10 rounded-3xl hidden lg:block border border-white/10 shadow-2xl">
              <p className="text-4xl font-serif font-bold text-[#ff4d00] mb-1 tracking-tighter">10 Ans</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">D'Excellence Riverside</p>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <span className="text-[#ff4d00] font-bold uppercase tracking-[0.5em] mb-6 block text-[10px]">{t.label}</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[0.9] text-white tracking-tighter">
                {t.title} <br /> <span className="text-[#ff4d00] italic">{t.titleAccent}</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed font-light">
                {t.desc}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 pt-6">
              <div>
                <p className="text-3xl font-serif font-bold text-white mb-2">100%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">{t.stat1}</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-white mb-2">Prime</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">{t.stat2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
