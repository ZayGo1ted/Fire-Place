
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
    { name: 'Testimonials', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const safePhone = RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '');

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'py-4 glass-nav border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo Section - Given more space */}
        <a href="#home" className="flex items-center gap-4 group">
          <div className="relative">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-2xl ${
              scrolled ? 'bg-[#ff4d00]' : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}>
              <Flame className={`w-5 h-5 md:w-6 md:h-6 ${scrolled ? 'text-white' : 'text-[#ff4d00]'}`} />
            </div>
            {!scrolled && (
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050505] animate-pulse"></div>
            )}
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white">
              FIRE <span className="text-[#ff4d00] italic">PLACE</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-black">Café & Restaurant</span>
          </div>
        </a>

        {/* Desktop Links - Improved padding and spacing */}
        <nav className="hidden lg:flex items-center bg-white/[0.03] border border-white/10 px-8 py-2 rounded-full backdrop-blur-lg ml-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-[#ff4d00] transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#ff4d00] transition-all duration-300 group-hover:w-1/2"></span>
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="hidden sm:block text-[10px] font-black tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          
          <a
            href={`tel:${safePhone}`}
            className="hidden md:flex h-11 items-center justify-center px-8 rounded-xl bg-[#ff4d00] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 shadow-lg shadow-[#ff4d00]/20"
          >
            {lang === 'fr' ? 'Réserver' : 'Book Now'}
          </a>

          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505] z-[-1] transition-transform duration-500 lg:hidden ${
        mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-bold text-white hover:text-[#ff4d00]"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 mt-8">
            <button onClick={() => setLang('fr')} className={`px-4 py-2 rounded-lg ${lang === 'fr' ? 'bg-[#ff4d00] text-white' : 'text-white/40'}`}>FR</button>
            <button onClick={() => setLang('en')} className={`px-4 py-2 rounded-lg ${lang === 'en' ? 'bg-[#ff4d00] text-white' : 'text-white/40'}`}>EN</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
