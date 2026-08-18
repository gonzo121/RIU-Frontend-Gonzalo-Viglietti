import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HeroService } from '../../services/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { SUPER_POWERS } from '../../data/powers.data';
import { CreateHero, Hero, SuperHeroPower } from '../../models/hero.model';
import { HeroForm } from '../../components/hero-form/hero-form';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-hero-form-page',
  imports: [
    HeroForm
  ],
  templateUrl: './hero-form-page.html',
  styleUrl: './hero-form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroFormPage implements OnInit{
  private readonly heroService = inject(HeroService);
  private readonly loadingService = inject(LoadingService)
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected hero: Hero | undefined;

  protected heroId: number | null = null;
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      return
    }

    this.heroId = Number(id);

    this.hero = this.heroService.getHeroById(this.heroId);
  }

  protected async createHero(hero: CreateHero): Promise<void> {
    await this.loadingService.run(
      () => this.heroService.createHero(hero), 400
    );


    this.router.navigate(['/heroes']);
  }

  protected async updateHero(hero: CreateHero): Promise<void> {
    if(this.heroId === null) return;
    

    const updateHero: Hero = {
      id: this.heroId,
      ...hero
    }

    await this.loadingService.run(
      () => this.heroService.updateHero(updateHero), 400
    );

    this.router.navigate(['/heroes'])
  }

  protected async cancel(): Promise<void> {
    await this.loadingService.run(
      () => () => {}, 400
    )
    this.router.navigate(['/heroes']);
  }
}
