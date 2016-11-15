import {Component} from '@angular/core';
import {ProfileService} from './profile.services.js';

@Component({
  selector: 'profile',
  templateUrl: './client/app/components/profile/profile.html',
  styleUrls: ['./client/app/components/profile/profile.css'],
  providers: [ProfileService],
})

export class ProfileComponent {
  projects;
  constructor(profileService: ProfileService) {
    this.projects = profileService.getProjects();
  }
}
