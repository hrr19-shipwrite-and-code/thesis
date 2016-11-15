import {Component} from '@angular/core';
import {HomeService} from './home.services.js';
import {HoverDirective} from '../../directives/thumbnail-hover.directive.js';

import {ProjectThumbnailComponent} from '../projectThumbnail/project-thumbnail.component.js';

@Component({
  selector: 'home',
  templateUrl: './client/app/components/home/home.html',
  providers: [HomeService]
})

export class HomeComponent {
  projects;
  constructor(homeService: HomeService){
    this.projects = homeService.getProjects();
  }
}