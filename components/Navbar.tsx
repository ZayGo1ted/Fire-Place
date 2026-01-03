
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
      <header 
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          scrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              scrolled ? 'bg-[#ff4d00]' : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}>
              <Flame className={`w-5 h-5 ${scrolled ? 'text-white' : 'text-[#ff4d00]'}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold tracking-tight text-white leading-none">
                FIRE <span className="text-[#ff4d00] italic">PLACE</span>
              </span>
              <span className="text-[7px] uppercase tracking-[0.3em] text-white/40 font-bold mt-1">Est. {RESTAURANT_INFO.openedDate}</span>
            </div>
          </a>

          {/* Desktop Links - Smaller and spaced out to avoid "blending" */}
          <nav className="hidden lg:flex items-center gap-2 ml-auto mr-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all hover:bg-white/5 rounded-full shine-link"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="hidden sm:block text-[9px] font-black tracking-[0.1em] text-white/40 hover:text-white transition-colors border border-white/10 px-3 py-1 rounded-md"
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
            
            <a
              href={`tel:${safePhone}`}
              className="hidden md:flex h-10 items-center justify-center px-6 rounded-lg bg-[#ff4d00] text-white text-[9px] font-black uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-all shadow-lg shadow-[#ff4d00]/10"
            >
              Book
            </a>

            <button 
              className="lg:hidden text-white p-2 bg-white/5 rounded-lg border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-[999] transition-all duration-500 lg:hidden ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#ff4d00]/15 blur-[100px] rounded-full"></div>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-3xl font-serif font-bold text-white hover:text-[#ff4d00] transition-all transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className={`flex gap-6 mt-12 transform transition-all delay-500 ${mobileMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <button onClick={() => {setLang('fr'); setMobileMenuOpen(false);}} className={`text-sm font-black tracking-widest ${lang === 'fr' ? 'text-[#ff4d00]' : 'text-white/40'}`}>FRANÇAIS</button>
            <div className="w-px h-4 bg-white/10"></div>
            <button onClick={() => {setLang('en'); setMobileMenuOpen(false);}} className={`text-sm font-black tracking-widest ${lang === 'en' ? 'text-[#ff4d00]' : 'text-white/40'}`}>ENGLISH</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
