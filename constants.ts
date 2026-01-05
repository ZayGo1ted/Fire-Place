
import { MenuItem, MenuCategory } from './types.ts';

export const TRANSLATIONS = {
  fr: {
    common: {
      reserve: "Réserver",
      whatsapp: "WhatsApp",
      chatNow: "Discuter",
      loading: "Chargement...",
      riverside: "Au bord du Sebou",
      slogan: "Là où le feu rencontre le fleuve"
    },
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
      pillar3Desc: "Un design épuré conçu pour la serrénité au bord du fleuve."
    },
    menu: {
      label: "Gastronomie",
      title: "L'Expérience Complète",
      searchPlaceholder: "Rechercher un plat, une boisson...",
      loadingMenu: "Préparation de la carte...",
      readyToTaste: "Prêt à déguster ?",
      noResults: "Aucun délice trouvé pour cette recherche.",
      cta: "Réservation WhatsApp",
      cats: {
        [MenuCategory.BREAKFAST]: "Petit-Déjeuner",
        [MenuCategory.HAPPY_KIDS]: "Menu Enfants",
        [MenuCategory.A_LA_CARTE]: "À La Carte",
        [MenuCategory.EXTRAS]: "Suppléments",
        [MenuCategory.BURGERS]: "Burgers",
        [MenuCategory.SANDWICHES]: "Sandwiches",
        [MenuCategory.SUPPLEMENTS]: "Suppléments",
        [MenuCategory.ENTREE_SNACKS]: "Snacks",
        [MenuCategory.ENTREE_PLATS]: "Entrées",
        [MenuCategory.TARTINES]: "Tartines",
        [MenuCategory.SALADE]: "Salades",
        [MenuCategory.PASTICCIO]: "Pasticcio",
        [MenuCategory.RISOTTO]: "Risotto",
        [MenuCategory.HOT_DRINKS]: "Boissons Chaudes",
        [MenuCategory.DRINKING_CHOCOLATE]: "Chocolats",
        [MenuCategory.SPECIAL_HOT_DRINK]: "Spécialités Chaudes",
        [MenuCategory.THE_INFUSION]: "Thés & Infusions",
        [MenuCategory.COLD_DRINKS]: "Boissons Froides",
        [MenuCategory.COCKTAILS]: "Cocktails",
        [MenuCategory.SMOOTHIES]: "Smoothies",
        [MenuCategory.JUS]: "Jus Frais",
        [MenuCategory.MILK_SHAKES]: "Milk Shakes",
        [MenuCategory.CREPES]: "Crêpes",
        [MenuCategory.GAUFRES]: "Gaufres",
        [MenuCategory.DESSERTS]: "Desserts",
        [MenuCategory.PATES]: "Pâtes",
        [MenuCategory.PANINIS]: "Paninis",
        [MenuCategory.TACOS]: "Tacos",
        [MenuCategory.PIZZA]: "Pizzas"
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
    common: {
      reserve: "Book Table",
      whatsapp: "WhatsApp",
      chatNow: "Chat Now",
      loading: "Loading...",
      riverside: "Kenitra Riverside",
      slogan: "Where the fire meets the river"
    },
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
      title: "The Full Experience",
      searchPlaceholder: "Search for a dish, a drink...",
      loadingMenu: "Crafting Menu Data...",
      readyToTaste: "Ready to taste?",
      noResults: "No delights found for this search.",
      cta: "WhatsApp Reservation",
      cats: {
        [MenuCategory.BREAKFAST]: "Breakfast",
        [MenuCategory.HAPPY_KIDS]: "Kids Menu",
        [MenuCategory.A_LA_CARTE]: "À La Carte",
        [MenuCategory.EXTRAS]: "Extras",
        [MenuCategory.BURGERS]: "Burgers",
        [MenuCategory.SANDWICHES]: "Sandwiches",
        [MenuCategory.SUPPLEMENTS]: "Supplements",
        [MenuCategory.ENTREE_SNACKS]: "Snacks",
        [MenuCategory.ENTREE_PLATS]: "Starter Plates",
        [MenuCategory.TARTINES]: "Tartines",
        [MenuCategory.SALADE]: "Salads",
        [MenuCategory.PASTICCIO]: "Pasticcio",
        [MenuCategory.RISOTTO]: "Risotto",
        [MenuCategory.HOT_DRINKS]: "Hot Drinks",
        [MenuCategory.DRINKING_CHOCOLATE]: "Chocolate Drinks",
        [MenuCategory.SPECIAL_HOT_DRINK]: "Special Hot Drinks",
        [MenuCategory.THE_INFUSION]: "Tea & Infusion",
        [MenuCategory.COLD_DRINKS]: "Cold Drinks",
        [MenuCategory.COCKTAILS]: "Cocktails",
        [MenuCategory.SMOOTHIES]: "Smoothies",
        [MenuCategory.JUS]: "Fresh Juice",
        [MenuCategory.MILK_SHAKES]: "Milk Shakes",
        [MenuCategory.CREPES]: "Crêpes",
        [MenuCategory.GAUFRES]: "Waffles",
        [MenuCategory.DESSERTS]: "Desserts",
        [MenuCategory.PATES]: "Pasta",
        [MenuCategory.PANINIS]: "Paninis",
        [MenuCategory.TACOS]: "Tacos",
        [MenuCategory.PIZZA]: "Pizzas"
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
  phone: '0537327944',
  whatsapp: '+212 626 643 666',
  hours: '07:30 - 23:30',
  openedDate: '2018',
  address: 'Corniche de Kenitra, Avenue Mohammed V, Kenitra',
  socials: {
    instagram: 'https://www.instagram.com/fireplace.kenitra/',
    facebook: 'https://www.facebook.com/fireplacekenitraa/'
  }
};

export const INITIAL_MENU: MenuItem[] = [
  {
    id: 'b1',
    name: { fr: 'Breakfast Fire Place', en: 'Fire Place Breakfast' },
    description: { fr: 'Pain bagel, omelette saucisse, salami de bœuf, fromage edam, cheddar', en: 'Bagel bread, sausage omelette, beef salami, edam, cheddar' },
    price: '55 DH',
    category: MenuCategory.BREAKFAST
  },
  {
    id: 'bu1',
    name: { fr: 'Burger Extasy', en: 'Extasy Burger' },
    description: { fr: 'Ciabatta, viande hachée (150g), champignon, oignon caramélisée, bacon emmental', en: 'Ciabatta, beef (150g), mushrooms, caramelized onions, bacon, emmental' },
    price: '90 DH',
    category: MenuCategory.BURGERS
  },
  {
    id: 'r1',
    name: { fr: 'Risotto Fruit de Mer', en: 'Seafood Risotto' },
    description: { fr: 'Riz, crevette, calamar, palourdes, parmesan', en: 'Rice, shrimp, squid, clams, parmesan' },
    price: '85 DH',
    category: MenuCategory.RISOTTO
  },
  {
    id: 'p1',
    name: { fr: 'Pizza Fire Place', en: 'Fire Place Special Pizza' },
    description: { fr: 'Sauce tomate mozzarella viande hachée poulet bacon champignon', en: 'Tomato sauce, mozzarella, ground beef, chicken, bacon, mushrooms' },
    price: '80 DH',
    category: MenuCategory.PIZZA
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
  },
  {
    id: 'r3',
    name: 'Omar Benjelloun',
    rating: 5,
    comment: 'Le cadre est magnifique, surtout en fin de journée. Très bonne pizza.',
    date: 'La semaine dernière'
  },
  {
    id: 'r4',
    name: 'Yasmine Drissi',
    rating: 4,
    comment: 'Un incontournable de la corniche. Les cocktails sont frais et originaux.',
    date: 'Il y a 2 semaines'
  }
];
