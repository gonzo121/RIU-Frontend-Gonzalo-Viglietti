import { Directive } from '@angular/core';

@Directive({
  selector: '[appUppercaseDirective]',
  standalone: true,
  host:{
    '[style.text-transform]':'"uppercase"'
  }
})
export class UppercaseDirective {
  constructor() {}
}
