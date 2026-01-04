
import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO, TRANSLATIONS, INITIAL_MENU } from '../constants.ts';
import { MenuCategory, Language, MenuItem } from '../types.ts';
import { Coffee, Utensils, Pizza, IceCream, Wine, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';

interface Props { lang: Language; }

const MenuSection: React.FC<Props> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>(MenuCategory.BREAKFAST);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [loading, setLoading] = useState(true);
  const t = TRANSLATIONS[lang].menu;

  useEffect(() => {
    const fetchMenu = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase.from('menu_items').select('*');
        if (data && data.length > 0) {
          const transformed: MenuItem[] = data.map((item: any) => ({
            id: item.id,
            name: { fr: item.name_fr, en: item.name_en },
            description: { fr: item.description_fr, en: item.description_en },
            price: item.price,
            category: item.category,
          }));
          setMenuItems(transformed);
        }
      } catch (err) {
        console.error('Unexpected error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = [
    { id: MenuCategory.BREAKFAST, name: t.cats[MenuCategory.BREAKFAST], icon: <Coffee size={16} /> },
    { id: MenuCategory.LUNCH, name: t.cats[MenuCategory.LUNCH], icon: <Utensils size={16} /> },
    { id: MenuCategory.DINNER, name: t.cats[MenuCategory.DINNER], icon: <Pizza size={16} /> },
    { id: MenuCategory.DESSERTS, name: t.cats[MenuCategory.DESSERTS], icon: <IceCream size={16} /> },
    { id: MenuCategory.DRINKS, name: t.cats[MenuCategory.DRINKS], icon: <Wine size={16} /> },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="min-h-screen py-24 bg-[#0a0a0a] flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#ff4d00] font-bold uppercase tracking-[0.6em] mb-4 block text-[9px] stagger-item">{t.label}</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6 italic text-white tracking-tight stagger-item" style={{ transitionDelay: '100ms' }}>{t.title}</h2>
          <div className="w-16 h-px bg-[#ff4d00] mx-auto opacity-40 stagger-item" style={{ transitionDelay: '200ms' }}></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16 stagger-item" style={{ transitionDelay: '300ms' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 font-bold uppercase text-[9px] tracking-[0.2em] border leading-none
                ${activeCategory === cat.id
                  ? 'bg-[#ff4d00] text-white shadow-xl shadow-[#ff4d00]/20 border-[#ff4d00]'
                  : 'bg-white/[0.03] text-white/40 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#ff4d00]" size={32} />
            <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">Menu Loading...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
            {filteredItems.length > 0 ? filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="stagger-item group border-b border-white/5 pb-8 flex flex-col"
                style={{ transitionDelay: `${400 + (idx * 100)}ms` }}
              >
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-xl md:text-2xl font-serif font-bold group-hover:text-[#ff4d00] transition-colors duration-500 text-white/90">
                    {item.name[lang]}
                  </h3>
                  <div className="h-px flex-grow mx-4 border-b border-white/5 border-dotted"></div>
                  <span className="text-[#ff4d00] font-bold text-lg tracking-tighter">{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                  {item.description[lang]}
                </p>
              </div>
            )) : (
              <div className="col-span-2 text-center py-20 opacity-20 italic">
                {lang === 'fr' ? 'Aucun article dans cette catégorie.' : 'No items in this category.'}
              </div>
            )}
          </div>
        )}

        <div className="mt-20 flex justify-center stagger-item" style={{ transitionDelay: '800ms' }}>
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/\+/g, '').replace(/ /g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 h-14 flex items-center justify-center bg-white text-black font-black rounded-xl hover:bg-[#ff4d00] hover:text-white transition-all duration-500 hover:scale-105 shadow-2xl uppercase tracking-[0.3em] text-[9px]"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
