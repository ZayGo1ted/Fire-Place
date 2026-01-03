
import React, { useState, useEffect } from 'react';
import { Flame, ChevronDown, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO, TRANSLATIONS } from '../constants.ts';
import { Language } from '../types.ts';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<Props> = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const t = TRANSLATIONS[lang];

  const sectionIds = ['home', 'about', 'menu', 'reviews', 'location', 'contact'];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update current section index based on scroll position
      const offsets = sectionIds.map(id => {
        const el = document.getElementById(id);
        if (!el) return Infinity;
        const rect = el.getBoundingClientRect();
        return Math.abs(rect.top);
      });
      const minOffsetIndex = offsets.indexOf(Math.min(...offsets));
      setCurrentSectionIndex(minOffsetIndex);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFastScroll = () => {
    const isAtEnd = currentSectionIndex >= sectionIds.length - 1;
    const nextIndex = isAtEnd ? 0 : currentSectionIndex + 1;
    const nextId = sectionIds[nextIndex];
    const element = document.getElementById(nextId);
    
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: t.footer.home, href: '#home' },
    { name: t.footer.about, href: '#about' },
    { name: t.footer.menu, href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const safePhone = RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '');

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled 
          ? 'py-6 translate-y-0' 
          : 'py-10 md:py-14 translate-y-0'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
          <div 
            className={`absolute inset-x-4 md:inset-x-8 -inset-y-2 transition-all duration-700 rounded-[2.5rem] pointer-events-none z-[-1] ${
              scrolled 
              ? 'bg-white/[0.04] backdrop-blur-[40px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-100 scale-100' 
              : 'opacity-0 scale-[0.98]'
            }`}
          />

          <a href="#home" className="flex items-center gap-4 group shrink-0 relative z-[81] pl-4">
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-[14px] flex items-center justify-center border transition-all duration-700 shadow-2xl ${
              scrolled ? 'bg-[#ff4d00] border-[#ff4d00]' : 'bg-[#ff4d00]/10 border-[#ff4d00]/20'
            }`}>
              <Flame className={`w-5 h-5 md:w-7 md:h-7 transition-colors duration-500 ${scrolled ? 'text-white' : 'text-[#ff4d00]'}`} />
            </div>
            <span className="text-xl md:text-3xl font-serif font-bold tracking-tighter text-white">
              FIRE <span className="text-[#ff4d00]">PLACE</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-14 xl:gap-24 ml-auto pr-4">
            <div className="flex items-center gap-10 xl:gap-14">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link text-[11px] xl:text-[12px] font-black transition-all uppercase tracking-[0.45em] text-white/50 hover:text-white whitespace-nowrap py-3"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-6 w-px bg-white/20"></div>

            <div className="flex items-center gap-8 xl:gap-12">
              <button 
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-[11px] xl:text-[12px] font-black tracking-[0.35em] text-white/40 hover:text-[#ff4d00] transition-colors uppercase px-4 py-2 hover:bg-white/5 rounded-xl"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              
              <a
                href={`tel:${safePhone}`}
                className={`flex h-14 items-center justify-center transition-all duration-500 px-10 rounded-full text-[11px] xl:text-[12px] font-black uppercase tracking-[0.45em] leading-none shadow-2xl ${
                  scrolled 
                  ? 'bg-white text-black hover:bg-[#ff4d00] hover:text-white' 
                  : 'bg-[#ff4d00] text-white hover:bg-white hover:text-black'
                }`}
              >
                {lang === 'fr' ? 'Réserver' : 'Reserve'}
              </a>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-4 pr-4">
             <button 
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-[11px] font-bold text-white/80 uppercase tracking-widest px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-10 right-6 lg:hidden z-[90] pointer-events-none">
        <button 
          onClick={handleFastScroll}
          className="pointer-events-auto w-14 h-14 bg-[#ff4d00] text-white rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(255,77,0,0.5)] active:scale-90 transition-all border border-white/20"
        >
          {currentSectionIndex >= sectionIds.length - 1 ? (
            <ArrowUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
};

export default Navbar;
