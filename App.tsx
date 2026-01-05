
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import MenuSection from './components/Menu.tsx';
import Location from './components/Location.tsx';
import Contact from './components/Contact.tsx';
import Reviews from './components/Reviews.tsx';
import { RESTAURANT_INFO, TRANSLATIONS } from './constants.ts';
import { Instagram, Facebook, Flame } from 'lucide-react';
import { Language } from './types.ts';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.classList.add('js-ready');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#ff4d00] selection:text-white">
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        <div id="home" className="reveal active">
          <Hero lang={lang} />
        </div>
        
        <div id="about" className="reveal">
          <About lang={lang} />
        </div>
        
        <div id="menu" className="reveal">
          <MenuSection lang={lang} />
        </div>
        
        <div id="reviews" className="reveal">
          <Reviews lang={lang} />
        </div>
        
        <div id="location" className="reveal">
          <Location lang={lang} />
        </div>
        
        <div id="contact" className="reveal">
          <Contact lang={lang} />
        </div>
      </main>

      <footer className="py-24 bg-black border-t border-white/5 reveal">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2 stagger-item">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#ff4d00]/10 flex items-center justify-center border border-[#ff4d00]/20">
                   <Flame className="w-6 h-6 text-[#ff4d00]" />
                </div>
                <span className="text-2xl font-serif font-bold tracking-tight text-white">
                  FIRE <span className="text-[#ff4d00]">PLACE</span>
                </span>
              </div>
              <p className="text-gray-500 max-w-sm mb-10 leading-relaxed text-sm">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                {RESTAURANT_INFO.socials.facebook && (
                  <a
                    href={RESTAURANT_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ff4d00] hover:border-[#ff4d00] transition-all text-gray-500 hover:text-white"
                  >
                    <Facebook size={16} />
                  </a>
                )}
                {RESTAURANT_INFO.socials.instagram && (
                  <a
                    href={RESTAURANT_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ff4d00] hover:border-[#ff4d00] transition-all text-gray-500 hover:text-white"
                  >
                    <Instagram size={16} />
                  </a>
                )}
              </div>
            </div>

            <div className="stagger-item" style={{ transitionDelay: '100ms' }}>
              <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">{t.footer.explore}</h5>
              <ul className="space-y-4 text-gray-500 text-xs font-medium uppercase tracking-wider">
                <li><a href="#home" className="hover:text-[#ff4d00] transition-colors">{t.footer.home}</a></li>
                <li><a href="#about" className="hover:text-[#ff4d00] transition-colors">{t.footer.about}</a></li>
                <li><a href="#menu" className="hover:text-[#ff4d00] transition-colors">{t.footer.menu}</a></li>
                <li><a href="#reviews" className="hover:text-[#ff4d00] transition-colors">{t.footer.testimonials}</a></li>
              </ul>
            </div>

            <div className="stagger-item" style={{ transitionDelay: '200ms' }}>
              <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">{t.footer.contact}</h5>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="leading-relaxed font-light">{RESTAURANT_INFO.address}</li>
                <li className="text-[#ff4d00] font-bold text-lg">{RESTAURANT_INFO.phone}</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[9px] uppercase tracking-[0.3em] font-bold">
            <p>© {new Date().getFullYear()} Fire Place Kenitra.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
