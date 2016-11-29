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
  private owner = '';
  private userInfo = {};
  private repos = [];
  private title = '';
  private github = '';
  private description = '';
  private username = 'default';
  private haveGithub = null;
  private selected = {};
  constructor(private projectService: ProjectAddService, private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.getProfileInfo();
  }

  addProject(data) {
    if(data.owner === this.userInfo.id){
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
        this.owner = data.id;
      });
  }

  getGithubProject(gitUsername) {
    this.projectService.getGithubProject(gitUsername)
      .subscribe(data => {
        this.repos = data;
        this.haveGithub = true;
      })
  }

  handleChange(e){
    let check;
    if(e.target.value === 'Member'){
      check = this.userInfo.github;
      this.selected = this.userInfo;
    } else {
      check = this.userInfo.Team[e.target.value].github;
      this.selected = this.userInfo.Team[e.target.value];
    }

    if(check){
      check = check.split('/')
      this.getGithubProject(check[check.length-1]);
    } else {
      this.repos = [];
      this.haveGithub = false;
    }
    
  }

  handleChooseRepo(e, repoIndex) {
    e.preventDefault();
    let repo = this.repos[repoIndex];
    this.github = repo.html_url;
    this.title = repo.name;
    this.description = repo.description;
    this.owner = this.selected.id;
  }
}
