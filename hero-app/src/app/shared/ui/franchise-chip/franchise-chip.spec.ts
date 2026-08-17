import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseChip } from './franchise-chip';

describe('FranchiseChip', () => {
  let component: FranchiseChip;
  let fixture: ComponentFixture<FranchiseChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseChip],
    }).compileComponents();

    fixture = TestBed.createComponent(FranchiseChip);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('franchise', 'DC Comics');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a chip with icon and name if franchise is provided', () => {
    const icon: HTMLElement = fixture.nativeElement.querySelector('.franchise-logo');
    const span: HTMLElement = fixture.nativeElement.querySelector('.franchise-name');

    expect(icon).toBeTruthy();
    expect(span).toBeTruthy();
    expect(icon.getAttribute('src')).toBe('assets/franchise/dc.png');
    expect(span.textContent?.trim()).toBe('DC Comics');
  });

  it('should display a chip with - if no franchise name given', () => {
    fixture.componentRef.setInput('franchise', '')

    fixture.detectChanges();
    
    const span: HTMLElement = fixture.nativeElement.querySelector('.franchise-name');
    
    expect(span).toBeTruthy();
    expect(span.textContent?.trim()).toBe('-');
  })

});
