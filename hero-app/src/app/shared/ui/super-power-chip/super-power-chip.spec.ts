import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPowerChip } from './super-power-chip';
import { SuperHeroPower } from '../../../features/heroes/models/hero.model';

describe('SuperPowerChip', () => {
  let component: SuperPowerChip;
  let fixture: ComponentFixture<SuperPowerChip>;

  const mockSuperPower: SuperHeroPower = {
    id: 1,
    name: 'Super fuerza',
    icon: 'assets/super-power-icon/super-strength.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperPowerChip],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperPowerChip);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('superPower', mockSuperPower);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the super power name', () => {
    const powerName: HTMLElement = fixture.nativeElement.querySelector('.power-name');

    expect(powerName.textContent?.trim()).toBe(mockSuperPower.name);
  });

  it('should display super power icon when icon is provided', () => {
    const powerIcon: HTMLElement = fixture.nativeElement.querySelector('.super-power-icon');

    expect(powerIcon).toBeTruthy();
    expect(powerIcon.getAttribute('src')).toBe(mockSuperPower.icon);
  });

  it('should not display an icon when super power has no icon', () => {
    const superPowerWithoutIcon: SuperHeroPower = {
      ...mockSuperPower,
      icon: '',
    };

    fixture.componentRef.setInput('superPower', superPowerWithoutIcon);

    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('super-power-icon');

    expect(icon).toBeNull();
  });
});
