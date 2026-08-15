export interface Hero {
    id: number;
    name: string;
    realName: string;
    franchise: string;
    description: string;
    superPowers: SuperHeroPowers[];
    age: number;
    wearCape: boolean;
    fromEarth: boolean;
    icon?: string;
}

export interface SuperHeroPowers{
    id: number;
    name: string;
    icon?: string;
}


export type CreateHero = Omit<Hero, 'id'>;