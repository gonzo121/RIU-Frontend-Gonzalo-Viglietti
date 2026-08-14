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

}

export interface SuperHeroPowers{
    id: number;
    name: string;
}


export type CreateHero = Omit<Hero, 'id'>;