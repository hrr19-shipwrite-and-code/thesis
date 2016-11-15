import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[hover]',
  host: {
    '(mouseover)': 'hover()',
    '(mouseleave)': 'hoverStop()'
  },

})

export class HoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  hover(){
    this.renderer.setElementClass(this.el.nativeElement, 'hide', false)
  }

  hoverStop(){ 
    this.renderer.setElementClass(this.el.nativeElement, 'hide', true)
  }
}