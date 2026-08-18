import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTable } from './hero-table';
import { Hero } from '../../models/hero.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';

describe('HeroTable', () => {
  let component: HeroTable;
  let fixture: ComponentFixture<HeroTable>;

  const heroes: Hero[] = [
    {
      id: 1,
      name: 'Superman',
      realName: 'Clark Kent',
      franchise: 'DC Comics',
      description: 'The Man of Steel',
      superPowers: [
        {
          id: 1,
          name: 'Super fuerza',
          icon: 'assets/super-strength.png',
        },
        {
          id: 2,
          name: 'Volar',
          icon: 'assets/fly.png',
        },
      ],
      age: 35,
      wearCape: true,
      fromEarth: false,
      icon: 'assets/superman.png',
    },
    {
      id: 2,
      name: 'Batman',
      realName: 'Bruce Wayne',
      franchise: 'DC Comics',
      description: 'The Dark Knight',
      superPowers: [
        {
          id: 3,
          name: 'Intelecto nivel genio',
          icon: 'assets/genius.png',
        },
      ],
      age: 40,
      wearCape: true,
      fromEarth: true,
      icon: '',
    },
    {
      id: 3,
      name: 'Spider-Man',
      realName: 'Peter Parker',
      franchise: 'Marvel Comics',
      description: 'Friendly neighborhood Spider-Man',
      superPowers: [],
      age: 22,
      wearCape: false,
      fromEarth: true,
      icon: 'assets/spiderman.png',
    },
    {
      id: 4,
      name: 'Thor',
      realName: 'Thor Odinson',
      franchise: 'Marvel Comics',
      description: 'God of Thunder',
      superPowers: [],
      age: 1500,
      wearCape: true,
      fromEarth: false,
      icon: 'assets/thor.png',
    },
    {
      id: 5,
      name: 'Iron Man',
      realName: 'Tony Stark',
      franchise: 'Marvel Comics',
      description: 'Genius billionaire',
      superPowers: [],
      age: 45,
      wearCape: false,
      fromEarth: true,
      icon: 'assets/iron-man.png',
    },
    {
      id: 6,
      name: 'Wonder Woman',
      realName: 'Diana Prince',
      franchise: 'DC Comics',
      description: 'Amazon warrior',
      superPowers: [],
      age: 800,
      wearCape: false,
      fromEarth: false,
      icon: 'assets/wonder-woman.png',
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroTable],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTable);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('heroes', heroes);
    fixture.componentRef.setInput('searchValue', '');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table headers', () => {
    const headers: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('th'));

    const headersText = headers.map(
      header => header.textContent.trim()
    );

    expect(headersText).toEqual([
      '',
      'Heroe',
      'Nombre Real',
      'Franquicia',
      'Poderes',
      'Edad',
      'Capa',
      'De la Tierra',
      'Acciones',
    ]);
  });

  it('should display only the first 5 heros by default', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');

    expect(rows.length).toBe(5);
  });

  it('should display hero data', () => {
    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.mat-mdc-row');

    expect(firstRow.textContent).toContain('Superman');
    expect(firstRow.textContent).toContain('Clark Kent');
    expect(firstRow.textContent).toContain('35');
  })

  it('should display hero icon when hero has an icon', () => {
    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.mat-mdc-row');
    const icon: HTMLImageElement | null = firstRow.querySelector('.hero-icon');

    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('src')).toBe('assets/superman.png');
  });

  it('should display "-" when hero has no icon', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
   
    const secondRow = rows[1];

    expect(secondRow.textContent).toContain('-');
    expect(secondRow.querySelector('.hero-icon')).toBeNull();
  });

  it('should display correct cape icon', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');

    const supermanCapeIcon = rows[0].querySelector('.boolean-yes');

    const spidermanCapeIcon = rows[2].querySelector('.boolean-no');

    expect(supermanCapeIcon?.textContent?.trim()).toBe('check_circle');
    expect(spidermanCapeIcon?.textContent?.trim()).toBe('cancel');
  });

  it('should display correct fromEarth icon', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');

    const supermanFromEarthIcon = rows[0].querySelector('.boolean-yes');

    const spidermanFromEarthIcon = rows[2].querySelector('.boolean-no');

    expect(supermanFromEarthIcon?.textContent?.trim()).toBe('check_circle');
    expect(spidermanFromEarthIcon?.textContent?.trim()).toBe('cancel');
  });

  it('should display super power chips', () => {
    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.mat-mdc-row');

    const chips = firstRow.querySelectorAll('app-super-power-chip');

    expect(chips.length).toBe(2);
  });

  it('should display franchise chip', () => {
    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.mat-mdc-row');

    const franchiseChip = firstRow.querySelector('app-franchise-chip');

    expect(franchiseChip).toBeTruthy();
  });

  it('should emit hero when view button is clicked', () => {
    const viewSpy = jest.fn();

    component.view.subscribe(viewSpy);

    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.mat-mdc-row');

    const viewButton: HTMLButtonElement = firstRow.querySelector('[aria-label="Ver héroe"]')!;

    viewButton.click();

    expect(viewSpy).toHaveBeenCalledWith(heroes[0]);
  });

  it('should emit hero when edit button is clicked', () => {
    const editSpy = jest.fn();

    component.edit.subscribe(editSpy);

    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.mat-mdc-row');

    const editButton: HTMLButtonElement = firstRow.querySelector('[aria-label="Editar héroe"]')!;

    editButton.click();

    expect(editSpy).toHaveBeenCalledWith(heroes[0]);
  });

  it('should emit hero when delete button is clicked', () => {
    const deleteSpy = jest.fn();

    component.delete.subscribe(deleteSpy);

    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.mat-mdc-row');

    const deleteButton: HTMLButtonElement = firstRow.querySelector('[aria-label="Eliminar héroe"]')!;

    deleteButton.click();

    expect(deleteSpy).toHaveBeenCalledWith(heroes[0]);
  });

  it('should display the next page when paginator changes page', () => {
    const paginator = fixture.debugElement
      .query(By.directive(MatPaginator))
      .componentInstance as MatPaginator;

    const event: PageEvent = {
      pageIndex: 1,
      pageSize: 5,
      length: heroes.length,
    };

    paginator.page.emit(event);

    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');

    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Wonder Woman');

  });

  it('should change the number of displayed heroes when page size changes', () => {
    const paginator = fixture.debugElement
      .query(By.directive(MatPaginator))
      .componentInstance as MatPaginator;

    const event: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: heroes.length,
    };

    paginator.page.emit(event);

    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');

    expect(rows.length).toBe(6);
  })

  it('should display no data message when heroes array is empty', () => {
    fixture.componentRef.setInput('heroes', []);
    fixture.componentRef.setInput('searchValue', 'flash');

    fixture.detectChanges();

    const noDataRow: HTMLElement | null = fixture.nativeElement.querySelector('.no-data-text');

    expect(noDataRow).toBeTruthy();

    expect(noDataRow?.textContent).toContain(
      'No hay datos para mostrar para el valor "flash"'
    )
  })
});
