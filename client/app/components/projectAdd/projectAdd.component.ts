import { Component } from '@angular/core';
import { AddProductModelDirective } from '../../directives/new-project-model.directive.js';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectAddService } from './projectAdd.services.js';
import { ProfileService } from '../profile/profile.services.js';


@Component({
  selector: 'project-add',
  templateUrl: './client/app/components/projectAdd/projectAdd.html',
  styleUrls: ['./client/app/components/projectAdd/projectAdd.css'],
})

export class ProjectAddComponent {
  private userUrl = localStorage.getItem('url');
  private defaultValue = 'Completed'
  private owner = 'Member';
  private userInfo = {};
  private repos = {}
  constructor(private projectService: ProjectAddService, private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.getProfileInfo();
  }

  addProject(data) {
    if(data.owner === 'Member'){
      this.projectService.userCreateProject(data)
        .subscribe(
          data => this.router.navigateByUrl('/project/' + data.id),
          err => console.log(err)
        )
    } else {
      this.projectService.teamCreateProject(data, data.owner)
      .subscribe(
        data => this.router.navigateByUrl('/project/' + data.id),
        err => console.log(err)
      )
    }
  }

  getProfileInfo() {
    this.profileService.getProfileInfo(this.userUrl)
      .subscribe(data => {
        this.userInfo = data;
        if(data.github){
          let username = data.github.split('/');
          this.getGithubProject(username[username.length-1])
        }
      });
  }

  getGithubProject(gitUsername) {
    this.projectService.getGithubProject(gitUsername)
      .subscribe(data => {
        this.repos = data;
      })
  }
}
