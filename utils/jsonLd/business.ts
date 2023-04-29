//Add THIS TO PRISMIC
/* 
const priceRange = '$$';
const businessName =
  'Estetica revolution (Edison RAMIREZ) - Coach sportif et nutrition';
const business: WithContext<ExerciseGym> = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: businessName,
  url: 'http://esteticarevolution.com/',
  '@id': 'http://esteticarevolution.com/',
  logo: 'https://images.prismic.io/estetica-revolution/ff01ab9c-e034-4528-869f-ee8696a919c7_erlogo.png',
  image:
    'https://lh3.googleusercontent.com/p/AF1QipOfNDWk2PKJIYPRLr5VRPF3exQ8-kIyu1y-4_cZ=s1360-w1360-h1020',
  description:
    'Estetica revolution (Edison RAMIREZ) un coach sportif et nutrition professionnel à Bienne ou Neuchâtel qui t’aide à atteindre tes objectifs fitness, Perte de poids et Remise en forme avec plaisir.',
  telephone: '+41 79 913 76 53',
  sameAs: [
    'https://www.instagram.com/esteticarevolution/',
    'https://www.facebook.com/esteticarevolutionofficial',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
  ],
  priceRange,
  makesOffer: [
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '89',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'PROGRAMME D’ENTRAÎNEMENT',
        description:
          '1 premier contact, 1 questionnaire, Planification du programme sur 12 semaines, 1 entretien à distance pour le feedback',
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '99',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'PROGRAMME NUTRITIONNEL',
        description:
          '1 premier contact, 1 questionnaire de santé, Planification du programme sur 12 semaines, 1 entretien à distance pour le feedback',
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '89',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'PROGRAMME DÉTOX',
        description:
          '1 consultation de 20 minutes, 1 questionnaire de santé, Programme de 3 à 7 jours, 1 entretien à distance pour le feedback',
      },
    },

    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '89',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'COACHING SPORTIF/ 1 SÉANCE',
        description:
          "Coaching individuel, Programme d'entrainement sur-mesure, Suivi au quotidien de l'évolution, 1 h / semaine.",
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '790',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'COACHING SPORTIF/ 10 SÉANCES',
        description:
          "Coaching individuel, Plan d’entraînement sur-mesure, Suivi au quotidien de l'évolution, 10 séances de 1 h de Personal Training",
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '399',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'PROGRAMMES ET SUIVI/ 3 MOIS',
        description:
          '1 consultation de 20 minutes, 1 questionnaire de santé, Checkin shape, photos, poids et état émotionnel, 1 programme d’entraînement, 1 programme alimentaire et un coaching mental, 1 entretien de suivi par mois, Contrôle toutes les 2 semaines, Checkout/suivi ou clôture du programme',
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '699',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'PROGRAMMES ET SUIVI/ 6 MOIS',
        description:
          '1 consultation de 20 minutes, 1 questionnaire de santé, Checkin shape, photos, poids et état émotionnel, 1 programme d’entraînement, 1 programme alimentaire et un coaching mental, 1 entretien de suivi par mois, Contrôle toutes les 2 semaines, Checkout/suivi ou clôture du programme',
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '1299',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'PROGRAMMES ET SUIVI/ 12 MOIS',
        description:
          '1 consultation de 20 minutes, 1 questionnaire de santé, Checkin shape, photos, poids et état émotionnel, 1 programme d’entraînement, 1 programme alimentaire et un coaching mental, 1 entretien de suivi par mois, 1 coaching de 60 minutes tous les 3 mois, Checkout/suivi ou clôture du programme',
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '2000',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'PRÉPARATION AUX COMPÉTITIONS',
        description:
          'Les préparations Men’s Physiques, Classic Physique, Miss Bikini et Miss Wellness se font uniquement sur un suivi d’un an. Le programe: Une planification des entraînements, Une programmation alimentaire, Une complémentation personnalisée, Une disponibilité et un accompagnement par message ou e-mail, Une vidéo conférence toutes les 2 semaines',
      },
    },
    {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'CHF',
        price: '300',
      },
      itemOffered: {
        '@type': 'AggregateOffer',
        name: 'ACCOMPAGNEMENT AUX COMPÉTITION',
        description:
          'Accompagnement pour une journée de compétition en suisse, Conseils, Motivation, Tanning',
      },
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Edouard-Dubois 20',
    addressLocality: 'Neuchâtel',
    addressRegion: 'canton de Neuchâtel',
    postalCode: '2000',
    addressCountry: 'Switzerland',
  },
  location: {
    '@type': 'Place',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '46.988767',
      longitude: '6.9064899',
    },
  },
  areaServed: [
    {
      '@type': 'City',
      name: ['Neuchâtel', 'Bienne'],
    },
    {
      '@type': 'Country',
      name: ['Switzerland'],
    },
    {
      '@type': 'Continent',
      name: ['Europe'],
    },
  ],
  department: [
    {
      '@type': 'ExerciseGym',
      name: 'Estetica revolution (Edison RAMIREZ) - Coach sportif et nutrition à Neuchâtel',
      description:
        'Estetica revolution (Edison RAMIREZ) un coach sportif et nutrition professionnel à Neuchâtel qui t’aide à atteindre tes objectifs fitness, Perte de poids et Remise en forme avec plaisir.',
      url: 'https://esteticarevolution.com/la-salle-de-sport-nessfit-neuchatel',
      '@id':
        'https://esteticarevolution.com/la-salle-de-sport-nessfit-neuchatel',
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOfNDWk2PKJIYPRLr5VRPF3exQ8-kIyu1y-4_cZ=s1360-w1360-h1020',
      telephone,
      priceRange,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Edouard-Dubois 20',
        addressLocality: 'Neuchâtel',
        addressRegion: 'canton de Neuchâtel',
        postalCode: '2000',
        addressCountry: 'Switzerland',
      },
      location: {
        '@type': 'Place',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '46.988767',
          longitude: '6.9064899',
        },
      },
      areaServed: [
        {
          '@type': 'City',
          name: ['Neuchâtel'],
        },
        {
          '@type': 'Country',
          name: ['Switzerland'],
        },
        {
          '@type': 'Continent',
          name: ['Europe'],
        },
      ],
    },
    {
      '@type': 'ExerciseGym',
      name: 'Estetica revolution (Edison RAMIREZ) - Coach sportif et nutrition à Bienne',
      description:
        'Estetica revolution (Edison RAMIREZ) un coach sportif et nutrition professionnel à Bienne ou Neuchâtel qui t’aide à atteindre tes objectifs fitness, Perte de poids et Remise en forme avec plaisir.',
      url: 'https://esteticarevolution.com/la-salle-de-sport-central-gym-brugg-a-bienne',
      '@id':
        'https://esteticarevolution.com/la-salle-de-sport-central-gym-brugg-a-bienne',
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOl5LQ6zc-yTIgN7AT63i12h-iEQGjB5SCLwj5O=s3024-w3024-h1558-rw',
      telephone,
      priceRange,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Industriestrasse 25,Brügg',
        addressLocality: 'Bienne',
        addressRegion: 'canton de berne',
        postalCode: '2555',
        addressCountry: 'Switzerland',
      },
      location: {
        '@type': 'Place',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '47.1218577',
          longitude: '7.1988593',
        },
      },
      areaServed: [
        {
          '@type': 'City',
          name: ['Brügg', 'Bienne'],
        },
        {
          '@type': 'Country',
          name: ['Switzerland'],
        },
        {
          '@type': 'Continent',
          name: ['Europe'],
        },
      ],
    },
  ],
};

const neuchatel: WithContext<ExerciseGym> = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: `${businessName} à Neuchâtel`,
  description:
    'Estetica revolution (Edison RAMIREZ) un coach sportif et nutrition professionnel à Neuchâtel qui t’aide à atteindre tes objectifs fitness, Perte de poids et Remise en forme avec plaisir.',
  url: 'https://esteticarevolution.com/la-salle-de-sport-nessfit-neuchatel',
  '@id': 'https://esteticarevolution.com/la-salle-de-sport-nessfit-neuchatel',
  image:
    'https://lh3.googleusercontent.com/p/AF1QipOfNDWk2PKJIYPRLr5VRPF3exQ8-kIyu1y-4_cZ=s1360-w1360-h1020',
  telephone,
  priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Edouard-Dubois 20',
    addressLocality: 'Neuchâtel',
    addressRegion: 'canton de Neuchâtel',
    postalCode: '2000',
    addressCountry: 'Switzerland',
  },
  sameAs: business.sameAs,
  openingHoursSpecification: business.openingHoursSpecification,

  location: {
    '@type': 'Place',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '46.988767',
      longitude: '6.9064899',
    },
  },
  areaServed: [
    {
      '@type': 'City',
      name: ['Neuchâtel'],
    },
    {
      '@type': 'Country',
      name: ['Switzerland'],
    },
    {
      '@type': 'Continent',
      name: ['Europe'],
    },
  ],
};

const bienne: WithContext<ExerciseGym> = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: `${businessName} à Bienne`,
  description:
    'Estetica revolution (Edison RAMIREZ) un coach sportif et nutrition professionnel à Bienne ou Neuchâtel qui t’aide à atteindre tes objectifs fitness, Perte de poids et Remise en forme avec plaisir.',
  url: 'https://esteticarevolution.com/la-salle-de-sport-central-gym-brugg-a-bienne',
  '@id':
    'https://esteticarevolution.com/la-salle-de-sport-central-gym-brugg-a-bienne',
  image:
    'https://lh3.googleusercontent.com/p/AF1QipOl5LQ6zc-yTIgN7AT63i12h-iEQGjB5SCLwj5O=s3024-w3024-h1558-rw',
  telephone,
  priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Industriestrasse 25,Brügg',
    addressLocality: 'Bienne',
    addressRegion: 'canton de berne',
    postalCode: '2555',
    addressCountry: 'Switzerland',
  },
  sameAs: business.sameAs,
  openingHoursSpecification: business.openingHoursSpecification,
  location: {
    '@type': 'Place',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '47.1218577',
      longitude: '7.1988593',
    },
  },
  areaServed: [
    {
      '@type': 'City',
      name: ['Bienne'],
    },
    {
      '@type': 'Country',
      name: ['Switzerland'],
    },
    {
      '@type': 'Continent',
      name: ['Europe'],
    },
  ],
};

export const localeBusinessJsonLd = () => {
  return {
    __html: `${JSON.stringify(business)}
    `,
  };
};

export const neuchatelBusinessJsonLd = () => {
  return {
    __html: `${JSON.stringify(neuchatel)}
    `,
  };
};
export const bienneBusinessJsonLd = () => {
  return {
    __html: `${JSON.stringify(bienne)}
    `,
  };
};
 */
export const smt = {};
