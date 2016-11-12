import {Component} from 'angular2/core';
import {HomeService} from './home.services.js';
import {HoverDirective} from '../../directives/thumbnail-hover.directive.js';

@Component({
  selector: 'home',
  templateUrl: './client/app/components/home/home.html',
  providers: [HomeService],
  directives: [HoverDirective]
})

export class HomeComponent {
  projects;
  hoverShow = true;
  constructor(homeService: HomeService){
    this.projects = homeService.getProjects();
  }

  // hover(){
  //   console.log("Mouseover called");
  //   this.hoverShow = true;
  // }

  // hoverStop(){
  //   console.log("Mouseover called");
  //   this.hoverShow = false;
  // }
}