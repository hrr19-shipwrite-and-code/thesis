import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'editProfile',
  templateUrl: './client/app/components/editProfile/editProfile.html',
  styleUrls: ['./client/app/components/editProfile/editProfile.css'],
})

export class EditProfileComponent {
  name = 'Yoda';
  email = 'yoda@aol.com';
  location = 'Dagobah';
  bio = "Size matters not. Look at me. Judge me by my size, do you? Hmm? No. And well you should not. For my ally is the Force, and a powerful ally it is.";


  // projects;
  // profileInfo = {tech: [], team: [], member: []};

  // constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  //   this.projects = profileService.getProjects();
  //   this.getUserInfo();
  // }
  //
  // getUserInfo() {
  //   this.route.params.subscribe((params) => {
  //     this.profileService.getProfileInfo(params['id'], this.profileInfo)
  //   })
  // }
}
