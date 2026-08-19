import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialog, ConfirmDialogData } from './confirm-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;

  const mockDialogData: ConfirmDialogData = {
    title: 'Eliminar heroe',
    message: 'Esta seguro de que desea eliminar este heroe?',
    confirm: {
      icon: 'delete',
      text: 'Si, eliminar',
    },
    cancelText: 'Cancelar',
  };

  const dialogRefMock = {
    close: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
        },
        {
          provide: MatDialogRef,
          useValue: dialogRefMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dialog title', () => {
    const title: HTMLElement = fixture.nativeElement.querySelector('h2');

    expect(title.textContent?.trim()).toBe(mockDialogData.title);
  });

  it('should display the dialog message', () => {
    const message: HTMLElement = fixture.nativeElement.querySelector('mat-dialog-content p');

    expect(message.textContent?.trim()).toBe(mockDialogData.message);
  });

  it('should display custom confirm text', () => {
    const confirmText: HTMLElement = fixture.nativeElement.querySelector('.confirm-text');

    expect(confirmText.textContent?.trim()).toBe(mockDialogData.confirm?.text);
  });

  it('should display custom confirm icon', () => {
    const confirmIcon: HTMLElement = fixture.nativeElement.querySelector(
      '.confirm-button mat-icon',
    );

    expect(confirmIcon.textContent?.trim()).toBe(mockDialogData.confirm?.icon);
  });

  it('should display custom cancel text', () => {
    const cancelButton: HTMLElement = fixture.nativeElement.querySelector('.cancel-button');

    expect(cancelButton.textContent?.trim()).toBe(mockDialogData.cancelText);
  });

  it('should close dialog with false when cancel button is clicked', () => {
    const cancelButton: HTMLElement = fixture.nativeElement.querySelector('.cancel-button');

    cancelButton.click();

    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true when confirm button is clicked', () => {
    const confirmButton: HTMLElement = fixture.nativeElement.querySelector('.confirm-button');

    confirmButton.click();

    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });
});

describe('ConfirmDialog defaults', () => {
  let fixture: ComponentFixture<ConfirmDialog>;

  const mockData: ConfirmDialogData = {
    title: 'Confirmacion',
    message: 'Desea continuar?',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockData,
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    fixture.detectChanges();
  });

  it('should display "Cancelar" as default cancel text', () => {
    const cancelButton: HTMLElement = fixture.nativeElement.querySelector('.cancel-button');

    expect(cancelButton.textContent?.trim()).toBe('Cancelar');
  });

  it('should display "Aceptar" as default confirm text', () => {
    const confirmButton: HTMLElement = fixture.nativeElement.querySelector('.confirm-text');

    expect(confirmButton.textContent?.trim()).toBe('Aceptar');
  });

  it('should display "check" as default confirm icon', () => {
    const confirmButton: HTMLElement = fixture.nativeElement.querySelector(
      '.confirm-button mat-icon',
    );

    expect(confirmButton.textContent?.trim()).toBe('check');
  });
});
