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
  private urlTaken = false;
  private tempUrl: string;
  private editing = {
    basic: false,
    tech: false,
    contact: false,
    picture: false
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
  admin = false;

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

  teamAuthCheck(teamId) {
    this.profileService.teamAuthCheck(teamId)
      .subscribe(data => {
        this.admin = true;
      }, err => {
        this.admin = false;
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
          this.teamAuthCheck(data.id);
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
            this.router.navigateByUrl('/profile/' + input.url)
          } else {
            this.editForm(type)
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
              this.router.navigateByUrl('/profile/' + input.url)
            } else {
              this.editForm(type)
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
      this.profileService.addTech(newTech)
        .subscribe(data => {
          this.profileInfo.Teches.push(data);
        });
    this.newTech = '';
    this.editing.tech = !this.editing.tech;
  }

  deleteTech(event, id) {
    console.log(id);
    this.profileService.deleteTech(id)
      .subscribe(data => {});
    for(let i = 0; i < this.profileInfo.Teches.length; i++){
      if(this.profileInfo.Teches[i].id == Number(id)) {
        return this.profileInfo.Teches.splice(i, 1);
      };
    };
  }

  //Image Upload function
  handleUpload(data): void {
    if (data && data.response) {
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


}
