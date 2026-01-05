
import React from 'react';
import { MapPin, Navigation, Anchor, Compass } from 'lucide-react';
import { RESTAURANT_INFO, TRANSLATIONS } from '../constants.ts';
import { Language } from '../types.ts';

interface Props { lang: Language; }

const Location: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="location" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden flex items-center min-h-screen">
      <div className="absolute bottom-0 right-0 w-[1000px] h-[600px] bg-[#ff4d00]/5 blur-[160px] pointer-events-none -mb-32"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-[1400px] mx-auto">
          
          {/* Information Panel */}
          <div className="lg:col-span-5 stagger-item">
            <div className="h-full liquid-glass p-10 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col justify-center">
              <span className="text-[#ff4d00] font-bold uppercase tracking-[0.6em] mb-6 block text-[10px]">{t.location.label}</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white tracking-tight leading-[1.1]">
                {t.location.title}
              </h2>
              <p className="text-gray-400 mb-12 leading-relaxed text-lg font-light">
                {t.location.desc}
              </p>

              {/* Proximity Indicators */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4d00]">
                    <Anchor size={18} />
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest block mb-1">{t.location.nearby}</span>
                    <span className="text-white font-medium tracking-tight text-sm">{t.location.landmark1}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4d00]">
                    <Compass size={18} />
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest block mb-1">{t.location.nearby}</span>
                    <span className="text-white font-medium tracking-tight text-sm">{t.location.landmark2}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <MapPin className="text-[#ff4d00] shrink-0 mt-1" size={20} />
                  <p className="text-white/90 font-medium text-base tracking-tight leading-snug">{RESTAURANT_INFO.address}</p>
                </div>
                
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=Fire+Place+Restaurant+Kenitra`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-16 bg-[#ff4d00] text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-[#ff4d00]/20 active:scale-95"
                >
                  {t.location.cta} <Navigation size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Map Presentation */}
          <div className="lg:col-span-7 h-[500px] lg:h-auto stagger-item" style={{ transitionDelay: '200ms' }}>
            <div className="relative h-full w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-1000 z-10 pointer-events-none"></div>
              
              <iframe
                title="Location Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.7554900767576!2d-6.587841123447959!3d34.26756857307436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7596000000001%3A0x8899889988998899!2sFire%20Place!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
                className="group-hover:filter-none transition-all duration-1000"
              ></iframe>

              <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                 <div className="liquid-glass px-6 py-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse"></div>
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">{t.common.riverside}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
