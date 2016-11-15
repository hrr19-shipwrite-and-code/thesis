import {Component, ElementRef, Renderer} from '@angular/core';
import {BrowseService} from './browse.services.js';

@Component({
  selector: 'browse',
  templateUrl: './client/app/components/browse/browse.html',
  providers: [BrowseService]
})

export class BrowseComponent {
  techs;
  filteredTech = [];
  constructor(browseService: BrowseService, private el: ElementRef, private renderer: Renderer){
    this.techs = browseService.getTech();
  }

  addTechToSearch(tech){
    if (this.filteredTech.indexOf(tech) === -1) {
      this.renderer.setElementClass(this.el.nativeElement, 'selected', true);
      this.filteredTech.push(tech);      
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'selected', false);
      let index = this.filteredTech.indexOf(tech);
      this.filteredTech.splice(index, index + 1);
    }
    console.log(this.filteredTech)
  }
}
