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
    this.getUserInfo();
    this.getTechs();
  }

  getTechs() {
    this.projectService.getTech()
      .subscribe( data => {
        this.techs = data;
      })
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
        console.log(data);
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
      });
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

  updateUserInfo(event, input, type) {
    if (input.url === this.profileInfo.url) {
      return;
    }
    if(this.profileInfo.type === 'Team'){
      return this.profileService.updateTeamProfile(this.profileInfo.id, input)
        .subscribe(data => {
          if (type === 'url') {
            this.urlTaken = false;
            this.router.navigateByUrl('/profile/' + input.url);
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
              this.router.navigateByUrl('/profile/' + input.url);
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
    this.editing.tech = !this.editing.tech;
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
          this.router.navigateByUrl('/profile/' + this.clientId)
        });
    }
  }

  addMember() {
    this.profileService.addMember(this.profileInfo.id, this.newMember)
      .subscribe(data => {
        data.TeamUsers = {type: 'Pending'}
        this.profileInfo.Member.push(data);
        this.newMember = '';
        this.editing.member = !this.editing.member;
      });
  }

  removeMember(userId, name) {
    let response = confirm("Are you sure you want to remove " + name + " from " + this.profileInfo.name);
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
}
