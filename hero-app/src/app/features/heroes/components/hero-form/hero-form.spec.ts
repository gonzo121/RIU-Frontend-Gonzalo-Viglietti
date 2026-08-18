import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroForm } from './hero-form';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SUPER_POWERS } from '../../data/powers.data';
import { CreateHero, Hero } from '../../models/hero.model';
import { By } from '@angular/platform-browser';
import { createComponent } from '@angular/core';

describe('HeroForm', () => {
  let component: HeroForm;
  let fixture: ComponentFixture<HeroForm>;
  let form: FormGroup;

  const superPower = Object.values(SUPER_POWERS)[0];

  const validHero: CreateHero = {
    name: 'Batman',
    realName: 'Bruce Wayne',
    franchise: 'DC Comics',
    description: 'The Dark Knight',
    superPowers: [superPower],
    age: 40,
    wearCape: true,
    fromEarth: true,
    icon: ''
  };

  const existingHero: Hero = {
    id: 1,
    ...validHero
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroForm],
    }).compileComponents()
    

  });

  const createComponent = (hero?: Hero): void => {
    fixture = TestBed.createComponent(HeroForm);
    component = fixture.componentInstance;
  
    if(hero) fixture.componentRef.setInput('hero', hero);

    fixture.detectChanges();

    const formDebugElement = fixture.debugElement.query(By.directive(FormGroupDirective));

    form = formDebugElement.injector.get(FormGroupDirective).form;
  };


  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    createComponent();

    expect(form.getRawValue()).toEqual({
      name: '',
      realName: '',
      franchise: '',
      description: '',
      superPowers: [],
      age: 1,
      wearCape: false,
      fromEarth: true,
      icon: ''
    });
  });

  it('should be invalid initially', () => {
    createComponent();

    expect(form.invalid).toBe(true);
  });

  it('should require hero name', () => {
    createComponent();

    const nameControl = form.get('name');

    nameControl?.setValue('');

    expect(nameControl?.hasError('required')).toBe(true);

  });

  it('should require hero name to have at least 2 characters', () => {
    createComponent();

    const nameControl = form.get('name');

    nameControl?.setValue('B');

    expect(nameControl?.hasError('minlength')).toBe(true);
  });

  it('should not allow hero name longer than 50 characters', () => {
    createComponent();

    const nameControl = form.get('name');

    nameControl?.setValue('a'.repeat(51));

    expect(nameControl?.hasError('maxlength')).toBe(true);
  });

  it('should require age to be at least 1', () => {
    createComponent();

    const ageControl = form.get('age');

    ageControl?.setValue(0);

    expect(ageControl?.hasError('min')).toBe(true);
  });

  it('should require at least one super power', () => {
    createComponent();

    const superPowerControl = form.get('superPowers');

    superPowerControl?.setValue([]);

    expect(superPowerControl?.hasError('required')).toBe(true);
  });

  it('should not emit createdRequest when form is invalid', () => {
    createComponent();

    const createSpy = jest.fn();

    component.createRequested.subscribe(createSpy);

    const formElement = fixture.debugElement.query(By.css('form'));

    formElement.triggerEventHandler('ngSubmit');

    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should mark all controls as touchend when submitting an invalid form', () => {
    createComponent();

    const formElement = fixture.debugElement.query(By.css('form'));

    formElement.triggerEventHandler('ngSubmit');

    Object.values(form.controls).forEach(control => {
      expect(control.touched).toBe(true);
    });
  });

  it('should display create mode title when no hero is provided', () => {
    createComponent();

    const title: HTMLElement = fixture.nativeElement.querySelector('h1');

    expect(title.textContent?.trim()).toBe('Agregar héroe');
  });

  it('should emit createRequested when submittin a valid form in create mode', () => {
    createComponent();

    const createSpy = jest.fn();
    const updateSpy = jest.fn();

    component.createRequested.subscribe(createSpy);
    component.updateRequested.subscribe(updateSpy);

    form.setValue(validHero);

    const formElement = fixture.debugElement.query(By.css('form'));

    formElement.triggerEventHandler('ngSubmit');

    expect(createSpy).toHaveBeenCalledWith(validHero);
    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('should patch the form with hero data in edit mode', () => {
    createComponent(existingHero);

    expect(form.getRawValue()).toEqual(validHero);
  });

  it('should display edit mode title when hero is provided', () => {
    createComponent(existingHero);

    const title: HTMLElement = fixture.nativeElement.querySelector('h1');

    expect(title.textContent?.trim()).toBe('Editar héroe');
  });

  it('should emit updateRequest when submitting in edit mode', () => {
    createComponent(existingHero);

    const createSpy = jest.fn();
    const updateSpy = jest.fn();

    component.createRequested.subscribe(createSpy);
    component.updateRequested.subscribe(updateSpy);

    form.patchValue({
      name: 'Batman Updated'
    });

    const formElement = fixture.debugElement.query(By.css('form'));

    formElement.triggerEventHandler('ngSubmit');

    expect(updateSpy).toHaveBeenCalledWith({
      ...validHero,
      name: 'Batman Updated'
    });
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should emit cancelRequested when cancel button is clicked', () => {
    createComponent();

    const cancelSpy = jest.fn();

    component.cancelRequested.subscribe(cancelSpy);

    const backButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Volver"]');

    backButton.click();

    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });

  it('should reject unsupported icon file types', () => {
    createComponent();

    const file = new File(
      ['image'],
      'batman.jpg',
      { type: 'image/jpeg' }
    );

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="file"]');

    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true
    });

    input.dispatchEvent(
      new Event('change', {bubbles: true})
    );

    expect(
      form.get('icon')?.hasError('invalidFileType')
    ).toBe(true);
  });

  it('should reject icon files larger than 2 MB', () => {
    createComponent();

    const largeFile = new File(
      [new Uint8Array(2 * 1024 * 1024 + 1)],
      'batman.png',
      {type: 'image/png'}
    );

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="file"]');

    Object.defineProperty(input, 'files', {
      value: [largeFile],
      configurable: true
    });

    input.dispatchEvent(
      new Event('change', {bubbles: true})
    );

    expect(
      form.get('icon')?.hasError('fileTooLarge')
    ).toBe(true);
  })

});


