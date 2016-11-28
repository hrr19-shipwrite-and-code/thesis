import { Component } from '@angular/core';
import { ProjectService } from './project.services.js';
import { ActivatedRoute, Router } from '@angular/router';
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
  private openSource: String;
  private picture: Object = {url: '/client/app/assets/thumbnail.png'}
  private uploadFile: any;
  private options: Object = {
    filterExtensions: true,
    allowedExtensions: ['image/png', 'image/jpeg', 'image/jpg'],
    calculateSpeed: true,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: 'Bearer'
  };
  private editDescrip = false;
  private editTitle = false;
  private editTech = false;
  private editGithub = false;
  private editDeploy = false;
  private editProgress = false;
  private editSource = false;
  private team = false;
  private memberType = '';

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  //Runs this function everytime route accessed
  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProject(this.id);
    this.getComment(this.id);
    this.doesUserLike(this.id);
    this.getAllTech();
    this.options.url = 'http://localhost:1337/api/project/upload/user/' + this.id;);
  }

  //Service function to get the project by the route params Id
  getProject(id) {
    this.projectService.getProject(id)
      .subscribe(
        data => {
          if (data.Images.length > 0) {
            this.picture = data.Images[0];
          }
          data.createdAt = moment(data.createdAt).format('MMMM Do YYYY');
          this.determineOpenSource(data.openSource);
          this.project = data
          if (data.Profile.Member.length > 0) {
            this.options.url = 'http://localhost:1337/api/project/upload/team/' + data.Profile.id + '/' + this.id;
            this.team = true;
          }
          for(let member of data.Profile.Member){
            if(member.url === localStorage.getItem('url')){
              //this.options.url = ???
              return this.memberType = member.TeamUsers.type
            }
          }
        },
        err => this.router.navigateByUrl('/')
      )
  }

  gotoUser() {
    this.router.navigateByUrl('/' + this.project.Profile.url )
  }

  determineOpenSource(data) {
    if (data) {
      this.openSource = "Open source"
    } else {
      this.openSource = "Not open source"
    }
  }

  deleteProject() {
    let choice = prompt('Enter the projects the title of the project you wish to delete');
    if (choice === this.project.title) {
      if(this.memberType === '') {
        this.projectService.deleteProject(this.id)
          .subscribe(
            data => this.router.navigateByUrl('/'),
            err => err
          )
      } else {
        this.projectService.teamDeleteProject(this.project.Profile.id, this.id)
          .subscribe(
            data => this.router.navigateByUrl('/'),
            err => err
          )
      }  
    }
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
    if(this.memberType === '') {
      this.projectService.addTech(newTech)
        .subscribe(data => {
          this.project.Teches.push(data);
        });
    } else {
      this.projectService.teamAddTech(this.project.Profile.id, newTech)
        .subscribe(data => {
          this.project.Teches.push(data);
        });
    }
    
    this.newTech = '';
    this.editTech = !this.editTech;
  }

  deleteTech(event) {
    if(this.memberType === ''){
      this.projectService.deleteTech(event.target.id, this.project.id)
        .subscribe(data => {});
    } else {
      this.projectService.teamDeleteTech(this.project.Profile.id, event.target.id, this.project.id)
        .subscribe(data => {});
    }
    
    for(let i = 0; i < this.project.Teches.length; i++){
      if(this.project.Teches[i].id == Number(event.target.id)) {
        return this.project.Teches.splice(i, 1);
      };
    };
  }


  //Post comment and add comment to view
  postComment(){
    this.projectService.postComment({comment: this.newComment}, this.id)
      .subscribe( data => {
        data.createdAt = moment(data.createdAt).format('MMMM Do YYYY');
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
        data.forEach(comment =>{
          comment.createdAt = moment(data.createdAt).format('MMMM Do YYYY');
        })
        this.comments = data;
      })
  }

  //Image Upload function
  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.picture = data;
      this.project.Images.push(data);
      this.uploadFile = data;
    }
  }

  //Set image as project thumbnail
  updateThumbnail () {
    if (this.team) {
      let data = this.picture;
      this.projectService.setTeamThumb(this.id, this.project.Profile.id, data)
        .subscribe(
          data => data,
          err => err
        )
    } else {
      let data = this.picture;
      this.projectService.setAsThumb(this.id, data)
        .subscribe(
          data => data,
          err => err
        )
    }
  }

  //Function to make thumbnail the large image
  setMainImage (img) {
    this.picture = img;
  }

  //Delete image from database and page
  deleteImage (id) {
    if (this.team) {
      this.projectService.deleteTeamImage(id, this.id, this.project.Profile.id)
        .subscribe(
          data => {
            for (let i = 0; i < this.project.Images.length; i++) {
              let img = this.project.Images[i];
              if (img.id === id) {
                this.project.Images.splice(i, i+1)
                this.picture = this.project.Images[0] || {url: '/client/app/assets/thumbnail.png'};
                if (this.picture.url === '/client/app/assets/thumbnail.png') {
                  this.updateThumbnail();
                }
              }
            }
            },
          err => err
        )
    } else {
      this.projectService.deleteImage(id, this.id)
        .subscribe(
          data => {
            for (let i = 0; i < this.project.Images.length; i++) {
              let img = this.project.Images[i];
              if (img.id === id) {
                this.project.Images.splice(i, i+1)
                this.picture = this.project.Images[0] || {url: '/client/app/assets/thumbnail.png'};
                if (this.picture.url === '/client/app/assets/thumbnail.png') {
                  this.updateThumbnail();
                }
              }
            }
            },
          err => err
        )
    }
  }

  //Checks whether to hide certain buttons
  checkForImages() {
    return this.project.Images.length > 0
  }


  editProject(event, input, type){
    if (type !== 'progress' && type !== 'contribute') {
      event.preventDefault();
    }
    if (type === 'contribute') {
      this.determineOpenSource(this.project.contribute);
    }
    this.project[type] = input[type]

    if(this.memberType === '') {
      this.projectService.editDescription(this.id, input)
        .subscribe(
          data => this.editingProject(type),
          err => err
        )
    } else {
      this.projectService.teamEditDescription(this.project.Profile.id, this.id, input)
        .subscribe(
          data => this.editingProject(type),
          err => err
        )
    }
   
  }


  editingProject(type) {
    if (type === 'tech') {
      return this.editTech = !this.editTech;
    } else if (type === 'description') {
      this.editDescrip = !this.editDescrip;
    } else if (type === 'title') {
      this.editTitle = !this.editTitle;
    } else if (type === 'github') {
      this.editGithub = !this.editGithub
    } else if (type === 'deploy') {
      this.editDeploy = !this.editDeploy
    } else if (type === 'progress') {
      this.editProgress = !this.editProgress;
    } else if (type === 'contribute') {
      this.editSource = !this.editSource;
    }
  }
}
