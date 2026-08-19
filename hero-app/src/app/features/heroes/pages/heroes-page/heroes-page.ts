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
import { LoadingService } from '../../../../core/services/loading.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, defer, distinctUntilChanged, finalize, switchMap, tap, timer } from 'rxjs';

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
  private readonly loadingService = inject(LoadingService)

  private readonly router = inject(Router);

  protected readonly searchTerm = signal('');

  private readonly searchTerm$ = toObservable(this.searchTerm);

  constructor() {
    this.searchTerm$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(value => {
          return defer(() => {
            this.loadingService.show();
            return timer(400).pipe(
              tap(() => {
                this.searchTerm.set(value);
              }),
              finalize(() => {
                this.loadingService.hide();
              })
            );
          });
        }),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  protected readonly heroes = computed(() => {
    const term = this.searchTerm();
    return term ? this.heroService.filterHeroesByName(term) : this.heroService.getHeroes();
  });

  protected onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value)
  }

  addHero(){
    this.loadingService.run(
      () => this.router.navigate(['/heroes', 'new']), 400
    );
  }

  editHero(hero: Hero) {
    this.loadingService.run(
      () => this.router.navigate(['/heroes', hero.id, 'edit']), 400
    );
    
  }

  viewHero(hero: Hero) {
    this.loadingService.run(
      () => this.router.navigate(['/heroes', hero.id]), 400
    );
  }

  deleteHero(hero: Hero): void {
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
          confirm: {
            icon: 'delete',
            text: 'Eliminar'
          },
        }
      }
    )

    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if(!confirmed) return;

      await this.loadingService.run(
        () => this.heroService.deleteHero(hero.id), 400
      );
    });

  }
  
}
