import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero';
import { CreateHero, Hero } from '../models/hero.model';
import { SUPER_POWERS } from '../data/powers.data';

describe('HeroService', () => {
  let service: HeroService;

  const createHero = (
    overrides: Partial<CreateHero> = {},
  ): CreateHero => ({
    name: 'Spider-Man',
    realName: 'Miles Morales',
    franchise: 'Marvel Comics',
    description: 'The new Spider-Man',
    superPowers: [SUPER_POWERS.WALL_CRAWLING, SUPER_POWERS.SPIDER_SENSE, SUPER_POWERS.CONTROL_LIGHTNING],
    age: 15,
    wearCape: false,
    fromEarth: true,
    ...overrides,
  });


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a hero by ID', () => {
    const existingHero = service.heroes()[0];
    const hero = service.getHeroById(existingHero.id);
    expect(hero).toEqual(existingHero);
  });

  it('should throw when hero ID does not exist', () => {
    expect(() => service.getHeroById(-1)).toThrow('Hero not found');
  });

  it('should filter heroes comparing a string with their names', () => {
    
    const filteredHeroes = service.filterHeroesByName('man');
    
    expect(
      filteredHeroes.every((hero) =>
        hero.name.toLowerCase().includes('man'),
      ),
    ).toBe(true);
  });

  it('should filter heroes case-insensitively', () => {
    const lowerCaseResult = service.filterHeroesByName('man');
    const upperCaseResult = service.filterHeroesByName('MAN');

    expect(upperCaseResult).toEqual(lowerCaseResult);
  });

  it('should return an empty array if no heroes match the filter', () => {
    const filteredHeroes = service.filterHeroesByName('43023401234');
    expect(filteredHeroes).toEqual([]);
  });

  it('should create a new hero', () => {
    const initialLength = service.heroes().length;

    const newHero = createHero();

    const createdHero = service.createHero(newHero);

    expect(service.heroes()).toHaveLength(initialLength + 1);
    expect(service.heroes()).toContainEqual(createdHero);
  });

  it('should assign an id when adding a new hero', () => {
    const newHero: CreateHero = createHero();

    const createdHero = service.createHero(newHero);

    expect(createdHero.id).toBeGreaterThan(0);
  });

  it('should not add a hero with same name and realName', () => {
    const existingHero = service.heroes()[0];

    const newHero: CreateHero = createHero({  
      name: existingHero.name,
      realName: existingHero.realName,
    });

    expect(() => service.createHero(newHero)).toThrow('Hero with this name and real name already exists');
  });

  it('should update an existing hero', () => {
    const existingHero = service.heroes()[0];
    const updatedHero: Hero = { ...existingHero, age: existingHero.age + 1 };
    service.updateHero(updatedHero);
    const heroes = service.heroes();

    expect(heroes).toContainEqual(updatedHero);
  });

  it('should not update a hero if realName and name are the same as another hero', () => {
    const existingHero = service.heroes()[0];
    const anotherHero = service.heroes()[1];
    const updatedHero: Hero = { ...existingHero, name: anotherHero.name, realName: anotherHero.realName };

    expect(() => service.updateHero(updatedHero)).toThrow('Hero with this name and real name already exists');
  });

  it('should throw when updating a non-existing hero', () => {
    const existingHero = service.heroes()[0];

    const nonExistingHero: Hero = {
      ...existingHero,
      id: -1
    };

    expect(() => service.updateHero(nonExistingHero)).toThrow(
      'Hero not found',
    );
  });

  it('should delete an existing hero', () => {
    const initialLength = service.heroes().length;

    const existingHero = service.heroes()[0];
    service.deleteHero(existingHero.id);
    const heroes = service.heroes();

    expect(heroes).toHaveLength(initialLength - 1);
    expect(heroes).not.toContainEqual(existingHero);
  });

  it('should give an error if trying to delete a non-existing id hero', () => {
    expect(() => service.deleteHero(-1)).toThrow('Hero not found');
  });
});
