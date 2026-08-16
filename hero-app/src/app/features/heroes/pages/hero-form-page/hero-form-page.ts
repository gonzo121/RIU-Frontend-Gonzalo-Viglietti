import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroService } from '../../services/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { SUPER_POWERS } from '../../data/powers.data';
import { CreateHero, Hero, SuperHeroPower } from '../../models/hero.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';
import { SuperPowerChip } from '../../../../shared/ui/super-power-chip/super-power-chip';
import { FranchiseChip } from '../../../../shared/ui/franchise-chip/franchise-chip';

type FormMode = 'create'| 'edit' | 'view';

@Component({
  selector: 'app-hero-form-page',
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
  templateUrl: './hero-form-page.html',
  styleUrl: './hero-form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroFormPage implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly heroService = inject(HeroService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected heroId: number | null = null;
  
  protected readonly superPowers = Object.values(SUPER_POWERS);

  protected readonly franchises = [
    'Marvel Comics',
    'DC Comics'
  ]

  protected mode : FormMode = 'create';

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
  });

  protected get isEditMode(): boolean {
    return this.heroId !== null;
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      this.mode = 'create';
      return
    }

    this.heroId = Number(id);

    const hero = this.heroService.getHeroById(this.heroId);

    this.heroForm.patchValue(hero);

    const isEditRoute = this.router.url.endsWith('/edit');

    this.mode = isEditRoute ? 'edit' : 'view';

    if(this.mode === 'view') this.heroForm.disable();
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
    this.heroService.createHero(hero);

    this.router.navigate(['/heroes']);
  }

  protected updateHero(hero: CreateHero): void {
    if(this.heroId === null) return;
    

    const updateHero: Hero = {
      id: this.heroId,
      ...hero
    }

    this.heroService.updateHero(updateHero);

    this.router.navigate(['/heroes']);
  }

  protected cancel(): void {
    this.router.navigate(['/heroes']);
  }
}
