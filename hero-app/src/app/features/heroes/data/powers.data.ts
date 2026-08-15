import { SuperHeroPowers } from '../models/hero.model';

export const SUPER_POWERS = {
    SUPER_STRENGTH: {
        id: 1,
        name: 'Super fuerza',
        icon: 'assets/super-power-icon/super-strength.png'

    },
    FLIGHT: {
        id: 2,
        name: 'Volar',
        icon: 'assets/super-power-icon/fly.png'
    },
    GENIUS_INTELLECT: {
        id: 3,
        name: 'Intelecto nivel genio',
        icon: 'assets/super-power-icon/genio.png'
    },
    EXPERT_MARTIAL_ARTIST: {
        id: 4,
        name: 'Experto en artes marciales',
        icon: 'assets/super-power-icon/martial-arts.png'
    },
    SUPER_AGILITY: {
        id: 5,
        name: 'Super agilidad',
        icon: 'assets/super-power-icon/super-agility.png'
    },
    WALL_CRAWLING: {
        id: 6,
        name: 'Trepar por las paredes',
        icon: 'assets/super-power-icon/spider-crawl.png'
    },
    SPIDER_SENSE: {
        id: 7,
        name: 'Sentido arácnido',
        icon: 'assets/super-power-icon/spider-sense.png'
    },
    POWERED_ARMOR: {
        id: 8,
        name: 'Super traje',
        icon: 'assets/super-power-icon/super-suit.png'
    },
    ENHANCED_STRENGTH: {
        id: 9,
        name: 'Fuerza mejorada',
        icon: 'assets/super-power-icon/strength.png'
    },
    ENHANCED_AGILITY: {
        id: 10,
        name: 'Agilidad mejorada',
        icon: 'assets/super-power-icon/speed.png'
    },
    CONTROL_WEATHER: {
        id: 11,
        name: 'Controla el clima',
        icon: 'assets/super-power-icon/weather.png'
    },
    CONTROL_LIGHTNING: {
        id: 12,
        name: 'Controla los rayos',
        icon: 'assets/super-power-icon/lightning.png'
    },
    VIBRANIUM_SUIT: {
        id: 12,
        name: 'Traje de vibranio',
        icon: 'assets/super-power-icon/vibranium.png'
    },
    SUPERHUMAN_DURABILITY: {
        id: 13,
        name: 'Durabilidad sobrehumana',
        icon: 'assets/super-power-icon/durabilidad.png'
    },
    SUPER_SPEED: {
        id: 14,
        name: 'Super velocidad',
        icon: 'assets/super-power-icon/speed.webp'
    },
    TIME_MANIPULATION: {
        id: 15,
        name: 'Manipulación del tiempo',
        icon: 'assets/super-power-icon/time-manipulation.png'

    },
    POWER_RING: {
        id: 16,
        name: 'Anillo de poder capaz de crear cosas',
        icon: 'assets/super-power-icon/anillo.webp'
    },
    COMMUNICATE_WITH_MARINE_LIFE: {
        id: 17,
        name: 'Capacidad para comunicarse con la vida marina',
        icon: 'assets/super-power-icon/vida-marina.png'
    },
    MAGIC: {
        id: 18,
        name: 'Magia',
        icon: 'assets/super-power-icon/magic.png'
    },
    TIME_AND_SPACE_MANIPULATION: {
        id: 19,
        name: 'Manipulación del tiempo y del espacio',
        icon: 'assets/super-power-icon/time-manipulation.png'
    },
    MARKSMAN: {
        id: 20,
        name: 'Francotirador',
        icon: 'assets/super-power-icon/marksman.png'
    },
    REGENERATIVE_HEALING_FACTOR: {
        id: 21,
        name: 'Factor de curación regenerativa',
        icon: 'assets/super-power-icon/healing.png'
    },
    ENHANCED_SENSES: {
        id: 22,
        name: 'Sentidos mejorados',
        icon: 'assets/super-power-icon/senses.png'
    }

} as const satisfies Record<string, SuperHeroPowers>;
