import { Component } from '@angular/core';
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
  newComment = '';
  comments = [];

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private authService: AuthService) { }
  techs;

  //Runs this function everytime route accessed
  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProject(this.id);
    this.getComment(this.id);
    this.doesUserLike(this.id);
    this.techs = this.projectService.getTech()
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

  //Verify current user is owner of the project
  isOwner(projectOwner){
    let currentUser = localStorage.getItem('authId')
    return currentUser === projectOwner ? true : false;
  }

  //Add tech to project
  addTech(event, tech) {
    event.preventDefault();

    for(let i = 0; i <= this.project.Teches.length; i++){
      if(i === this.project.Teches.length) {
        let temp = {
          name: tech.tech
        }
        this.project.Teches.push(temp)
        this.projectService.addTech(temp)
      }

      if(this.project.Teches[i].name === tech.tech) {
        return;
      }
    }
  }


  editDescription(){
    document.getElementById('project-description').className += ' display-none'
    document.getElementById('project-description-input').className = ''
  }

  editDescriptionPost(event, input){
    event.preventDefault();
    this.project.descripiton = input.descripiton;
    document.getElementById('project-description').className = 'description';
    document.getElementById('project-description-input').className = 'display-none';

    this.projectService.editDescription(input.description)
  }

  //Post comment and add comment to view
  postComment(comment){
    this.projectService.postComment(comment, this.id)
      .subscribe( data => {
        data.Profile = {
          name: localStorage.getItem('name'),
          url: localStorage.getItem('url'),
          picture: localStorage.getItem('picture')
        };
        this.comments.unshift(data)
      })
    this.newComment = '';
  }

  //check if the comment is by the logged in user
  checkUser(url) {
    return localStorage.getItem('url') === url;
  }

  //author of comment can delete their comment
  deleteComment(event) {
    this.projectService.deleteComment(event.target.id)
      .subscribe( data => {
        console.log(data);
      })
  }

  getComment(id) {
    this.projectService.getComment(id)
      .subscribe( data => {
        console.log(data);
        this.comments = data;
      })
  }
}
