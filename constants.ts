
import { MenuItem, MenuCategory } from './types.ts';

export const TRANSLATIONS = {
  fr: {
    hero: {
      tagline: "Un dîner au bord de l'eau où la chaleur marocaine rencontre l'élégance culinaire mondiale.",
      cta: "Explorer la Carte",
      location: "Kénitra • Corniche"
    },
    about: {
      label: "Le Concept",
      title: "Le Luxe Défini par le",
      titleAccent: "Fleuve Sebou",
      desc: "Situé sur la corniche vibrante de Kénitra, Fire Place mêle l'hospitalité marocaine authentique à la maîtrise culinaire internationale. Un sanctuaire de goût et de tranquillité.",
      stat1: "Sourcing Artisanal",
      stat2: "Vue Panoramique"
    },
    menu: {
      label: "Gastronomie",
      title: "Notre Carte Signature",
      cta: "Réservation WhatsApp",
      cats: {
        [MenuCategory.BREAKFAST]: "Petit-Déjeuner",
        [MenuCategory.LUNCH]: "Déjeuner",
        [MenuCategory.DINNER]: "Dîner",
        [MenuCategory.DESSERTS]: "Desserts",
        [MenuCategory.DRINKS]: "Boissons"
      }
    },
    contact: {
      label: "Réservation",
      title: "Réservez Votre Table",
      desc: "Vivez la chaleur de Fire Place. Pour les groupes ou événements spéciaux, contactez-nous directement.",
      phone: "Téléphone",
      open: "Ouvert tous les jours"
    },
    location: {
      label: "Nous Visiter",
      title: "Oasis au Bord de l'Eau",
      desc: "Découvrez la corniche de Kénitra. Nous sommes situés directement sur le front de mer.",
      cta: "Itinéraire"
    },
    reviews: {
      label: "Expérience Client",
      title: "Ce Que l'on Dit de Nous",
      sources: "Avis Vérifiés"
    },
    footer: {
      desc: "L'excellence culinaire au cœur de la Corniche de Kénitra. Café premium et menu international aux saveurs locales.",
      explore: "Explorer",
      contact: "Contact",
      home: "Accueil",
      about: "À Propos",
      menu: "La Carte",
      testimonials: "Témoignages"
    }
  },
  en: {
    hero: {
      tagline: "Riverside dining where Moroccan warmth meets world-class culinary elegance.",
      cta: "Explore Menu",
      location: "Kenitra • Corniche"
    },
    about: {
      label: "The Concept",
      title: "Luxury Defined by the",
      titleAccent: "Sebou River",
      desc: "Located on Kenitra's vibrant Corniche, Fire Place blends authentic Moroccan hospitality with global culinary mastery. A sanctuary of taste and tranquility.",
      stat1: "Artisanal Sourcing",
      stat2: "Waterfront Views"
    },
    menu: {
      label: "Gastronomy",
      title: "The Signature Menu",
      cta: "WhatsApp Reservation",
      cats: {
        [MenuCategory.BREAKFAST]: "Breakfast",
        [MenuCategory.LUNCH]: "Lunch",
        [MenuCategory.DINNER]: "Dinner",
        [MenuCategory.DESSERTS]: "Desserts",
        [MenuCategory.DRINKS]: "Drinks"
      }
    },
    contact: {
      label: "Reservation",
      title: "Secure Your Table",
      desc: "Experience the warmth of Fire Place. For large groups or special events, contact us directly.",
      phone: "Telephone",
      open: "Open Daily"
    },
    location: {
      label: "Visit Us",
      title: "Riverside Oasis",
      desc: "Experience the scenic Corniche of Kenitra. We are located directly on the waterfront.",
      cta: "Get Directions"
    },
    reviews: {
      label: "Guest Experience",
      title: "What People Say",
      sources: "Verified Insights"
    },
    footer: {
      desc: "Excellence in dining at the heart of Kenitra's Corniche. Premium coffee and curated international menu.",
      explore: "Explore",
      contact: "Contact Info",
      home: "Home",
      about: "About Us",
      menu: "The Menu",
      testimonials: "Testimonials"
    }
  }
};

export const RESTAURANT_INFO = {
  name: 'Fire Place',
  phone: '+212 537 364 455',
  whatsapp: '+212 661 000 000',
  hours: '07:30 - 23:30',
  address: 'Corniche de Kenitra, Avenue Mohammed V, Kenitra',
  socials: {
    instagram: 'https://www.instagram.com/fireplace_kenitra/',
    facebook: 'https://www.facebook.com/fireplacekenitra/'
  }
};

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: { fr: 'Ftour Beldi Spécial', en: 'Traditional Moroccan Breakfast' },
    description: { fr: 'Petit-déjeuner traditionnel avec œufs, miel, fromage et thé à la menthe frais.', en: 'Traditional Moroccan breakfast with eggs, honey, cheese, and fresh mint tea.' },
    price: '55 DH',
    category: MenuCategory.BREAKFAST
  },
  {
    id: '2',
    name: { fr: 'Linguine aux Fruits de Mer', en: 'Seafood Linguine' },
    description: { fr: 'Fruits de mer frais de la côte atlantique avec ail et tomates cerises.', en: 'Fresh local seafood from the Atlantic coast with garlic and cherry tomatoes.' },
    price: '95 DH',
    category: MenuCategory.LUNCH
  },
  {
    id: '3',
    name: { fr: 'Burger Signature Fire Place', en: 'Fire Place Signature Burger' },
    description: { fr: 'Bœuf premium, oignons caramélisés, fromage fumé et sauce secrète.', en: 'Premium beef, caramelized onions, smoked cheese, and our secret house sauce.' },
    price: '75 DH',
    category: MenuCategory.LUNCH
  },
  {
    id: '4',
    name: { fr: 'Filet de Bœuf aux Champignons', en: 'Beef Fillet with Mushrooms' },
    description: { fr: 'Filet de bœuf tendre servi avec une sauce crémeuse aux champignons des bois.', en: 'Tender beef fillet served with creamy forest mushroom sauce and mash.' },
    price: '145 DH',
    category: MenuCategory.DINNER
  }
];

export const REVIEWS = [
  {
    id: 'r1',
    name: 'Amine El Hassani',
    rating: 5,
    comment: 'Meilleur endroit à Kénitra pour un café au coucher du soleil.',
    date: 'Hier'
  },
  {
    id: 'r2',
    name: 'Sofia Mansouri',
    rating: 5,
    comment: 'Petit-déjeuner incroyable. L\'atmosphère est calme et le service pro.',
    date: 'Il y a 4 jours'
  }
];
