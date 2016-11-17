import { Component } from '@angular/core';
import { ProfileService } from './profile.services.js';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './client/app/components/profile/profile.html',
  styleUrls: ['./client/app/components/profile/profile.css'],
  providers: [ProfileService],
})

export class ProfileComponent {
  projects;
  profileInfo = {Teches: [], Team: [], Member: []};

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.route.params.subscribe((params) => {
      this.profileService.getProfileInfo(params['id'])
      .subscribe( data => {
        this.profileInfo = data;
        this.getUserProjects(data.id);
      });
    });
  }

  getUserProjects(userId) {
    this.profileService.getProjects(userId)
      .subscribe( data => {
        this.projects = data;
      });
  }
}
