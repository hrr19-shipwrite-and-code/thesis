import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[addProductModel]'

})

export class AddProductModelDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  hover(){
    this.renderer.setElementClass(this.el.nativeElement, 'highlight', true)
  }

  hoverStop(){ 
    this.renderer.setElementClass(this.el.nativeElement, 'highlight', false)    
  }
}