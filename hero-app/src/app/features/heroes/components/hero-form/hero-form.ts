import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SUPER_POWERS } from '../../data/powers.data';
import { SuperHeroPower, CreateHero, Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';
import { FranchiseChip } from '../../../../shared/ui/franchise-chip/franchise-chip';
import { SuperPowerChip } from '../../../../shared/ui/super-power-chip/super-power-chip';

@Component({
  selector: 'app-hero-form',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    UppercaseDirective,
    SuperPowerChip,
    FranchiseChip
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  private readonly fb = inject(FormBuilder);
  readonly hero = input<Hero>();

  readonly createRequested = output<CreateHero>();
  readonly cancelRequested = output();
  readonly updateRequested = output<CreateHero>();
  
  protected readonly superPowers = Object.values(SUPER_POWERS);

  protected readonly franchises = [
    'Marvel Comics',
    'DC Comics'
  ]

  private readonly allowedIconTypes = [
    'image/png',
    'image/webp'
  ]

  private readonly maxIconSize = 2 * 1024 * 1024


  protected readonly heroForm =this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]
    ],    
    realName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]
    ],
    franchise: [
      '',
      [
        Validators.required,
      ]
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(500),
      ]
    ],
    superPowers: [
      [] as SuperHeroPower[],
      Validators.required
    ],
    age: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],
    wearCape: [false],
    fromEarth: [true],
    icon: ['']
  });

  private readonly heroEffect = effect(() => {
    const hero = this.hero();

    if(hero){
      this.heroForm.patchValue(hero);
    }
  })

  protected get isEditMode(): boolean {
    return this.hero() !== undefined;
  }

  protected onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if(!file) return;

    if(!this.allowedIconTypes.includes(file.type)){
      this.heroForm.controls.icon.setErrors({
        invalidFileType: true
      })

      return;
    }

    if(file.size > this.maxIconSize) {
      this.heroForm.controls.icon.setErrors({
        fileTooLarge: true
      })

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const icon = reader.result as string;

      this.heroForm.controls.icon.setValue(icon);
      this.heroForm.controls.icon.markAsDirty();
    }

    reader.readAsDataURL(file);
  }

  protected saveHero(): void {
    if(this.heroForm.invalid){
      this.heroForm.markAllAsTouched();
      return;
    }

    const formValue = this.heroForm.getRawValue();

    if(this.isEditMode) {
      this.updateHero(formValue);
      return;
    }

    this.createHero(formValue);
  }

  protected createHero(hero: CreateHero): void {
    this.createRequested.emit(hero);
  }

  protected updateHero(hero: CreateHero): void {
    this.updateRequested.emit(hero);
  }

  protected cancel(): void {
    this.cancelRequested.emit();
  }

}
