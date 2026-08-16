import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPowerChip } from './super-power-chip';

describe('SuperPowerChip', () => {
  let component: SuperPowerChip;
  let fixture: ComponentFixture<SuperPowerChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperPowerChip],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperPowerChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
