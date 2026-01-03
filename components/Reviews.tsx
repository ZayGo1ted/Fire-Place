
import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS, TRANSLATIONS } from '../constants.ts';
import { Review, Language } from '../types.ts';

interface Props { lang: Language; }

const Reviews: React.FC<Props> = ({ lang }) => {
  const [reviews] = useState<Review[]>(REVIEWS);
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

  const totalPages = Math.ceil(reviews.length / itemsPerView);

  useEffect(() => {
    if (totalPages <= 1) return;
    const startRotation = () => {
      timerRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 8000);
    };

    startRotation();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
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
    <section id="reviews" className="py-40 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff4d00]/20 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 reveal">
          <span className="text-[#ff4d00] font-bold uppercase tracking-[0.7em] mb-6 block text-[10px]">{t.label}</span>
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8 italic text-white tracking-tight leading-tight">{t.title}</h2>
          <div className="w-20 h-px bg-[#ff4d00] mx-auto opacity-20"></div>
        </div>

        <div className="relative max-w-[90rem] mx-auto mb-12 px-4">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).map((review, rIdx) => (
                    <div key={`${review.id}-${rIdx}`} className="h-full">
                      <div className="glass p-10 lg:p-12 h-full rounded-[3rem] relative group border-white/[0.04] flex flex-col items-start shadow-2xl transition-all duration-700 hover:border-[#ff4d00]/30 hover:bg-white/[0.03]">
                        <Quote className="absolute top-8 right-8 text-white/[0.01] group-hover:text-[#ff4d00]/10 transition-colors duration-1000" size={60} />
                        
                        <div className="flex gap-1.5 mb-8">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? "fill-[#ff4d00] text-[#ff4d00]" : "text-gray-900"} />
                          ))}
                        </div>

                        <p className="text-gray-100 text-lg md:text-xl italic mb-10 leading-[1.6] font-light font-serif flex-grow">
                          "{review.comment}"
                        </p>

                        <div className="flex items-center gap-5 mt-auto w-full pt-6 border-t border-white/5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff4d00] to-[#8a2e00] flex items-center justify-center font-bold text-white text-xl shadow-xl shrink-0">
                            {review.name?.charAt(0) || '?'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-white text-base tracking-tight truncate">{review.name || 'Anonyme'}</h4>
                            <p className="text-gray-600 text-[9px] uppercase tracking-[0.4em] mt-1">{review.date || 'Recent'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-16">
              <button 
                onClick={handleManualPrev}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#ff4d00] transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleManualNext}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#ff4d00] transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
