import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesPage } from './heroes-page';
import {  Router } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { of, Subject } from 'rxjs';
import { HeroService } from '../../services/hero';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog';

describe('HeroesPage', () => {
  let component: HeroesPage;
  let fixture: ComponentFixture<HeroesPage>;

  let heroServiceMock: {
    getHeroes: jest.Mock;
    filterHeroesByName: jest.Mock;
    deleteHero: jest.Mock;
  };

  let routerMock: {
    navigate: jest.Mock;
  };

  let loadingServiceMock: {
    run: jest.Mock;
    show: jest.Mock;
    hide: jest.Mock;
  };

  let dialogMock: {
    open: jest.Mock;
  };

  const heroes: Hero[] = [
    {
      id: 1,
      name: 'Batman',
      realName: 'Bruce Wayne',
      franchise: 'DC Comics',
      description: 'The Dark Knight',
      superPowers: [],
      age: 40,
      wearCape: true,
      fromEarth: true,
      icon: '',
    },
    {
      id: 2,
      name: 'Spider-Man',
      realName: 'Peter Parker',
      franchise: 'Marvel Comics',
      description: 'Friendly neighborhood Spider-Man',
      superPowers: [],
      age: 25,
      wearCape: false,
      fromEarth: true,
      icon: '',
    },
  ];

  beforeEach(async () => {
    heroServiceMock = {
      getHeroes: jest.fn().mockReturnValue(heroes),
      filterHeroesByName: jest.fn().mockReturnValue(heroes),
      deleteHero: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    loadingServiceMock = {
      run: jest.fn().mockImplementation(
        async (operation: () => unknown) => operation()
      ),
      hide: jest.fn(),
      show: jest.fn(),
    };

    dialogMock = {
      open: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HeroesPage],
      providers: [
        {
          provide: HeroService,
          useValue: heroServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: LoadingService,
          useValue: loadingServiceMock,
        },
      ],
    }).compileComponents();
    
    TestBed.overrideProvider(MatDialog, {
      useValue: dialogMock,
    });

    await TestBed.compileComponents();

  });

  afterEach(() => {
    fixture?.destroy();
    jest.useRealTimers();
  })

  const createComponent = () => {
    fixture = TestBed.createComponent(HeroesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should initialize searchTerm with an empty string', () => {
    createComponent();

    expect(component['searchTerm']()).toBe('');
  });

  it('should return all heroes when searchTerm is empty', () => {
    createComponent();

    const result = component['heroes']();

    expect(heroServiceMock.getHeroes).toHaveBeenCalled();
    expect(heroServiceMock.filterHeroesByName).not.toHaveBeenCalled();
    expect(result).toEqual(heroes);
  });

  it('should filter heroes by name when searchTerm has a value', () => {
    const filteredHeroes = [heroes[0]];

    heroServiceMock.filterHeroesByName.mockReturnValue(filteredHeroes);

    createComponent();

    component['searchTerm'].set('bat');

    const result = component['heroes']();

    expect(heroServiceMock.filterHeroesByName).toHaveBeenCalledWith('bat');

    expect(result).toEqual(filteredHeroes);
  });

  it('should update searchTerm when search input changes', () => {
    createComponent();

    const event = {
      target: {
        value: 'Spider',
      },
    } as unknown as Event;

    component['onSearchTermChange'](event);

    expect(component['searchTerm']()).toBe('Spider');
  });

  it('should navigate to new hero page when addHero is called', () => {
    createComponent();

    component.addHero();

    expect(loadingServiceMock.run).toHaveBeenCalledTimes(1);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes', 'new']);
  });

  it('should navigate to edit hero page when editHero is called', () => {
    createComponent();

    component.editHero(heroes[0]);

    expect(loadingServiceMock.run).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes', heroes[0].id, 'edit']);
  });

  it('should navigate to form hero page when viewHero is called', () => {
    createComponent();

    component.viewHero(heroes[0]);

    expect(loadingServiceMock.run).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes', heroes[0].id]);
  });

  it('should open confirmation dialog when deleting a hero', () => {
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(false),
    });

    createComponent();

    component.deleteHero(heroes[0]);

    expect(dialogMock.open).toHaveBeenCalledWith(
      ConfirmDialog, 
      {
        width: '400px',
        maxWidth: '90vw',
        data: {
          title: 'Eliminar héroe',
          message:
            '¿Estás seguro de que deseas eliminar a Batman?',
          confirm: {
            icon: 'delete',
            text: 'Eliminar',
          },
        },
      }
    );
  });

  it('should delete hero when deletion is confirmed', () => {
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true),
    });

    createComponent();

    component.deleteHero(heroes[0]);

    expect(dialogMock.open).toHaveBeenCalled();
    expect(loadingServiceMock.run).toHaveBeenCalledTimes(1);
    expect(heroServiceMock.deleteHero).toHaveBeenCalledWith(heroes[0].id);
  });

  it('should not delete hero when deletion is canceled', () => {
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(false),
    });

    createComponent();

    component.deleteHero(heroes[0]);

    expect(dialogMock.open).toHaveBeenCalled();
    expect(heroServiceMock.deleteHero).not.toHaveBeenCalled();
    expect(loadingServiceMock.run).not.toHaveBeenCalled();
  });

  it('should show and hide loading during search', async () => {
    jest.useFakeTimers();

    createComponent();

    const event = {
      target: {
        value: 'bat'
      }
    } as unknown as Event

    component['onSearchTermChange'](event);

    await jest.advanceTimersByTimeAsync(100);

    expect(loadingServiceMock.show).toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(400);

    expect(loadingServiceMock.hide).toHaveBeenCalled();

    jest.useRealTimers();
  })
});
