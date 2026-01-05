
import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS, INITIAL_MENU, RESTAURANT_INFO } from '../constants.ts';
import { MenuCategory, Language, MenuItem } from '../types.ts';
import { 
  Coffee, Utensils, Pizza, IceCream, Wine, Loader2, Search, 
  Flame, Clock, Filter, ChevronRight, Hash 
} from 'lucide-react';
import { supabase } from '../lib/supabase.ts';

interface Props { lang: Language; }

const MenuSection: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  
  // High-level grouping for better UX
  const CHAPTERS = useMemo(() => [
    { id: 'morning', label: { fr: 'Matinée', en: 'Morning' }, icon: <Coffee />, cats: [MenuCategory.BREAKFAST, MenuCategory.HAPPY_KIDS, MenuCategory.A_LA_CARTE, MenuCategory.EXTRAS] },
    { id: 'starters', label: { fr: 'Entrées', en: 'Starters' }, icon: <Filter />, cats: [MenuCategory.ENTREE_SNACKS, MenuCategory.ENTREE_PLATS, MenuCategory.TARTINES, MenuCategory.SALADE] },
    { id: 'mains', label: { fr: 'Plats Principaux', en: 'Mains' }, icon: <Pizza />, cats: [MenuCategory.BURGERS, MenuCategory.SANDWICHES, MenuCategory.PATES, MenuCategory.PIZZA, MenuCategory.TACOS, MenuCategory.PANINIS] },
    { id: 'gourmet', label: { fr: 'Signature', en: 'Gourmet' }, icon: <Flame />, cats: [MenuCategory.RISOTTO, MenuCategory.PASTICCIO] },
    { id: 'drinks', label: { fr: 'Boissons', en: 'Drinks' }, icon: <Wine />, cats: [MenuCategory.HOT_DRINKS, MenuCategory.SPECIAL_HOT_DRINK, MenuCategory.DRINKING_CHOCOLATE, MenuCategory.THE_INFUSION, MenuCategory.COLD_DRINKS, MenuCategory.COCKTAILS, MenuCategory.SMOOTHIES, MenuCategory.JUS, MenuCategory.MILK_SHAKES] },
    { id: 'sweets', label: { fr: 'Douceurs', en: 'Sweets' }, icon: <IceCream />, cats: [MenuCategory.CREPES, MenuCategory.GAUFRES, MenuCategory.DESSERTS] },
  ], []);

  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>(CHAPTERS[0].cats[0]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await supabase.from('menu_items').select('*').order('category', { ascending: true });
        if (data && data.length > 0) {
          const transformed: MenuItem[] = data.map((item: any) => ({
            id: item.id,
            name: { fr: item.name_fr || item.item, en: item.name_en || item.item },
            description: { fr: item.description_fr || item.description, en: item.description_en || item.description },
            price: item.price.toString().includes('DH') ? item.price : `${item.price} DH`,
            category: item.category,
          }));
          setMenuItems(transformed);
        }
      } catch (err) {
        console.error('Menu fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return items.filter(item => 
        item.name[lang].toLowerCase().includes(q) || 
        item.description[lang].toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return items.filter(item => item.category === activeCategory);
  }, [menuItems, activeCategory, searchQuery, lang]);

  const currentChapter = CHAPTERS.find(c => c.id === activeChapter);

  return (
    <section id="menu" className="min-h-screen py-24 bg-[#050505] relative flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#ff4d00]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 stagger-item">
            <div className="h-px w-8 bg-[#ff4d00]"></div>
            <span className="text-[#ff4d00] font-black uppercase tracking-[0.5em] text-[10px]">{t.menu.label}</span>
            <div className="h-px w-8 bg-[#ff4d00]"></div>
          </div>
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tighter mb-8 stagger-item">
            {lang === 'fr' ? 'L\'Expérience ' : 'The '}
            <span className="italic text-[#ff4d00]">{lang === 'fr' ? 'Complète' : 'Full Experience'}</span>
          </h2>

          <div className="max-w-2xl mx-auto relative stagger-item group" style={{ transitionDelay: '100ms' }}>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#ff4d00] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={t.menu.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-16 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff4d00]/50 focus:bg-white/[0.05] transition-all backdrop-blur-md"
            />
          </div>
        </div>

        {!searchQuery && (
          <div className="flex justify-center mb-8 stagger-item" style={{ transitionDelay: '200ms' }}>
            <div className="flex bg-white/[0.03] p-2 rounded-2xl border border-white/5 backdrop-blur-xl overflow-x-auto no-scrollbar max-w-full">
              {CHAPTERS.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapter(chapter.id);
                    setActiveCategory(chapter.cats[0]);
                  }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 whitespace-nowrap
                    ${activeChapter === chapter.id 
                      ? 'bg-white text-black shadow-2xl' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  <span className={activeChapter === chapter.id ? 'text-black' : 'text-[#ff4d00]'}>
                    {React.cloneElement(chapter.icon as React.ReactElement<any>, { size: 16 })}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{chapter.label[lang]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!searchQuery && currentChapter && (
          <div className="flex flex-wrap justify-center gap-2 mb-16 stagger-item" style={{ transitionDelay: '300ms' }}>
            {currentChapter.cats.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 text-[9px] font-bold uppercase tracking-widest
                  ${activeCategory === cat 
                    ? 'bg-[#ff4d00]/10 border-[#ff4d00] text-[#ff4d00]' 
                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
              >
                {t.menu.cats[cat as MenuCategory] || cat}
              </button>
            ))}
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6 stagger-item">
               <Loader2 className="animate-spin text-[#ff4d00]" size={40} />
               <p className="text-white/20 uppercase tracking-[0.4em] text-[11px] font-black">{t.menu.loadingMenu}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
              {filteredItems.length > 0 ? filteredItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="stagger-item group border-b border-white/5 pb-10 flex flex-col justify-between"
                  style={{ transitionDelay: `${idx % 6 * 50}ms` }}
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-[#ff4d00] transition-colors duration-500">
                        {item.name[lang]}
                      </h3>
                      <div className="h-px flex-grow mx-4 border-b border-white/5 border-dotted"></div>
                      <span className="text-[#ff4d00] font-black text-lg tracking-tighter whitespace-nowrap">{item.price}</span>
                    </div>
                    {item.description[lang] && (
                      <p className="text-gray-500 text-sm leading-relaxed italic font-light max-w-md">
                        {item.description[lang]}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[8px] px-2 py-0.5 rounded-sm bg-white/5 text-white/40 border border-white/5 uppercase font-bold tracking-tighter">
                       {t.menu.cats[item.category as MenuCategory] || item.category}
                     </span>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 text-center py-32 opacity-20 flex flex-col items-center gap-4">
                  <Hash size={48} strokeWidth={1} />
                  <p className="italic text-lg tracking-tight">
                    {t.menu.noResults}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-32 flex flex-col items-center gap-8 stagger-item">
          <div className="flex items-center gap-6">
            <div className="h-px w-12 bg-white/10"></div>
            <Clock className="text-white/20" size={20} />
            <div className="h-px w-12 bg-white/10"></div>
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-4">{t.menu.readyToTaste}</p>
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-16 px-16 flex items-center justify-center bg-white text-black font-black rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl"
          >
            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em]">{t.menu.cta}</span>
            <div className="absolute inset-0 bg-[#ff4d00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
