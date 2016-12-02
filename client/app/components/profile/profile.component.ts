import { Component, NgZone } from '@angular/core';
import { ProfileService } from './profile.services.js';
import { ProjectService } from '../project/project.services.js';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'profile',
  templateUrl: './client/app/components/profile/profile.html',
  styleUrls: ['./client/app/components/profile/profile.css'],
  providers: [ProfileService, ProjectService],
})

export class ProfileComponent {
  private projects;
  private clientId = localStorage.getItem('url');
  private profileInfo = {Teches: [], Team: [], Member: []};
  private newTech = '';
  private newMember = '';
  private urlTaken = false;
  private tempUrl: string;
  private errAddMember = false;
  private invalidUrl = false;
  private editing = {
    basic: false,
    tech: false,
    contact: false,
    picture: false,
    member: false
  };
  private options: Object = {
    url: 'http://localhost:1337/api/user/addPicture',
    filterExtensions: true,
    allowedExtensions: ['image/png', 'image/jpeg', 'image/jpg'],
    calculateSpeed: true,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: 'Bearer'
  };
  techs = [];
  memberType = '';

  constructor(private projectService: ProjectService, private profileService: ProfileService, private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader, private zone: NgZone, private router: Router) {}

  ngOnInit() {
    window.scrollTo(0,0)
    this.getUserInfo();
    this.getTechs();
  }

