import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HeroService } from '../../services/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateHero, Hero } from '../../models/hero.model';
import { HeroForm } from '../../components/hero-form/hero-form';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-hero-form-page',
  imports: [
    HeroForm,
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
  protected isViewMode = signal(false);
  protected isEditMode = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      return
    }

    this.isEditMode.set(this.router.url.endsWith('/edit'));
    
    if(!this.isEditMode()) this.isViewMode.set(true);

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

  protected cancel(): void {
    this.router.navigate(['/heroes']);
  }

  protected async redirectToEdit(heroId: number): Promise<void>{
    await this.loadingService.run(
      () => this.isViewMode.set(false), 400
    );
    this.router.navigate(['/heroes', heroId, 'edit'])

  }
}
