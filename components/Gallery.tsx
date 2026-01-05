
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, RefreshCw } from 'lucide-react';
import { fetchGalleryImages } from '../services/geminiService.ts';
import { GalleryImage, Language } from '../types.ts';

const FALLBACK_IMAGES: GalleryImage[] = [
  { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600", alt: "Signature Fire Place Dish", source: "Official" },
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600", alt: "Warm Interior Glow", source: "Official" },
  { url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1600", alt: "Riverside Dining Experience", source: "Official" },
  { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1600", alt: "Evening Ambiance at Corniche", source: "Official" }
];

interface Props { lang: Language; }

const Gallery: React.FC<Props> = ({ lang }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const aiImages = await fetchGalleryImages();
      // Combine AI images with fallbacks to ensure we always have content
      const combined = aiImages.length > 0 
        ? [...aiImages, ...FALLBACK_IMAGES].slice(0, 8) 
        : FALLBACK_IMAGES;
      setImages(combined);
      setLoading(false);
    };
    loadImages();
  }, [retryCount]);

  const handleImageError = (index: number) => {
    // If an image fails to load, replace it with a fresh random unsplash food/restaurant image
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = {
        ...newImages[index],
        url: `https://source.unsplash.com/featured/?restaurant,food&sig=${Math.random()}`,
        source: "Fallback"
      };
      return newImages;
    });
  };

  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="gallery" className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="stagger-item">
            <span className="text-[#ff4d00] font-black uppercase tracking-[0.5em] text-[10px] block mb-4">
              {lang === 'fr' ? 'Atmosphère' : 'Atmosphere'}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter leading-none">
              Live from the <br /><span className="text-[#ff4d00] italic">Corniche</span>
            </h2>
          </div>
          <button 
            onClick={() => setRetryCount(prev => prev + 1)}
            className="flex items-center gap-2 text-white/40 hover:text-[#ff4d00] transition-colors text-[10px] uppercase font-black tracking-widest stagger-item"
            style={{ transitionDelay: '200ms' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            {lang === 'fr' ? 'Actualiser le flux' : 'Refresh Feed'}
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl bg-white/[0.02]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full border-t-2 border-[#ff4d00] animate-spin"></div>
                <Camera className="text-white/10" size={32} />
              </div>
            ) : (
              images.map((img, idx) => (
                <div 
                  key={`${idx}-${img.url}`}
                  className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
                  }`}
                >
                  <img 
                    src={img.url} 
                    alt={img.alt} 
                    className="w-full h-full object-cover" 
                    onError={() => handleImageError(idx)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff4d00]">
                      {img.source === 'Official' ? 'Verified Atmosphere' : `Discovered via ${img.source}`}
                    </span>
                    <h3 className="text-white font-serif text-2xl md:text-4xl italic max-w-2xl">{img.alt}</h3>
                  </div>
                </div>
              ))
            )}

            {/* Controls */}
            {!loading && (
              <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex gap-4 z-20">
                <button 
                  onClick={prev}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full liquid-glass border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={next}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full liquid-glass border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 flex justify-center">
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                i === activeIndex ? 'w-16 bg-[#ff4d00]' : 'w-4 bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
