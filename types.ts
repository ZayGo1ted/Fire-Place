
export type Language = 'fr' | 'en';

export interface MenuItem {
  id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  price: string;
  category: string;
  isSpecial?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

// Added GalleryImage interface to resolve the import error in Gallery.tsx
export interface GalleryImage {
  url: string;
  alt: string;
  source: string;
}

export enum MenuCategory {
  BREAKFAST = 'Breakfast',
  HAPPY_KIDS = 'Happy Kids',
  A_LA_CARTE = 'À La Carte',
  EXTRAS = 'Extras',
  BURGERS = 'Burgers',
  SANDWICHES = 'Sandwiches',
  SUPPLEMENTS = 'Supplements',
  ENTREE_SNACKS = 'Entrée (Snacks)',
  ENTREE_PLATS = 'Entrée (Plats)',
  TARTINES = 'Tartines',
  SALADE = 'Salade',
  PASTICCIO = 'Pasticcio',
  RISOTTO = 'Risotto',
  HOT_DRINKS = 'Hot Drinks',
  DRINKING_CHOCOLATE = 'Drinking Chocolate',
  SPECIAL_HOT_DRINK = 'Special Hot Drink',
  THE_INFUSION = 'Thé & Infusion',
  COLD_DRINKS = 'Cold Drinks',
  COCKTAILS = 'Cocktails',
  SMOOTHIES = 'Smoothies',
  JUS = 'Jus',
  MILK_SHAKES = 'Milk Shakes',
  CREPES = 'Crêpes',
  GAUFRES = 'Gaufres',
  DESSERTS = 'Desserts',
  PATES = 'Pâtes',
  PANINIS = 'Paninis',
  TACOS = 'Tacos',
  PIZZA = 'Pizza'
}
