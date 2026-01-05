
import React from 'react';
import { TRANSLATIONS, RESTAURANT_INFO } from '../constants.ts';
import { Language } from '../types.ts';
import { ShieldCheck, Leaf, Wind } from 'lucide-react';

interface Props { lang: Language; }

const About: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="about" className="min-h-screen flex items-center py-24 bg-[#080808] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff4d00]/5 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start max-w-[1400px] mx-auto">
          
          {/* Narrative Column */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center min-h-[60vh]">
            <div className="flex items-center gap-4 mb-8 stagger-item">
              <span className="text-[#ff4d00] font-black uppercase tracking-[0.5em] text-[10px]">{t.about.label}</span>
              <div className="h-[1px] w-12 bg-white/10"></div>
              <span className="text-white/30 text-[9px] font-bold uppercase tracking-2em">Est. {RESTAURANT_INFO.openedDate}</span>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-10 leading-[0.85] text-white tracking-tighter stagger-item" style={{ transitionDelay: '150ms' }}>
              {t.about.title} <br /> <span className="text-[#ff4d00] italic">{t.about.titleAccent}</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light mb-16 max-w-xl stagger-item" style={{ transitionDelay: '300ms' }}>
              {t.about.desc}
            </p>
            
            {/* The Pillars of Craft - Staggered Sequentially */}
            <div className="grid sm:grid-cols-3 gap-8 mb-16">
              <div className="flex flex-col gap-4 stagger-item" style={{ transitionDelay: '450ms' }}>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4d00]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-lg mb-2">{t.about.pillar1}</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">{t.about.pillar1Desc}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 stagger-item" style={{ transitionDelay: '550ms' }}>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4d00]">
                  <Leaf size={18} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-lg mb-2">{t.about.pillar2}</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">{t.about.pillar2Desc}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 stagger-item" style={{ transitionDelay: '650ms' }}>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4d00]">
                  <Wind size={18} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-lg mb-2">{t.about.pillar3}</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">{t.about.pillar3Desc}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-12 px-6 stagger-item" style={{ transitionDelay: '800ms' }}>
               <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-white tracking-tighter">100%</span>
                  <span className="text-[9px] text-[#ff4d00] font-black uppercase tracking-[0.4em]">{t.about.stat1}</span>
               </div>
               <div className="h-10 w-[1px] bg-white/10"></div>
               <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-white tracking-tighter italic">Scenic</span>
                  <span className="text-[9px] text-[#ff4d00] font-black uppercase tracking-[0.4em]">{t.about.stat2}</span>
               </div>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-8 stagger-item" style={{ transitionDelay: '200ms' }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff4d00]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl liquid-glass">
                <img
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1740"
                  alt="Fire Place Atmosphere"
                  className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-10 left-10">
                  <span className="text-white font-serif text-2xl italic tracking-tight">"{t.common.slogan}"</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
