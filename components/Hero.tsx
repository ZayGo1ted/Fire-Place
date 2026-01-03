
import React from 'react';
import { RESTAURANT_INFO, TRANSLATIONS } from '../constants.ts';
import { Language } from '../types.ts';
import { ArrowRight, Instagram } from 'lucide-react';

interface Props { lang: Language; }

const Hero: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].hero;
  const waLink = `https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070"
          alt="Fire Place Atmosphere"
          className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md text-[#ff4d00] text-[9px] font-black uppercase tracking-[0.5em] animate-fade-in shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse"></span>
          {t.location}
        </div>
        
        <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-serif font-bold mb-8 tracking-tighter leading-[0.8] text-white animate-slide-up">
          FIRE <span className="text-[#ff4d00] italic text-glow">PLACE</span>
        </h1>
        
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-14 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-delay">
          {t.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-fade-in-delay-2">
          <a
            href="#menu"
            className="group relative h-14 md:h-16 px-12 flex items-center justify-center bg-white text-black font-black rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em]">{t.cta}</span>
            <div className="absolute inset-0 bg-[#ff4d00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <ArrowRight className="relative z-10 ml-4 group-hover:text-white transition-colors" size={16} />
          </a>
          
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 md:h-16 px-12 flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-lg text-white font-black rounded-xl hover:bg-white/10 transition-all duration-500 text-[10px] uppercase tracking-[0.3em]"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-6">
        <a href={RESTAURANT_INFO.socials.instagram} className="text-white/30 hover:text-[#ff4d00] transition-colors"><Instagram size={20}/></a>
        <div className="w-12 h-px bg-white/20"></div>
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Kenitra Riverside</span>
      </div>

      <style>{`
        @keyframes subtle-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-delay { animation: fade-in 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-in-delay-2 { animation: fade-in 1s ease-out 0.6s forwards; opacity: 0; }
        .animate-slide-up { animation: slide-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};

export default Hero;
