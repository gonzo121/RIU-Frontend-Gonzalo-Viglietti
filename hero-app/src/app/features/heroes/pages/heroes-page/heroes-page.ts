import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HeroTable } from "../../components/hero-table/hero-table";
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { HeroCardList } from '../../components/hero-card-list/hero-card-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-heroes-page',
  imports: [
    HeroTable,
    HeroCardList, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatAnchor, 
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesPage {
  private readonly dialog = inject(MatDialog)
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

  addHero(){
    this.router.navigate(['/heroes', 'new'])
  }

  onEdit(hero: Hero) {
    this.router.navigate(['/heroes', hero.id, 'edit']);
  }

  onView(hero: Hero) {
    this.router.navigate(['/heroes', hero.id, 'view']);
  }

  onDelete(hero: Hero): void {
    const dialogRef = this.dialog.open<
      ConfirmDialog, 
      ConfirmDialogData, 
      boolean
    >(
      ConfirmDialog,
      {
        width: '400px',
        maxWidth: '90vw',
        data: {
          title: 'Eliminar héroe',
          message: `¿Estás seguro de que deseas eliminar a ${hero.name}?`,
        }
      }
    )

    dialogRef.afterClosed().subscribe((confirmed) => {
      if(!confirmed) return;

      this.heroService.deleteHero(hero.id);

    })

  }
  
}
