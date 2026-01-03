
import React from 'react';
import { RESTAURANT_INFO, TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface Props { lang: Language; }

const Hero: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].hero;
  const waLink = `https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070"
          alt="Fire Place Restaurant"
          className="w-full h-full object-cover scale-105 animate-[subtle-zoom_30s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="mt-8 md:mt-20 lg:mt-28 mb-10 inline-flex items-center justify-center px-10 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-md text-[#ff4d00] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.7em] animate-fade-in leading-none shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          {t.location}
        </div>
        
        <h1 className="text-4xl sm:text-7xl md:text-[9.5rem] lg:text-[12rem] font-serif font-bold mb-10 md:mb-14 tracking-tighter leading-[0.85] text-white animate-slide-up">
          FIRE <span className="text-[#ff4d00] italic">PLACE</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-400 mb-16 md:mb-28 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-delay px-4">
          {t.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center items-center animate-fade-in-delay-2">
          <a
            href="#menu"
            className="w-full sm:w-80 md:w-96 h-16 md:h-20 flex items-center justify-center bg-[#ff4d00] hover:bg-[#e64500] text-white font-black rounded-[2rem] transition-all duration-700 transform hover:scale-105 shadow-[0_25px_60px_-10px_rgba(255,77,0,0.6)] text-[12px] uppercase tracking-[0.5em] leading-none"
          >
            <span>{t.cta}</span> <ArrowRight className="ml-5 w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-80 md:w-96 h-16 md:h-20 flex items-center justify-center glass hover:bg-white hover:text-black text-white font-black rounded-[2rem] transition-all duration-700 transform hover:scale-105 text-[12px] uppercase tracking-[0.5em] gap-5 leading-none"
          >
            <MessageCircle size={24} /> <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 hidden sm:flex">
        <div className="w-px h-28 bg-gradient-to-b from-[#ff4d00] to-transparent"></div>
      </div>

      <style>{`
        @keyframes subtle-zoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-delay { animation: fade-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }
        .animate-fade-in-delay-2 { animation: fade-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards; opacity: 0; }
        .animate-slide-up { animation: fade-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};

export default Hero;
