
import React from 'react';
import { Phone, MessageSquare, Clock } from 'lucide-react';
import { RESTAURANT_INFO, TRANSLATIONS } from '../constants.ts';
import { Language } from '../types.ts';

interface Props { lang: Language; }

const Contact: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const safePhone = RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '');
  const waLink = `https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#ff4d00] font-bold uppercase tracking-[0.5em] mb-4 block text-[10px] stagger-item">{t.contact.label}</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white tracking-tighter italic stagger-item" style={{ transitionDelay: '150ms' }}>{t.contact.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed font-light stagger-item" style={{ transitionDelay: '300ms' }}>{t.contact.desc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="liquid-glass liquid-glass-hover p-12 rounded-[2.5rem] transition-all duration-700 group flex flex-col items-center text-center stagger-item" style={{ transitionDelay: '450ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#ff4d00] mb-8 group-hover:bg-[#ff4d00] group-hover:text-white transition-all duration-500 shadow-xl">
              <Phone size={28} />
            </div>
            <h4 className="text-[10px] font-bold mb-4 uppercase tracking-[0.4em] text-white/30">{t.contact.phone}</h4>
            <a href={`tel:${safePhone}`} className="text-white font-serif text-2xl hover:text-[#ff4d00] transition-colors tracking-tight">{RESTAURANT_INFO.phone}</a>
          </div>

          <div className="liquid-glass liquid-glass-hover p-12 rounded-[2.5rem] transition-all duration-700 group flex flex-col items-center text-center stagger-item" style={{ transitionDelay: '550ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#ff4d00] mb-8 group-hover:bg-[#ff4d00] group-hover:text-white transition-all duration-500 shadow-xl">
              <MessageSquare size={28} />
            </div>
            <h4 className="text-[10px] font-bold mb-4 uppercase tracking-[0.4em] text-white/30">{t.common.whatsapp}</h4>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-white font-serif text-2xl hover:text-[#ff4d00] transition-colors tracking-tight uppercase">{t.common.chatNow}</a>
          </div>

          <div className="liquid-glass liquid-glass-hover p-12 rounded-[2.5rem] transition-all duration-700 group flex flex-col items-center text-center stagger-item" style={{ transitionDelay: '650ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#ff4d00] mb-8 group-hover:bg-[#ff4d00] group-hover:text-white transition-all duration-500 shadow-xl">
              <Clock size={28} />
            </div>
            <h4 className="text-[10px] font-bold mb-4 uppercase tracking-[0.4em] text-white/30">{t.contact.open}</h4>
            <p className="text-white font-serif text-2xl tracking-tight">{RESTAURANT_INFO.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
