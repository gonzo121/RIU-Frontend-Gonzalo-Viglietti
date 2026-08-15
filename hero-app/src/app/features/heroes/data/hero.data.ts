import { Hero } from '../models/hero.model';
import { SUPER_POWERS } from './powers.data';

export const INITIAL_HEROES: Hero[] = [
    {
        id: 1,
        name: 'Superman',
        realName: 'Clark Kent',
        franchise: 'DC Comics',
        description: 'The Man of Steel',
        superPowers: [SUPER_POWERS.FLIGHT, SUPER_POWERS.SUPER_STRENGTH, SUPER_POWERS.SUPER_SPEED],
        age: 35,
        wearCape: true,
        fromEarth: false,
        icon: 'assets/hero-icon/superman.png'
    },
    {
        id: 2,
        name: 'Batman',
        realName: 'Bruce Wayne',
        franchise: 'DC Comics',
        description: 'The Dark Knight',
        superPowers: [SUPER_POWERS.GENIUS_INTELLECT, SUPER_POWERS.EXPERT_MARTIAL_ARTIST],
        age: 40,
        wearCape: true,
        fromEarth: true,
        icon: 'assets/hero-icon/batman-old.png'
    }
    ,
    {
        id: 3,
        name: 'Wonder Woman',
        realName: 'Diana Prince',
        franchise: 'DC Comics',
        description: 'Amazonian warrior princess',
        superPowers: [SUPER_POWERS.SUPER_STRENGTH, SUPER_POWERS.SUPER_AGILITY],
        age: 3000,
        wearCape: false,
        fromEarth: false,
        icon: 'assets/hero-icon/wonderwoman.webp'
    },
    {
        id: 4,
        name: 'Spider-Man',
        realName: 'Peter Parker',
        franchise: 'Marvel Comics',
        description: 'Friendly neighborhood superhero',
        superPowers: [SUPER_POWERS.WALL_CRAWLING, SUPER_POWERS.SPIDER_SENSE],
        age: 18,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/spiderman.webp'
    },
    {
        id: 5,
        name: 'Iron Man',
        realName: 'Tony Stark',
        franchise: 'Marvel Comics',
        description: 'Genius billionaire playboy philanthropist',
        superPowers: [SUPER_POWERS.POWERED_ARMOR],
        age: 45,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/ironman.webp'
    },
    {
        id: 6,
        name: 'Captain America',
        realName: 'Steve Rogers',
        franchise: 'Marvel Comics',
        description: 'Super soldier and symbol of freedom',
        superPowers: [SUPER_POWERS.ENHANCED_STRENGTH, SUPER_POWERS.ENHANCED_AGILITY],
        age: 100,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/captainamerica.webp'
    },
    {
        id: 7,
        name: 'Thor',
        realName: 'Thor Odinson',
        franchise: 'Marvel Comics',
        description: 'God of Thunder',
        superPowers: [SUPER_POWERS.CONTROL_LIGHTNING, SUPER_POWERS.CONTROL_WEATHER],
        age: 1500,
        wearCape: true,
        fromEarth: false,
        icon: 'assets/hero-icon/thor.png'
    },
    {
        id: 8,
        name: 'Black Panther',
        realName: 'T\'Challa',
        franchise: 'Marvel Comics',
        description: 'King of Wakanda and superhero',
        superPowers: [SUPER_POWERS.ENHANCED_STRENGTH, SUPER_POWERS.ENHANCED_AGILITY, SUPER_POWERS.VIBRANIUM_SUIT],
        age: 30,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/black-panther.png'
    },
    {
        id: 9,
        name: 'Hulk',
        realName: 'Bruce Banner',
        franchise: 'Marvel Comics',
        description: 'Green-skinned behemoth with incredible strength',
        superPowers: [SUPER_POWERS.SUPER_STRENGTH, SUPER_POWERS.SUPERHUMAN_DURABILITY],
        age: 40,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/hulk.webp'
    },
    {
        id: 10,
        name: 'Flash',
        realName: 'Barry Allen',
        franchise: 'DC Comics',
        description: 'Fastest man alive',
        superPowers: [SUPER_POWERS.SUPER_SPEED, SUPER_POWERS.TIME_MANIPULATION],
        age: 28,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/flash.webp'
    },
    {
        id: 11,
        name: 'Green Lantern',
        realName: 'Hal Jordan',
        franchise: 'DC Comics',
        description: 'Intergalactic peacekeeper with a power ring',
        superPowers: [SUPER_POWERS.POWER_RING],
        age: 32,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/green-lantern.webp'
    },
    {
        id: 12,
        name: 'Aquaman',
        realName: 'Arthur Curry',
        franchise: 'DC Comics',
        description: 'King of Atlantis and protector of the seas',
        superPowers: [SUPER_POWERS.COMMUNICATE_WITH_MARINE_LIFE, SUPER_POWERS.SUPER_STRENGTH],
        age: 35,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/aquaman.png'
    },
    {
        id: 13,
        name: 'Doctor Strange',
        realName: 'Stephen Strange',
        franchise: 'Marvel Comics',
        description: 'Master of the mystic arts and Sorcerer Supreme',
        superPowers: [SUPER_POWERS.MAGIC, SUPER_POWERS.TIME_AND_SPACE_MANIPULATION],
        age: 45,
        wearCape: true,
        fromEarth: true,
        icon: 'assets/hero-icon/doctorstrange.png'
    },
    {
        id: 14,
        name: 'Black Widow',
        realName: 'Natasha Romanoff',
        franchise: 'Marvel Comics',
        description: 'Highly skilled spy and assassin',
        superPowers: [SUPER_POWERS.EXPERT_MARTIAL_ARTIST, SUPER_POWERS.MARKSMAN],
        age: 35,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/blackwidow.png'
    },
    {
        id: 15,
        name: 'Wolverine',
        realName: 'Logan',
        franchise: 'Marvel Comics',
        description: 'Mutant with regenerative healing factor and adamantium claws',
        superPowers: [SUPER_POWERS.REGENERATIVE_HEALING_FACTOR, SUPER_POWERS.ENHANCED_SENSES, SUPER_POWERS.ENHANCED_AGILITY],
        age: 150,
        wearCape: false,
        fromEarth: true,
        icon: 'assets/hero-icon/wolverine.png'
    }
];