import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  standalone: true,
  templateUrl: './hero-table.html',
  styleUrl: './hero-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTable {
  readonly heroes = input.required<Hero[]>();

  readonly edit = output<Hero>();
  readonly delete = output<Hero>();
  readonly view = output<Hero>();

  protected readonly displayedColumns: string[] = [
    'name',
    'realName',
    'franchise',
    'superPowers',
    'age',
    'wearCape',
    'fromEarth',
    'actions',
  ];

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
