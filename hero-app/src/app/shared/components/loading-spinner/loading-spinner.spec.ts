import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinner } from './loading-spinner';
import { signal } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

describe('LoadingSpinner', () => {
  let component: LoadingSpinner;
  let fixture: ComponentFixture<LoadingSpinner>;

  const isLoading = signal(false);

  const loadingServiceMock = {
    isLoading,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinner],
      providers: [
        {
          provide: LoadingService,
          useValue: loadingServiceMock,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinner);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the loading overlay when loading is false', () => {
    const overlay: HTMLElement | null = fixture.nativeElement.querySelector('.loading-overlay');

    expect(overlay).toBeNull();
  });

  it('should display the loading overlay when loading is true', () => {
    isLoading.set(true);
    fixture.detectChanges();

    const overlay: HTMLElement | null = fixture.nativeElement.querySelector('.loading-overlay');

    expect(overlay).toBeTruthy();
  });

  it('should display the spinner when loading is true', () => {
    isLoading.set(true);
    fixture.detectChanges();

    const spinner: HTMLElement | null = fixture.nativeElement.querySelector('mat-spinner');

    expect(spinner).toBeTruthy();
  });

  it('should hide the spinner when loading changes from true to false', () => {
    isLoading.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mat-spinner')).toBeTruthy();

    isLoading.set(false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mat-spinner')).toBeNull();
  })
});
