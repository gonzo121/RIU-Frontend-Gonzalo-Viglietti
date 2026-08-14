import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HeroTable } from "../../components/hero-table/hero-table";
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-page',
  imports: [HeroTable],
  standalone: true,
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesPage {
  private readonly heroService = inject(HeroService);

  private readonly router = inject(Router);

  protected readonly searchTerm = signal('');

  protected readonly heroes = computed(() => {
    const term = this.searchTerm();
    return term ? this.heroService.filterHeroesByName(term) : this.heroService.getHeroes();
  });

  protected onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  onEdit(hero: Hero) {
    this.router.navigate(['/heroes', hero.id, 'edit']);
  }

  onView(hero: Hero) {
    this.router.navigate(['/heroes', hero.id, 'view']);
  }

  onDelete(hero: Hero): void {
    console.log('Deleting hero:', hero);
    this.heroService.deleteHero(hero.id);
  }

}
