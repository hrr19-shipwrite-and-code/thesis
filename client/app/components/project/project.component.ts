import {Component} from '@angular/core';
import { ProjectService } from './project.services.js';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'project',
  templateUrl: './client/app/components/project/project.html',
  styleUrls: ['./client/app/components/project/project.css'],
  providers: [ProjectService, AuthService]
})

export class ProjectComponent {
  color = '#888B8D';
  like = { color: this.color};
  project: Object;
  private sub: any;
  id: String;
  error: Boolean;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private authService: AuthService) { }

  //Runs this function everytime route accessed
  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProject(this.id);
    this.doesUserLike(this.id);
  }

  //Service function to get the project by the route params Id
  getProject(id) {
    this.projectService.getProject(id)
      .subscribe(
        data => this.project = data,
        err => this.error = true
      )
  }

  //Checks if the user already likes this project
  doesUserLike(id) {
    this.projectService.doesUserLike(id)
      .subscribe(
        data => {
          if (data.like) this.like.color = 'red'
        },
        err => err
      )
  }

  //Service for liking/unliking a project
  likeProject(id) {
    this.projectService.likeProject(id)
      .subscribe(
        data => {
          if (data.like) {
            this.project.likes++;
            this.like.color = 'red';
          } else {
            this.project.likes--;
            this.like.color = '#888B8D';
          }
        },
        err => this.authService.login()
      )
  }

  isOwner(){ 
    console.log(this.project.Profile)
    // this.project.Profile.unique
    let test = localStorage.getItem('id_token')
    console.log(test)
  }

}
