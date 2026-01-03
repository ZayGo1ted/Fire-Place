
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { RESTAURANT_INFO, TRANSLATIONS } from '../constants.ts';
import { Language } from '../types.ts';

interface Props { lang: Language; }

const Location: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].location;
  return (
    <section id="location" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff4d00]/5 blur-[120px] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="liquid-glass p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-center">
            <span className="text-[#ff4d00] font-bold uppercase tracking-[0.5em] mb-4 block text-[9px] md:text-[10px]">{t.label}</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white tracking-tight">{t.title}</h2>
            <p className="text-gray-400 mb-10 leading-relaxed text-base md:text-lg font-light">{t.desc}</p>
            <div className="flex items-start gap-4 mb-12">
              <MapPin className="text-[#ff4d00] shrink-0 mt-1" size={18} />
              <p className="text-white/80 font-medium text-sm md:text-base tracking-tight">{RESTAURANT_INFO.address}</p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=Fire+Place+Restaurant+Kenitra`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 md:h-16 bg-[#ff4d00] text-white font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-[#ff4d00]/10"
            >
              {t.cta} <Navigation size={16} />
            </a>
          </div>
          <div className="h-[400px] md:h-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl relative">
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, opacity: 0.7 }}
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.7554900767576!2d-6.587841123447959!3d34.26756857307436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7596000000001%3A0x8899889988998899!2sFire%20Place!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
