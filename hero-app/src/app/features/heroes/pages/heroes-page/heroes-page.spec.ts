import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeroesPage } from './heroes-page';
import { provideRouter, Router } from '@angular/router';
import { HeroTable } from '../../components/hero-table/hero-table';
import { CreateHero, Hero } from '../../models/hero.model';
import { SUPER_POWERS } from '../../data/powers.data';

describe('HeroesPage', () => {
  let component: HeroesPage;
  let fixture: ComponentFixture<HeroesPage>;

  const createHero = (
      overrides: Partial<Hero> = {},
    ): Hero => ({
      id: 1,
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesPage],
      providers: [
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  const getHeroTable = (): HeroTable => {
    const tableDebugElement = fixture.debugElement.query(
      By.directive(HeroTable),
    );
  
    return tableDebugElement.componentInstance as HeroTable;
  }

  const getSearchInput = (): HTMLInputElement => {
    return fixture.nativeElement.querySelector('input');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display heroes initially', () => {

    const table: HeroTable = getHeroTable();

    expect(table.heroes().length).toBeGreaterThan(0);
  });

  it('should filter heroes when search term changes', () => {
    const searchTerm = 'man';
    const input: HTMLInputElement = getSearchInput();
    input.value = searchTerm;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();


    const table: HeroTable = getHeroTable();

    expect(
      table.heroes().every((hero) =>
        hero.name.toLowerCase().includes(searchTerm),
      ),
    ).toBe(true);
  });

  it('should navigate to edit page when onEdit is called', () => {
    const hero = createHero();
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.onEdit(hero);

    expect(navigateSpy).toHaveBeenCalledWith(['/heroes', hero.id, 'edit']);
  });

  it('should display no heroes when search term does not match any hero', () => {
    const searchTerm = 'nonexistenthero';
    const input: HTMLInputElement = getSearchInput();
    input.value = searchTerm;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const table: HeroTable = getHeroTable();

    expect(table.heroes()).toEqual([]);
  });
  
});
