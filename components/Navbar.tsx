
import React from 'react';
import { Language } from '../types.ts';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<Props> = ({ lang, setLang }) => {
  return (
    <div className="fixed top-6 right-6 z-[1000] pointer-events-none">
      <button 
        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        className="pointer-events-auto glass-dock flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl hover:scale-110 active:scale-95 transition-all duration-500 group"
      >
        <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
          {lang === 'fr' ? 'EN' : 'FR'}
        </span>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-[#ff4d00]/50 transition-all"></div>
      </button>
    </div>
  );
};

export default Navbar;
