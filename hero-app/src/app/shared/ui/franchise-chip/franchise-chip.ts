import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-franchise-chip',
  imports: [
    MatChipsModule
  ],
  templateUrl: './franchise-chip.html',
  styleUrl: './franchise-chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FranchiseChip {
  readonly franchise = input.required<string>();
}