  googleLocation() {
    this.mapsAPILoader.load().then(() => {
      let input = document.getElementById('location')
      let autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
      });
      autocomplete.addListener("place_changed", () => {
        this.zone.run(() => {
          this.profileInfo.location = autocomplete.getPlace().formatted_address
        });
      });
    });
  }

  getUserInfo() {
    this.route.params.subscribe((params) => {
      this.profileService.getProfileInfo(params['id'])
        .subscribe( data => {
          if (data === null) {
            this.router.navigateByUrl('/notfound');
          };
          this.profileInfo = data;
          this.profileInfo.createdAt = moment(this.profileInfo.createdAt).format('MMMM Do YYYY')
          this.profileInfo.picture = this.profileInfo.picture + '?dummy=' + Date.now();
          this.getUserProjects(data.id);
          this.tempUrl = data.url;
          if(data.type === 'Team'){
            this.options.url = 'http://localhost:1337/api/team/addPicture/' + this.profileInfo.id;
            for(let member of this.profileInfo.Member) {
              if(member.url === this.clientId){
                return this.memberType = member.TeamUsers.type;
              }
            }
          } else {
            this.memberType = '';
          }
        },
        err => this.router.navigateByUrl('/notfound')
        )
    });
  }

  getUserProjects(userId) {
    this.profileService.getProjects(userId)
      .subscribe( data => {
        this.projects = data;
      });
  }

  isCurrentUser() {
    return this.profileInfo.url === this.clientId;
  }

  trimmer() {
    this.profileInfo.name = this.profileInfo.name.trim();
  }

  checkUrl(input, type) {
    let options = {require_protocol: true};
    for(let url in input){
      //console.log(input[url])
      if(input[url] && !validator.isURL(input[url], options)){
        return this.invalidUrl = true;
      }
    }
    this.invalidUrl = false;
    this.updateUserInfo(input, type);
  }

  updateUserInfo(input, type) {
    if (input.url === this.profileInfo.url) {
      return;
    }
    if(this.profileInfo.type === 'Team'){
      return this.profileService.updateTeamProfile(this.profileInfo.id, input)
        .subscribe(data => {
          if (type === 'url') {
            this.urlTaken = false;
            this.router.navigateByUrl('/' + input.url);
          } else {
            this.editForm(type);
          }
        },
        err => {
          if (type === 'url') {
            this.urlTaken = true;
          }
        })
    } else {
      if (type === 'basic') {
        localStorage.setItem('name', input.name);
      }
      return this.profileService.updateUserProfile(input)
        .subscribe(
          data => {
            if (type === 'url') {
              localStorage.setItem('url', input.url);
              this.clientId = localStorage.getItem('url');
              this.urlTaken = false;
              this.router.navigateByUrl('/' + input.url);
            } else {
              this.editForm(type);
            }
          },
          err => {
            if (type === 'url') {
              this.urlTaken = true;
            }}
        )
    }
    
  }

  editForm(key) {
    this.editing[key] = !this.editing[key];
  }

  //Tech function
  getTechs() {
    this.projectService.getTech()
      .subscribe( data => {
        this.techs = data;
      })
  }

  addTech() {
    for (let value of this.profileInfo.Teches){
      if(value.name === this.newTech) {
        return this.newTech = '';
      }
    }
    let newTech = { name: this.newTech };
    if(this.profileInfo.type === 'Team') {
      this.profileService.teamAddTech(this.profileInfo.id, newTech)
        .subscribe(data => {
          this.profileInfo.Teches.push(data);
        });
    } else {
      this.profileService.userAddTech(newTech)
        .subscribe(data => {
          this.profileInfo.Teches.push(data);
        });
    }
    
    this.newTech = '';
  }

  deleteTech(event, techId) {
    if(this.profileInfo.type === 'Team') {
      this.profileService.teamDeleteTech(this.profileInfo.id, techId)
        .subscribe(data => {});
    } else {
      this.profileService.userDeleteTech(techId)
        .subscribe(data => {});
    }
    
    for(let i = 0; i < this.profileInfo.Teches.length; i++){
      if(this.profileInfo.Teches[i].id == Number(techId)) {
        return this.profileInfo.Teches.splice(i, 1);
      };
    };
  }

  //Image Upload function
  handleUpload(data): void {
    if (data && data.response && this.profileInfo.type === 'Member') {
      data = JSON.parse(data.response);
      localStorage.setItem("picture", data.picture + '?dummy=' + Date.now());
    }
  }

  handleChange(input) {
    let img = document.createElement("img");
    img.src = window.URL.createObjectURL(input.files[0]);
    const reader = new FileReader();
    const that = this;
    reader.addEventListener("load", (event) => {
      that.profileInfo.picture = event.target.result;
    }, false);
    reader.readAsDataURL(input.files[0]);
  }

  //Manage Team function
  deleteTeam() {
    let choice = prompt('Enter the name of the team you wish to delete');
    if (choice === this.profileInfo.name) {
      this.profileService.deleteTeam(this.profileInfo.id)
        .subscribe(data => {
          this.router.navigateByUrl('/' + this.clientId)
        });
    }
  }

  joinTeam() {
    let response = confirm("Are you sure you want to join " + this.profileInfo.name + "?");
    if(response){
      this.profileService.joinTeam(this.profileInfo.id)
        .subscribe(data => {
          data.TeamUsers = {type: 'Member'}
          this.memberType = 'Member';
          this.profileInfo.Member.push(data);
        });
    }
  }

  leaveTeam() {
    let response = confirm("Are you sure you want to leave " + this.profileInfo.name + "?");
    if(response){
      this.profileService.leaveTeam(this.profileInfo.id)
        .subscribe(data => {
          this.memberType = '';
          for(let i = 0; i < this.profileInfo.Member.length; i++){
            if(this.profileInfo.Member[i].url === this.clientId){
              return this.profileInfo.Member.splice(i, 1);
            }
          }
        });
    }
  }

  addMember() {
    this.profileService.addMember(this.profileInfo.id, this.newMember)
      .subscribe(
        data => {
          data.TeamUsers = {type: 'Pending'}
          this.profileInfo.Member.push(data);
          this.newMember = '';
          this.editing.member = !this.editing.member;
          this.errAddMember= false;
        },
        err => this.errAddMember = true
      );
  }

  removeMember(userId, name) {
    let response = confirm("Are you sure you want to remove " + name + " from " + this.profileInfo.name + "?");
    if(response){
      this.profileService.removeMember(this.profileInfo.id, userId)
        .subscribe(data => {
          for(let i = 0; i < this.profileInfo.Member.length; i++){
            if(this.profileInfo.Member[i].id === userId){
              return this.profileInfo.Member.splice(i, 1);
            }
          }
        });
    }
  }

  promoteMember(member) {
    let response = confirm("Are you sure you want to promote " + member.name + " to admin?");
    if(response){
      this.profileService.promoteMember(this.profileInfo.id, member.id)
        .subscribe(data => {
          let index = this.profileInfo.Member.indexOf(member);
          this.profileInfo.Member[index].TeamUsers.type = 'Admin';
        })
    }  
  }

  demoteMember(member) {
    let response = confirm("Are you sure you want to demote " + member.name + " to member?");
    if(response){
      this.profileService.demoteMember(this.profileInfo.id, member.id)
        .subscribe(data => {
          let index = this.profileInfo.Member.indexOf(member);
          this.profileInfo.Member[index].TeamUsers.type = 'Member';
        })
    }  
  }
}
