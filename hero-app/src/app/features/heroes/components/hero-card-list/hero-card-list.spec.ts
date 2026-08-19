import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardList } from './hero-card-list';
import { Hero } from '../../models/hero.model';

describe('HeroCardList', () => {

  let component: HeroCardList;
  let fixture: ComponentFixture<HeroCardList>;

  let intersectionCallback: IntersectionObserverCallback;
  let observeMock: jest.Mock;
  let disconnectMock: jest.Mock;

  const mockIntersectionObserver = (): void => {
    observeMock = jest.fn();
    disconnectMock = jest.fn();

    jest
      .spyOn(globalThis, 'IntersectionObserver')
      .mockImplementation(callback => {

        intersectionCallback = callback;

        return {
          observe: observeMock,
          unobserve: jest.fn(),
          disconnect: disconnectMock,
        } as unknown as IntersectionObserver;

      })
    };
  
  const triggerIntersection = (
    isIntersecting: boolean
  ): void => {
    intersectionCallback(
      [
        {
          isIntersecting
        } as IntersectionObserverEntry
      ],
      {} as IntersectionObserver
    );
  };

  const createHero = (id: number): Hero => ({
    id,
    name: `Hero ${id}`,
    realName: `Real name ${id}`,
    franchise: 'DC Comics',
    description: `Description ${id}`,
    superPowers: [],
    age: 30,
    wearCape: true,
    fromEarth: true,
    icon: ''
  });

  const heroes: Hero[] = Array.from(
    { length: 12 },
    (_, index) => createHero(index + 1)
  );

  beforeEach(async () => {
    mockIntersectionObserver();

    await TestBed.configureTestingModule({
      imports: [HeroCardList]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardList);

    fixture.componentRef.setInput('heroes', heroes);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only the initial amount of heroes', () => {
    const cards = fixture.nativeElement.querySelectorAll('.hero-card');

    expect(cards.length).toBe(5);
  });

  it('should display the scroll sentinel when there are more heroes', () => {
    const sentinel = fixture.nativeElement.querySelector('.scroll-sentinel');

    expect(sentinel).toBeTruthy();
  });

  it('should observe the scroll sentinel', () => {
    const sentinel = fixture.nativeElement.querySelector('.scroll-sentinel');

    expect(sentinel).toBeTruthy();
    expect(observeMock).toHaveBeenCalledWith(sentinel);
  });

  it('should load more heroes when the sentinel intersects', () => {
    triggerIntersection(true);

    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.hero-card');

    expect(cards.length).toBe(10);
  });

  it('should not load more heroes when the sentinel does not intersect', () => {
    triggerIntersection(false);

    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.hero-card');

    expect(cards.length).toBe(5);
  });

  it('should not display more heroes than available', () => {
    triggerIntersection(true);
    fixture.detectChanges();

    triggerIntersection(true);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.hero-card');

    expect(cards.length).toBe(12);
  });

  it('should remove the scroll sentinel when all heroes are visible', () => {
    triggerIntersection(true);
    fixture.detectChanges();

    triggerIntersection(true);
    fixture.detectChanges();

    const sentinel = fixture.nativeElement.querySelector('.scroll-sentinel');

    expect(sentinel).toBeNull();
  });

  it('should reset visible heroes when heroes input changes', () => {
    triggerIntersection(true)
    fixture.detectChanges();

    let cards = fixture.nativeElement.querySelectorAll('.hero-card');

    expect(cards.length).toBe(10);

    const filteredHeroes = [
      createHero(20),
      createHero(21),
      createHero(22),
      createHero(23),
      createHero(24),
      createHero(25),
      createHero(26)
    ];

    fixture.componentRef.setInput('heroes', filteredHeroes);

    fixture.detectChanges();

    cards = fixture.nativeElement.querySelectorAll('.hero-card');

    expect(cards.length).toBe(5);
  })

  it('should emit hero when view button is clicked', () => {
    const viewSpy = jest.fn();

    component.view.subscribe(viewSpy);

    const firstCard: HTMLElement = fixture.nativeElement.querySelector('.hero-card');

    const viewButton: HTMLButtonElement = firstCard.querySelector('[aria-label="Ver héroe"]')!;

    viewButton.click();

    expect(viewSpy).toHaveBeenCalledWith(heroes[0]);
  });

  it('should emit hero when edit button is clicked', () => {
    const editSpy = jest.fn();

    component.edit.subscribe(editSpy);

    const firstCard: HTMLElement = fixture.nativeElement.querySelector('.hero-card');

    const editButton: HTMLButtonElement = firstCard.querySelector('[aria-label="Editar héroe"]')!;

    editButton.click();

    expect(editSpy).toHaveBeenCalledWith(heroes[0]);
  });

  it('should emit hero when delete button is clicked', () => {
    const deleteSpy = jest.fn();

    component.delete.subscribe(deleteSpy);

    const firstCard: HTMLElement = fixture.nativeElement.querySelector('.hero-card');

    const deleteButton: HTMLButtonElement = firstCard.querySelector('[aria-label="Eliminar héroe"]')!;

    deleteButton.click();

    expect(deleteSpy).toHaveBeenCalledWith(heroes[0]);
  });

});
