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
  techs = [];
  newTech = '';

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private authService: AuthService) { }

  //Runs this function everytime route accessed
  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProject(this.id);
    this.getComment(this.id);
    this.doesUserLike(this.id);
    this.getAllTech();
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

  getAllTech() {
    this.projectService.getTech()
      .subscribe( data => {
        this.techs = data;
      })
  }

  //Add tech to project
  addTech() {
    for(let value of this.project.Teches){
      if(value.name === this.newTech) {
        return this.newTech = '';
      }
    }

    let newTech = { name: this.newTech, id: this.project.id };
    this.project.Teches.push(newTech);
    this.projectService.addTech(newTech)
      .subscribe(data => {});
    this.newTech = '';
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
  postComment(){
    this.projectService.postComment({comment: this.newComment}, this.id)
      .subscribe( data => {
        data.Profile = {
          name: localStorage.getItem('name'),
          url: localStorage.getItem('url'),
          picture: localStorage.getItem('picture')
        };
        this.comments.unshift(data);
        this.project.comments ++;
      })
    this.newComment = '';
  }

  //check if the comment is by the logged in user
  checkUser(url) {
    return localStorage.getItem('url') === url;
  }

  //author of comment can delete their comment
  deleteComment(event, comment) {
    this.projectService.deleteComment(event.target.id)
      .subscribe( data => {})
    const commentIndex = this.comments.indexOf(comment);
    this.comments.splice(commentIndex, 1);
    this.project.comments --;
  }

  getComment(id) {
    this.projectService.getComment(id)
      .subscribe( data => {
        this.comments = data;
      })
  }
}
