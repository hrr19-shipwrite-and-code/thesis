import {Component} from 'angular2/core';
import {ProfileService} from './profile.services.js';


import {HoverDirective} from '../../directives/thumbnail-hover.directive.js';
import {ProjectThumbnailComponent} from '../projectThumbnail/project-thumbnail.component.js';

@Component({
  selector: 'profile',
  templateUrl: './client/app/components/profile/profile.html',
  styleUrls: ['./client/app/components/profile/profile.css'],

  providers: [ProfileService],
  directives: [HoverDirective, ProjectThumbnailComponent]
})

export class ProfileComponent {
  projects;
  hoverShow = true;
  constructor(profileService: ProfileService) {
    this.projects = profileService.getProjects();
  }
}
