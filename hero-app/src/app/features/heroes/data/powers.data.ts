import { SuperHeroPowers } from '../models/hero.model';

export const SUPER_POWERS = {
    SUPER_STRENGTH: {
        id: 1,
        name: 'Super strength'
    },
    FLIGHT: {
        id: 2,
        name: 'Flight'
    },
    GENIUS_INTELLECT: {
        id: 3,
        name: 'Genius intellect'
    },
    EXPERT_MARTIAL_ARTIST: {
        id: 4,
        name: 'Expert martial artist'
    },
    SUPER_AGILITY: {
        id: 5,
        name: 'Super agility'
    },
    WALL_CRAWLING: {
        id: 6,
        name: 'Wall-crawling'
    },
    SPIDER_SENSE: {
        id: 7,
        name: 'Spider-sense'
    },
    POWERED_ARMOR: {
        id: 8,
        name: 'Powered armor suit'
    },
    ENHANCED_STRENGTH: {
        id: 9,
        name: 'Enhanced strength'
    },
    ENHANCED_AGILITY: {
        id: 10,
        name: 'Enhanced agility'
    },
    CONTROL_WEATHER: {
        id: 11,
        name: 'Control weather'
    },
    CONTROL_LIGHTNING: {
        id: 12,
        name: 'Control over lightning'
    },
    VIBRANIUM_SUIT: {
        id: 12,
        name: 'Vibranium suit'
    },
    SUPERHUMAN_DURABILITY: {
        id: 13,
        name: 'Superhuman durability'
    },
    SUPER_SPEED: {
        id: 14,
        name: 'Super speed'
    },
    TIME_MANIPULATION: {
        id: 15,
        name: 'Time manipulation'
    },
    POWER_RING: {
        id: 16,
        name: 'Power ring that can create constructs'
    },
    COMMUNICATE_WITH_MARINE_LIFE: {
        id: 17,
        name: 'Ability to communicate with marine life'
    },
    MAGIC: {
        id: 18,
        name: 'Magic'
    },
    TIME_AND_SPACE_MANIPULATION: {
        id: 19,
        name: 'Manipulation of time and space'
    },
    MARKSMAN: {
        id: 20,
        name: 'Marksman'
    },
    REGENERATIVE_HEALING_FACTOR: {
        id: 21,
        name: 'Regenerative healing factor'
    },
    ENHANCED_SENSES: {
        id: 22,
        name: 'Enhanced senses'
    }

} as const satisfies Record<string, SuperHeroPowers>;
