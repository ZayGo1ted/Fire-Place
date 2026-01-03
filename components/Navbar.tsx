
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
      {/* Universal Floating Dock Wrapper */}
      <div className="fixed top-4 md:top-8 left-0 w-full z-[1000] px-4 pointer-events-none flex justify-center">
        <header 
          className={`transition-all duration-700 glass-dock pointer-events-auto flex items-center gap-6 md:gap-12 ${
            scrolled ? 'py-2 px-4 md:py-3 md:px-6 rounded-2xl' : 'py-3 px-6 md:py-4 md:px-10 rounded-[2.5rem]'
          }`}
        >
          {/* Brand - Compact & Sharpened */}
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <div className={`transition-all duration-500 rounded-lg bg-[#ff4d00] flex items-center justify-center shadow-lg shadow-[#ff4d00]/20 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <Flame className={`${scrolled ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-serif font-bold tracking-tight text-white leading-none">
                FIRE <span className="text-[#ff4d00] italic">PLACE</span>
              </span>
              {!scrolled && (
                <span className="hidden sm:block text-[6px] uppercase tracking-[0.3em] text-white/30 font-bold mt-0.5">Est. {RESTAURANT_INFO.openedDate}</span>
              )}
            </div>
          </a>

          {/* Nav Links - Unified compact style for ALL screens above SM */}
          <nav className="hidden sm:flex items-center bg-white/[0.04] rounded-full px-1 py-1 border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 md:px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all rounded-full shine-link"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions Group */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-[8px] font-black tracking-widest text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded-md border border-white/5 transition-colors"
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
            
            <a
              href={`tel:${safePhone}`}
              className="hidden md:flex h-9 items-center justify-center px-5 rounded-lg bg-[#ff4d00] text-white text-[8px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-md"
            >
              BOOK
            </a>

            {/* Mobile Hamburger - Only for extreme narrow screens */}
            <button 
              className="sm:hidden text-white p-2 bg-white/5 rounded-lg border border-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </header>
      </div>

      {/* Unified Mobile Overlay */}
      <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl z-[999] transition-all duration-500 sm:hidden ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#ff4d00]/15 blur-[100px] rounded-full"></div>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-serif font-bold text-white hover:text-[#ff4d00] transition-all transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="w-12 h-px bg-white/10 mt-4"></div>
          <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase font-bold">Kenitra • Riverside</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
