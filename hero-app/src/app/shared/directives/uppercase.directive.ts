import { Directive } from '@angular/core';

@Directive({
  selector: '[appUppercaseDirective]',
  host:{
    '[style.text-transform]':'"uppercase"'
  }
})
export class UppercaseDirective {
  constructor() {}
}
