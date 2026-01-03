
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      {/* Universal Floating Dock - Always Centered */}
      <div className="fixed top-4 md:top-8 left-0 w-full z-[1000] px-4 pointer-events-none flex justify-center">
        <header 
          className={`flex items-center glass-dock pointer-events-auto transition-all duration-500 ${
            scrolled 
              ? 'py-2 px-4 gap-4 md:gap-8 rounded-2xl md:rounded-[1.5rem]' 
              : 'py-3 px-6 gap-6 md:gap-10 rounded-[2rem] md:rounded-[2.5rem]'
          }`}
        >
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <div className={`transition-all duration-500 rounded-lg bg-[#ff4d00] flex items-center justify-center shadow-lg shadow-[#ff4d00]/20 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <Flame className={`${scrolled ? 'w-4 h-4' : 'w-5 h-5'} text-white group-hover:scale-110 transition-transform`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] md:text-[15px] font-serif font-bold tracking-tight text-white leading-none">
                FIRE <span className="text-[#ff4d00] italic">PLACE</span>
              </span>
              {!scrolled && (
                <span className="text-[6px] uppercase tracking-[0.4em] text-white/30 font-black mt-0.5">Kenitra</span>
              )}
            </div>
          </a>

          {/* Nav Links - Visible on most screens, fluid spacing */}
          <nav className="hidden sm:flex items-center bg-white/[0.04] rounded-full px-1 py-1 border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 md:px-5 py-2 text-[8px] font-black uppercase tracking-[0.25em] text-white/40 hover:text-white transition-all rounded-full shine-link whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-[8px] font-black tracking-widest text-white/30 hover:text-white px-2 py-1 bg-white/5 rounded-md border border-white/5 transition-colors"
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
            
            <a
              href={`tel:${safePhone}`}
              className={`flex items-center justify-center rounded-lg bg-[#ff4d00] text-white text-[8px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-md ${
                scrolled ? 'h-8 px-4' : 'h-10 px-6'
              }`}
            >
              BOOK
            </a>

            {/* Hamburger for mobile only */}
            <button 
              className="sm:hidden text-white p-2 bg-white/5 rounded-lg border border-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </header>
      </div>

      {/* Full Screen Liquid Glass Mobile Menu */}
      <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl z-[999] transition-all duration-700 sm:hidden ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#ff4d00]/10 blur-[120px] rounded-full"></div>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-3xl font-serif font-bold text-white hover:text-[#ff4d00] transition-all transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="w-16 h-px bg-white/10 mt-6"></div>
          <p className="text-[9px] tracking-[0.6em] text-white/20 uppercase font-black">Fire Place Riverside</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
