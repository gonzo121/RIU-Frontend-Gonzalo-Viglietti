import { Injectable } from '@angular/core';
import { signal, WritableSignal, Signal } from '@angular/core';
import { CreateHero, Hero } from '../models/hero.model';
import { INITIAL_HEROES } from '../data/hero.data';
import { normalizeText } from '../../../shared/utils/string.utils';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private _heroes: WritableSignal<Hero[]> = signal(INITIAL_HEROES);

  public heroes: Signal<Hero[]> = this._heroes.asReadonly();

  constructor() {}

  /**
   * Adds a new hero to the list of heroes.
   * @param hero The hero to be added without id.
   * @throws Error if a hero with the same name and real name already exists.
   */
  createHero(hero: CreateHero): Hero {
    const newHero: Hero = { ...hero, id: this.assignHeroId() };
    this.heroes().some((existingHero) => this.isSameHeroName(existingHero, newHero))
      ? (() => {
          throw new Error('Hero with this name and real name already exists');
        })()
      : this._heroes.update((heroes) => [...heroes, newHero]);
    return newHero;
  }

  /**
   * Get a hero by its ID.
   * @param heroId The id of the hero you want to retrieve.
   * @returns A Hero.
   */
  getHeroById(heroId: number): Hero {
    const hero = this._heroes().find((hero) => hero.id === heroId);
    if (!hero) throw new Error('Hero not found');
    return hero;
  }

  /**
   * Filter the heroes by a string that is compared with their names.
   * @param parcialName The string to compare with the heroes' names.
   * @returns An array of heroes that match the filter.
   */
  filterHeroesByName(parcialName: string): Hero[] | [] {
    return this._heroes().filter((hero) => normalizeText(hero.name).includes(normalizeText(parcialName)));
  }

  /**
   * Get the list of heroes.
   * @returns An array of heroes.
   */
  getHeroes(): Hero[] {
    return this._heroes();
  }

  /**
   * Assigns a new ID to a hero.
   * @returns The new hero ID.
   */
  private assignHeroId(): number {
    const heroes = this._heroes();
    const maxId = heroes.length > 0 ? Math.max(...heroes.map((hero) => hero.id)) : 0;
    return maxId + 1;
  }

  /**
   * Updates an existing hero in the list of heroes.
   * @param updatedHero The hero with updated information.
   * @throws Error if a hero with the same name and real name already exists (excluding the hero being updated).
   */
  updateHero(updatedHero: Hero): void {
    const existingHero = this._heroes().find((hero) => hero.id === updatedHero.id);

    if(!existingHero) throw new Error('Hero not found');
    
    const isDuplicated = this._heroes().some((currentHero) => this.isSameHeroName(currentHero, updatedHero) && currentHero.id !== updatedHero.id);
    if(isDuplicated) throw new Error('Hero with this name and real name already exists');

    this._heroes.update((heroes) =>
      heroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero))
    );
  }

  /**
   * Deletes a hero from the list of heroes by its ID.
   * @param heroId The ID of the hero to be deleted.
   * @throws Error if the hero with the specified ID does not exist.
   */
  deleteHero(heroId: number): void {
    const heroExists = this._heroes().some((hero) => hero.id === heroId);
    if (!heroExists) {
      throw new Error('Hero not found');
    }
    this._heroes.update((heroes) => heroes.filter((hero) => hero.id !== heroId));
  }

  /**
   * Checks if two heroes are the same based on their name and real name.
   * @param hero1 The first hero to compare.
   * @param hero2 The second hero to compare.
   * @returns A boolean indicating if the heroes are the same.
   */
  private isSameHeroName(hero1: Hero, hero2: Hero): boolean {
    return normalizeText(hero1.name) === normalizeText(hero2.name) && normalizeText(hero1.realName) === normalizeText(hero2.realName);
  }

}
