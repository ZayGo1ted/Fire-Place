
import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
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
      
      const sections = ['home', 'about', 'menu', 'reviews', 'location'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
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

  const waLink = `https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(lang === 'fr' ? 'Bonjour, je souhaite réserver une table.' : 'Hello, I would like to book a table.')}`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[1000] p-3 md:p-6 pointer-events-none flex justify-center">
        <nav 
          role="navigation"
          aria-label="Main Navigation"
          className={`pointer-events-auto liquid-glass-nav flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            scrolled 
              ? 'w-[95%] lg:w-[85%] rounded-2xl h-14 md:h-16 px-5 md:px-10 shadow-2xl saturate-[200%]' 
              : 'w-full md:w-full rounded-3xl h-16 md:h-20 px-5 md:px-12 shadow-lg'
          }`}
        >
          {/* Brand Identity */}
          <a href="#home" className="flex items-center gap-2 md:gap-3 group shrink-0 relative z-20">
            <div className={`flex items-center justify-center rounded-xl bg-[#ff4d00] transition-all duration-500 shadow-lg shadow-[#ff4d00]/30 ${scrolled ? 'w-7 h-7' : 'w-9 h-9'}`}>
               <svg viewBox="0 0 100 100" className={`${scrolled ? 'w-4 h-4' : 'w-5 h-5'} fill-white group-hover:scale-110 transition-transform`}>
                 <path d="M50 15C50 15 32 45 32 65C32 76.0457 40.9543 85 50 85C59.0457 85 68 76.0457 68 65C68 45 50 15 50 15ZM50 75C44.4772 75 40 70.5228 40 65C40 58 50 45 50 45C50 45 60 58 60 65C60 70.5228 55.5228 75 50 75Z" />
               </svg>
            </div>
            <span className={`font-serif font-bold text-white tracking-tight transition-all duration-500 ${scrolled ? 'text-base md:text-lg' : 'text-lg md:text-2xl'}`}>
              FIRE <span className="text-[#ff4d00] italic">PLACE</span>
            </span>
          </a>

          {/* Desktop Links - Optimized: hidden on md (tablets) to prevent title blending */}
          <div className="hidden lg:flex items-center lg:gap-10 absolute left-1/2 -translate-x-1/2 w-auto whitespace-nowrap">
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

          {/* Action Cluster */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0 relative z-20">
            <div className="hidden xl:flex flex-col items-end mr-2">
              <span className="text-[7px] font-black uppercase tracking-widest text-white/30">{t.common.whatsapp}</span>
              <a href={waLink} className="text-[10px] font-bold text-white hover:text-[#ff4d00] transition-colors">{RESTAURANT_INFO.whatsapp}</a>
            </div>

            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              aria-label="Toggle Language"
              className="text-[9px] md:text-[10px] font-black tracking-widest text-white/50 hover:text-white bg-white/5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 transition-all border border-white/5"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            
            {/* Hamburger (Visible on Tablets/Mobile) */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile/Tablet Glass Overlay Menu */}
      <div className={`fixed inset-0 z-[999] transition-all duration-700 lg:hidden ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[#050505]/98 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ff4d00]/5 blur-[120px] pointer-events-none rounded-full"></div>
          
          {menuLinks.map((link, idx) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-3xl font-serif font-bold text-white hover:text-[#ff4d00] transition-all transform ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.label}
            </a>
          ))}

          <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-xs">
            <div className="h-px w-12 bg-white/10"></div>
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#ff4d00] font-serif text-2xl tracking-tight"
            >
              <MessageCircle size={20} />
              {RESTAURANT_INFO.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
