
import { MenuItem, MenuCategory } from './types.ts';

export const TRANSLATIONS = {
  fr: {
    hero: {
      tagline: "Un dîner au bord de l'eau où la chaleur marocaine rencontre l'élégance culinaire mondiale.",
      cta: "Explorer la Carte",
      location: "Kénitra • Corniche"
    },
    about: {
      label: "L'Essence Fire Place",
      title: "L'Alchimie du Feu et de",
      titleAccent: "l'Eau",
      desc: "Plus qu'un restaurant, Fire Place est une escale sensorielle sur la Corniche de Kénitra. Nous marions le crépitement ancestral du feu aux saveurs délicates du Sebou pour créer une expérience gastronomique où le temps s'arrête.",
      stat1: "Sourcing Local",
      stat2: "Vue Panoramique",
      pillar1: "Héritage",
      pillar1Desc: "Des recettes transmises, sublimées par des techniques modernes.",
      pillar2: "Fraîcheur",
      pillar2Desc: "Produits de la mer et du terroir sélectionnés chaque matin.",
      pillar3: "Ambiance",
      pillar3Desc: "Un design épuré conçu pour la sérénité au bord du fleuve."
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
      label: "Nous Trouver",
      title: "Sur les Rives du Sebou",
      desc: "Situé au cœur battant de la Corniche, notre établissement offre une vue imprenable sur le fleuve Sebou, à quelques minutes du centre-ville de Kénitra.",
      cta: "Lancer l'Itinéraire",
      nearby: "À proximité",
      landmark1: "Promenade de la Corniche",
      landmark2: "Port de Kénitra"
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
      label: "The Essence",
      title: "The Alchemy of Fire",
      titleAccent: "& Water",
      desc: "More than a restaurant, Fire Place is a sensory escape on Kenitra's Corniche. We blend the ancestral crackle of fire with the delicate flavors of the Sebou river to create a culinary journey where time stands still.",
      stat1: "Local Sourcing",
      stat2: "Panoramic Views",
      pillar1: "Heritage",
      pillar1Desc: "Timeless recipes elevated by contemporary techniques.",
      pillar2: "Freshness",
      pillar2Desc: "Daily selections from local markets and the Atlantic coast.",
      pillar3: "Ambiance",
      pillar3Desc: "Minimalist design crafted for riverside tranquility."
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
      title: "On the Sebou Banks",
      desc: "Located at the heart of the Corniche promenade, our establishment offers breathtaking views of the Sebou river, just minutes from Kenitra city center.",
      cta: "Get Directions",
      nearby: "Nearby Landmarks",
      landmark1: "Corniche Promenade",
      landmark2: "Kenitra River Port"
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
  openedDate: '2018',
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
