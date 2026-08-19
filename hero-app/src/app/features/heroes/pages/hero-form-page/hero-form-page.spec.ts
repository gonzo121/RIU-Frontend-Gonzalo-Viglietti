import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormPage } from './hero-form-page';
import { CreateHero, Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { By } from '@angular/platform-browser';
import { HeroForm } from '../../components/hero-form/hero-form';

describe('HeroFormPage', () => {
  let component: HeroFormPage;
  let fixture: ComponentFixture<HeroFormPage>;

  let heroServiceMock: {
    getHeroById: jest.Mock;
    createHero: jest.Mock;
    updateHero: jest.Mock;
  };

  let routerMock: {
    navigate: jest.Mock;
    url: string;
  };

  let loadingServiceMock: {
    run: jest.Mock;
  };

  let activatedRouteMock: {
    snapshot: {
      paramMap: {
        get: jest.Mock;
      };
    };
  };

  const hero: Hero = {
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
  };

  const createHero: CreateHero = {
    name: 'Superman',
    realName: 'Clark Kent',
    franchise: 'DC Comics',
    description: 'Man of Steel',
    superPowers: [],
    age: 35,
    wearCape: true,
    fromEarth: false,
    icon: '',
  };


  beforeEach(async () => {
    heroServiceMock = {
      getHeroById: jest.fn(),
      createHero: jest.fn(),
      updateHero: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
      url: '/heroes/new',
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(null),
        },
      },
    };

    loadingServiceMock = {
      run: jest.fn().mockImplementation(async (operation: () => unknown) => {
        return operation();
      }),
    };

    await TestBed.configureTestingModule({
      imports: [HeroFormPage],
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
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: LoadingService,
          useValue: loadingServiceMock,
        },
      ]
    }).compileComponents();
  });

  const createComponent = () => {
    fixture = TestBed.createComponent(HeroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should stay in create mode when route has no id', () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue(null);
    createComponent();

    expect(component['heroId']).toBeNull();
    expect(component['hero']).toBeUndefined();
  });

  it('should load hero when route contains an id', () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue(1);
    heroServiceMock.getHeroById.mockReturnValue(hero);

    createComponent();

    expect(component['heroId']).toBe(1);
    expect(heroServiceMock.getHeroById).toHaveBeenCalledWith(1);
    expect(component['hero']).toEqual(hero);

  });

  it('should create hero using loading service', async () => {
    createComponent();

    await component['createHero'](createHero);

    expect(loadingServiceMock.run).toHaveBeenCalledTimes(1);
    expect(heroServiceMock.createHero).toHaveBeenCalledWith(createHero);
  });

  it('should navigate to heroes after creating hero', async () => {
    createComponent();

    await component['createHero'](createHero);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should update hero with current hero id', async () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('1');
    heroServiceMock.getHeroById.mockReturnValue(hero);
    routerMock.url = '/heroes/1/edit';

    createComponent();

    await component['updateHero'](createHero);

    const expectedHero: Hero = {
      id:1,
      ...createHero,
    };

    expect(loadingServiceMock.run).toHaveBeenCalledTimes(1);
    expect(heroServiceMock.updateHero).toHaveBeenCalledWith(expectedHero);
  });

  it('should navigate to heroes after updating hero', async () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('1');
    heroServiceMock.getHeroById.mockReturnValue(hero);
    routerMock.url = '/heroes/1/edit';


    createComponent();

    await component['updateHero'](createHero);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should not update hero when heroId is null', async () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue(null);
    routerMock.url = '/heroes/1/edit';

    createComponent();

    await component['updateHero'](createHero);

    expect(loadingServiceMock.run).not.toHaveBeenCalled();
    expect(heroServiceMock.updateHero).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to heroes when canceling', () => {
    createComponent();

    component['cancel']();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should create hero when HeroForm emits createRequested', async () => {
    createComponent();

    const heroForm: HeroForm = fixture.debugElement
      .query(By.directive(HeroForm))
      .componentInstance as HeroForm;

    heroForm.createRequested.emit(createHero);

    await fixture.whenStable();

    expect(heroServiceMock.createHero).toHaveBeenCalledWith(createHero);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should redirect to edit mode', async () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('1');
    routerMock.url = '/heroes/1';
    heroServiceMock.getHeroById.mockReturnValue(hero);

    createComponent();

    expect(component['isViewMode']()).toBe(true);

    await component['redirectToEdit'](1);

    expect(loadingServiceMock.run).toHaveBeenCalledTimes(1);

    expect(component['isViewMode']()).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes', 1, 'edit']);
  });

});
