import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[dropdown]',
  host: {
    '(click)': 'showHide()'
  },

})

export class DropdownDirective {
  hidden = true;

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  showHide() {
    if (this.hidden) {
      this.renderer.setElementClass(this.el.nativeElement, 'hide-dropdown', false)
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'hide-dropdown', true)
    }
    this.hidden = !this.hidden
  }
}