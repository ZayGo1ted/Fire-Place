
import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { REVIEWS, TRANSLATIONS } from '../constants.ts';
import { fetchRealReviews } from '../services/geminiService.ts';
import { Review, GroundingChunk, Language } from '../types.ts';

interface Props { lang: Language; }

const Reviews: React.FC<Props> = ({ lang }) => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const t = TRANSLATIONS[lang].reviews;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadGeminiReviews = async () => {
      const data = await fetchRealReviews();
      if (data.reviews && data.reviews.length > 0) {
        setReviews([...data.reviews, ...REVIEWS].slice(0, 10));
      }
      if (data.sources) setSources(data.sources);
    };
    loadGeminiReviews();
  }, []);

  const totalPages = Math.ceil(reviews.length / itemsPerView);

  useEffect(() => {
    if (totalPages <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [totalPages]);

  const handleManualNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handleManualPrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="reviews" className="py-24 md:py-40 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff4d00]/10 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#ff4d00] font-bold uppercase tracking-[0.5em] mb-4 block text-[9px] md:text-[10px] stagger-item">{t.label}</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6 italic text-white tracking-tight stagger-item" style={{ transitionDelay: '150ms' }}>{t.title}</h2>
          
          {sources.length > 0 && (
            <div className="mt-6 flex justify-center gap-3 flex-wrap stagger-item" style={{ transitionDelay: '300ms' }}>
              {sources.map((s, i) => s.web && (
                <a key={i} href={s.web.uri} target="_blank" rel="noopener" className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-white/20 hover:text-[#ff4d00] transition-colors border border-white/5 px-4 py-2 rounded-full bg-white/[0.01]">
                  <ExternalLink size={10} /> {s.web.title}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="relative max-w-[85rem] mx-auto stagger-item" style={{ transitionDelay: '450ms' }}>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-2">
                  {reviews.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).map((review, rIdx) => (
                    <div key={`${review.id}-${rIdx}`} className="liquid-glass liquid-glass-hover p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col h-full group">
                      <Quote className="text-[#ff4d00]/10 mb-6 group-hover:text-[#ff4d00]/30 transition-colors" size={32} />
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? "fill-[#ff4d00] text-[#ff4d00]" : "text-white/10"} />
                        ))}
                      </div>
                      <p className="text-white/80 text-base md:text-lg italic mb-8 leading-relaxed font-serif flex-grow">"{review.comment}"</p>
                      <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                        <div className="w-10 h-10 rounded-xl bg-[#ff4d00]/20 flex items-center justify-center font-bold text-white text-lg">{review.name?.charAt(0)}</div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{review.name}</h4>
                          <p className="text-white/20 text-[8px] uppercase tracking-widest mt-1">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10">
               <button onClick={handleManualPrev} className="p-3 rounded-full border border-white/5 hover:border-[#ff4d00] transition-colors text-white/30 hover:text-white"><ChevronLeft size={18}/></button>
               <button onClick={handleManualNext} className="p-3 rounded-full border border-white/5 hover:border-[#ff4d00] transition-colors text-white/30 hover:text-white"><ChevronRight size={18}/></button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
