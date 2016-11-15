import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[hoverTech]',
  host: {
    '(mouseover)': 'hover()',
    '(mouseleave)': 'hoverStop()'
  },

})

export class TechHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  hover(){
    this.renderer.setElementClass(this.el.nativeElement, 'highlight', true)
  }

  hoverStop(){ 
    this.renderer.setElementClass(this.el.nativeElement, 'highlight', false)    
  }
}