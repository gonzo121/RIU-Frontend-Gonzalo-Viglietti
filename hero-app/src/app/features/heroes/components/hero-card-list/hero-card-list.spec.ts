import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardList } from './hero-card-list';

describe('HeroCardList', () => {
  let component: HeroCardList;
  let fixture: ComponentFixture<HeroCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardList],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
