import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Hero } from '../../models/hero.model';
import { MatChipsModule } from '@angular/material/chips';
import { SuperPowerChip } from '../../../../shared/ui/super-power-chip/super-power-chip';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';
import { FranchiseChip } from '../../../../shared/ui/franchise-chip/franchise-chip';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-hero-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule,
    MatChipsModule,
    SuperPowerChip,
    UppercaseDirective,
    FranchiseChip,
  ],
  templateUrl: './hero-table.html',
  styleUrl: './hero-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTable {
  private readonly loadingService = inject(LoadingService);
  readonly heroes = input.required<Hero[]>();
  readonly searchValue = input.required<string>();

  readonly edit = output<Hero>();
  readonly delete = output<Hero>();
  readonly view = output<Hero>();

  protected readonly displayedColumns: string[] = [
    'icon',
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

  protected async onPageChange(event: PageEvent): Promise<void> {
    await this.loadingService.run(() => {
      this.pageIndex.set(event.pageIndex);
      this.pageSize.set(event.pageSize);
    }, 200);
  }
}
