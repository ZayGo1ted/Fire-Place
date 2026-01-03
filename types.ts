
export type Language = 'fr' | 'en';

export interface MenuItem {
  id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  price: string;
  category: string;
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

export enum MenuCategory {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  DESSERTS = 'Desserts',
  DRINKS = 'Drinks',
}
