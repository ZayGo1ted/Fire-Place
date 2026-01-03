
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      <div className="fixed top-0 left-0 w-full z-[1000] px-4 md:px-8 pointer-events-none">
        <header 
          className={`mx-auto max-w-7xl mt-4 md:mt-6 transition-all duration-500 rounded-2xl md:rounded-[2rem] glass-nav pointer-events-auto ${
            scrolled ? 'py-2 md:py-3' : 'py-4 md:py-5'
          }`}
        >
          <div className="container mx-auto px-6 flex items-center justify-between">
            {/* Brand - Smaller but sharper */}
            <a href="#home" className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#ff4d00] flex items-center justify-center shadow-lg shadow-[#ff4d00]/20">
                <Flame className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-serif font-bold tracking-tight text-white leading-none">
                  FIRE <span className="text-[#ff4d00] italic">PLACE</span>
                </span>
                <span className="hidden sm:block text-[6px] md:text-[7px] uppercase tracking-[0.3em] text-white/30 font-bold mt-0.5">EST. {RESTAURANT_INFO.openedDate}</span>
              </div>
            </a>

            {/* Navigation - Uniform smaller text */}
            <nav className="hidden lg:flex items-center bg-white/[0.03] rounded-full border border-white/5 px-2 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all rounded-full shine-link"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-[8px] md:text-[9px] font-black tracking-widest text-white/40 hover:text-white px-3 py-1 bg-white/5 rounded-md border border-white/5"
              >
                {lang === 'fr' ? 'FR' : 'EN'}
              </button>
              
              <a
                href={`tel:${safePhone}`}
                className="h-8 md:h-10 flex items-center justify-center px-4 md:px-6 rounded-lg bg-[#ff4d00] text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-md"
              >
                BOOK
              </a>

              <button 
                className="lg:hidden text-white p-1.5 md:p-2 bg-white/5 rounded-lg border border-white/5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Unified Mobile Menu with same styling */}
      <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl z-[999] transition-all duration-500 lg:hidden ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#ff4d00]/10 blur-[100px] rounded-full"></div>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl md:text-3xl font-serif font-bold text-white hover:text-[#ff4d00] transition-all transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="w-12 h-px bg-white/10 mt-4"></div>
          <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase font-bold">Kenitra Riverside</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
