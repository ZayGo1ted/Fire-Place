
import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO, TRANSLATIONS, INITIAL_MENU } from '../constants';
import { MenuCategory, Language, MenuItem } from '../types';
import { Coffee, Utensils, Pizza, IceCream, Wine, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props { lang: Language; }

const MenuSection: React.FC<Props> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>(MenuCategory.BREAKFAST);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [loading, setLoading] = useState(true);
  const t = TRANSLATIONS[lang].menu;

  useEffect(() => {
    const fetchMenu = async () => {
      // If supabase client is not initialized (due to missing env vars), 
      // we gracefully skip the fetch and use the INITIAL_MENU from constants.
      if (!supabase) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*');

        if (error) {
          console.error('Error fetching menu from Supabase:', error);
          // Keep static menu on error
        } else if (data && data.length > 0) {
          // Transform Supabase flat structure back to our nested structure
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
    { id: MenuCategory.BREAKFAST, name: t.cats[MenuCategory.BREAKFAST], icon: <Coffee size={18} /> },
    { id: MenuCategory.LUNCH, name: t.cats[MenuCategory.LUNCH], icon: <Utensils size={18} /> },
    { id: MenuCategory.DINNER, name: t.cats[MenuCategory.DINNER], icon: <Pizza size={18} /> },
    { id: MenuCategory.DESSERTS, name: t.cats[MenuCategory.DESSERTS], icon: <IceCream size={18} /> },
    { id: MenuCategory.DRINKS, name: t.cats[MenuCategory.DRINKS], icon: <Wine size={18} /> },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#ff4d00] font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">{t.label}</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 italic text-white tracking-tight">{t.title}</h2>
          <div className="w-24 h-px bg-[#ff4d00] mx-auto opacity-40"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 font-bold uppercase text-[10px] tracking-[0.2em] backdrop-blur-md border leading-none
                ${activeCategory === cat.id
                  ? 'bg-[#ff4d00] text-white shadow-2xl shadow-[#ff4d00]/30 border-[#ff4d00]'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#ff4d00]" size={40} />
            <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">Chargement du menu...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto min-h-[400px]">
            {filteredItems.length > 0 ? filteredItems.map((item) => (
              <div key={item.id} className="group relative backdrop-blur-3xl bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5 hover:border-[#ff4d00]/30 transition-all duration-500 hover:-translate-y-2">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl font-serif font-bold group-hover:text-[#ff4d00] transition-colors duration-500 text-white tracking-tight">
                    {item.name[lang]}
                  </h3>
                  <span className="text-[#ff4d00] font-bold text-xl tracking-tighter">{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
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

        <div className="mt-24 flex justify-center">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/\+/g, '').replace(/ /g, '')}?text=Bonjour,%20je%20souhaite%20réserver%20une%20table.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-sm h-16 flex items-center justify-center bg-white text-black font-bold rounded-2xl hover:bg-[#ff4d00] hover:text-white transition-all duration-500 transform hover:scale-105 shadow-2xl uppercase tracking-[0.3em] text-[10px] leading-none"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
