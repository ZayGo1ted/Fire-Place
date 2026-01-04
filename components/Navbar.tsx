
import React, { useState, useEffect } from 'react';
import { Flame, Menu, X, ArrowUpRight } from 'lucide-react';
import { TRANSLATIONS, RESTAURANT_INFO } from '../constants.ts';
import { Language } from '../types.ts';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<Props> = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic section tracking for active state
      const sections = ['home', 'about', 'menu', 'reviews', 'location'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuLinks = [
    { id: 'home', label: t.footer.home },
    { id: 'about', label: t.footer.about },
    { id: 'menu', label: t.footer.menu },
    { id: 'reviews', label: t.footer.testimonials },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Liquid Glass Navbar - Universal Wrapper */}
      <div className="fixed top-0 left-0 w-full z-[1000] p-4 md:p-6 pointer-events-none flex justify-center">
        <nav 
          role="navigation"
          aria-label="Main Navigation"
          className={`pointer-events-auto liquid-glass-nav flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            scrolled 
              ? 'w-full md:w-[90%] lg:w-[75%] rounded-2xl h-16 px-4 md:px-8 shadow-2xl saturate-[200%]' 
              : 'w-full md:w-full rounded-3xl h-20 px-6 md:px-12 shadow-lg'
          }`}
          style={{
            transform: `translateY(${scrolled ? '0' : '0'})`,
            opacity: 1
          }}
        >
          {/* Brand Identity */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className={`flex items-center justify-center rounded-xl bg-[#ff4d00] transition-all duration-500 shadow-lg shadow-[#ff4d00]/30 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <Flame className={`${scrolled ? 'w-4 h-4' : 'w-5 h-5'} text-white group-hover:rotate-12 transition-transform`} />
            </div>
            <span className={`font-serif font-bold text-white tracking-tight transition-all duration-500 ${scrolled ? 'text-lg' : 'text-xl md:text-2xl'}`}>
              FIRE <span className="text-[#ff4d00] italic">PLACE</span>
            </span>
          </a>

          {/* Desktop Links - Minimalist Centered Grid */}
          <div className="hidden lg:flex items-center gap-8">
            {menuLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-white ${
                  activeSection === link.id ? 'nav-link-active' : 'text-white/40'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Cluster (Language + CTA) */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              aria-label="Toggle Language"
              className="text-[10px] font-black tracking-widest text-white/30 hover:text-white bg-white/5 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-all border border-white/5"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
              className="hidden sm:flex items-center gap-2 px-6 h-10 bg-white text-black rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#ff4d00] hover:text-white transition-all shadow-xl"
            >
              BOOK <ArrowUpRight size={12} />
            </a>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Glass Overlay Menu */}
      <div className={`fixed inset-0 z-[999] transition-all duration-700 lg:hidden ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center gap-10 p-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ff4d00]/5 blur-[120px] pointer-events-none rounded-full"></div>
          
          {menuLinks.map((link, idx) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-4xl font-serif font-bold text-white hover:text-[#ff4d00] transition-all transform ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.label}
            </a>
          ))}

          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="h-px w-12 bg-white/10"></div>
            <div className="flex gap-8">
               <a href={RESTAURANT_INFO.socials.instagram} className="text-white/20 hover:text-[#ff4d00] transition-colors font-bold tracking-widest text-[10px] uppercase">Instagram</a>
               <a href={RESTAURANT_INFO.socials.facebook} className="text-white/20 hover:text-[#ff4d00] transition-colors font-bold tracking-widest text-[10px] uppercase">Facebook</a>
            </div>
            <a 
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="text-[#ff4d00] font-serif text-xl tracking-tight"
            >
              {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
