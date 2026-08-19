import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../models/hero.model';
import { SuperPowerChip } from '../../../../shared/ui/super-power-chip/super-power-chip';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-hero-card-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    SuperPowerChip,
    UppercaseDirective,
  ],
  templateUrl: './hero-card-list.html',
  styleUrl: './hero-card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardList {
  private readonly loadingService = inject(LoadingService);
  readonly heroes = input.required<Hero[]>();

  readonly view = output<Hero>();
  readonly edit = output<Hero>();
  readonly delete = output<Hero>();

  private readonly initialAmount = 5;

  protected readonly visibleAmount = signal(this.initialAmount);

  protected readonly visibleHeroes = computed(() => this.heroes().slice(0, this.visibleAmount()));

  protected readonly hasMoreHeroes = computed(() => this.visibleAmount() < this.heroes().length);

  private readonly scrollSentinel = viewChild<ElementRef<HTMLDivElement>>('scrollSentinel');

  private readonly scrollEffect = effect((onCleanup) => {
    const sentinel = this.scrollSentinel();
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.loadingService.run(() => this.loadMore(), 400);
        }
      },
      {
        rootMargin: '100px',
      },
    );

    observer.observe(sentinel.nativeElement);

    onCleanup(() => observer.disconnect);
  });

  private readonly resetScrollEffect = effect(() => {
    this.heroes();

    this.visibleAmount.set(this.initialAmount);
  });

  private loadMore(): void {
    if (!this.hasMoreHeroes) return;

    this.visibleAmount.update((current) => Math.min(current + 5, this.heroes().length));
  }
}
