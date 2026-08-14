export interface Hero {
    id: number;
    name: string;
    realName: string;
    franchise: string;
    description: string;
    superPower: string;
    age: number;
    wearCape: boolean;
    fromEarth: boolean;

}


export type CreateHero = Omit<Hero, 'id'>;