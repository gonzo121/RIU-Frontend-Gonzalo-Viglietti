import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly pendingOperatios = signal(0);

  readonly isLoading = computed(() => this.pendingOperatios() > 0);

  show(): void {
    this.pendingOperatios.update((value) => value + 1);
  }

  hide(): void {
    this.pendingOperatios.update((value) => Math.max(0, value - 1));
  }

  async run<T>(operation: () => T | Promise<T>, minDuration = 0): Promise<T> {
    this.show();

    const start = performance.now();

    try {
      const result = await operation();

      const elapsed = performance.now() - start;
      const remaining = minDuration - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      return result;
    } finally {
      this.hide();
    }
  }
}
