import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { SuperHeroPower } from '../../../features/heroes/models/hero.model';

@Component({
  selector: 'app-super-power-chip',
  imports: [MatChipsModule],
  templateUrl: './super-power-chip.html',
  styleUrl: './super-power-chip.scss',
})
export class SuperPowerChip {
  readonly superPower = input.required<SuperHeroPower>();
}
