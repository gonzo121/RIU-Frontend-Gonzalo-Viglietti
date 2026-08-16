import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../models/hero.model';
import { SuperPowerChip } from '../../../../shared/ui/super-power-chip/super-power-chip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';

@Component({
  selector: 'app-hero-card-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    SuperPowerChip,
    MatPaginatorModule,
    UppercaseDirective
  ],
  templateUrl: './hero-card-list.html',
  styleUrl: './hero-card-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardList {
  readonly heroes = input.required<Hero[]>();

  readonly view = output<Hero>();
  readonly edit = output<Hero>();
  readonly delete = output<Hero>();

  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(5);

  protected readonly paginatedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.heroes().slice(start, end);
  });

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }


}
