import {Component} from 'angular2/core';
import {HomeService} from './home.services.js';
import {HoverDirective} from '../../directives/thumbnail-hover.directive.js';

import {ProjectThumbnailComponent} from '../projectThumbnail/project-thumbnail.component.js';

@Component({
  selector: 'home',
  templateUrl: './client/app/components/home/home.html',
  providers: [HomeService],
  directives: [HoverDirective, ProjectThumbnailComponent]
})

export class HomeComponent {
  projects;
  hoverShow = true;
  constructor(homeService: HomeService){
    this.projects = homeService.getProjects();
  }
}