
import React, { useState, useEffect } from 'react';
import { Flame, Menu, X } from 'lucide-react';
import { RESTAURANT_INFO, TRANSLATIONS } from '../constants.ts';
import { Language } from '../types.ts';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<Props> = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.footer.home, href: '#home' },
    { name: t.footer.about, href: '#about' },
    { name: t.footer.menu, href: '#menu' },
    { name: t.footer.testimonials, href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const safePhone = RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '');

  return (
    <>
      {/* Universal Floating Dock - Absolute consistency across all viewports */}
      <div className="fixed top-4 md:top-8 left-0 w-full z-[1000] px-4 pointer-events-none flex justify-center">
        <header 
          className={`flex items-center glass-dock pointer-events-auto w-fit transition-all duration-700 ease-out ${
            scrolled 
              ? 'py-2 px-3 md:px-5 gap-4 md:gap-10 rounded-2xl md:rounded-[1.5rem]' 
              : 'py-3 px-5 gap-6 md:gap-14 rounded-[2.2rem] md:rounded-[3rem]'
          }`}
        >
          {/* Brand - Scalable and Sharp */}
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <div className={`transition-all duration-500 rounded-lg bg-[#ff4d00] flex items-center justify-center shadow-lg shadow-[#ff4d00]/30 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <Flame className={`${scrolled ? 'w-4 h-4' : 'w-5 h-5'} text-white group-hover:rotate-12 transition-transform`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold tracking-tight text-white leading-none transition-all duration-500 ${scrolled ? 'text-xs md:text-sm' : 'text-sm md:text-base'}`}>
                FIRE <span className="text-[#ff4d00] italic">PLACE</span>
              </span>
              {!scrolled && (
                <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-black mt-1 hidden sm:block">Riverside</span>
              )}
            </div>
          </a>

          {/* Nav Links - High Density & Elegant */}
          <nav className="hidden sm:flex items-center gap-1 md:gap-2 bg-white/[0.04] rounded-full px-1.5 py-1 ring-1 ring-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all rounded-full shine-link whitespace-nowrap ${
                  scrolled ? 'px-3 py-1.5' : 'px-5 py-2'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions - Grouped for balance */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className={`text-[9px] font-black tracking-widest text-white/30 hover:text-white bg-white/5 rounded-md ring-1 ring-white/5 transition-all ${
                scrolled ? 'px-2 py-1' : 'px-3 py-1.5'
              }`}
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
            
            <a
              href={`tel:${safePhone}`}
              className={`flex items-center justify-center rounded-xl bg-[#ff4d00] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl shadow-[#ff4d00]/20 overflow-hidden ${
                scrolled ? 'h-9 px-4' : 'h-11 px-7'
              }`}
            >
              <span className="hidden sm:inline">RESERVE</span>
              <span className="sm:hidden">BOOK</span>
            </a>

            {/* Hamburger - Only for extreme small width */}
            <button 
              className="sm:hidden text-white/50 p-2 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </div>

      {/* Unified Mobile Drawer - Cohesive with Dock design */}
      <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl z-[999] transition-all duration-700 sm:hidden ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ff4d00]/5 blur-[140px] rounded-full"></div>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-3xl font-serif font-bold text-white hover:text-[#ff4d00] transition-all transform tracking-tight ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="w-16 h-px bg-white/10 my-6"></div>
          <div className="flex gap-6">
             <a href={RESTAURANT_INFO.socials.instagram} className="text-white/20 hover:text-[#ff4d00] transition-colors font-black uppercase tracking-widest text-[10px]">Instagram</a>
             <a href={RESTAURANT_INFO.socials.facebook} className="text-white/20 hover:text-[#ff4d00] transition-colors font-black uppercase tracking-widest text-[10px]">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
