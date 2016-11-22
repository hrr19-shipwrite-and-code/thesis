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
  private tempURL: string;
  private editing = {
    basic: false,
    tech: false,
    contact: false
  };
  techs = [];

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
        this.profileInfo = data;
        this.profileInfo.createdAt = moment(this.profileInfo.createdAt).format('MMMM Do YYYY')
        this.getUserProjects(data.id);
        this.tempUrl = data.url;
        console.log(this.profileInfo);
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
    if (type === 'basic') {
      localStorage.setItem('name', input.name);
    }
    if (input.url === this.clientId) {
      return;
    }
    return this.profileService.updateUserProfile(input)
      .subscribe(
        data => {
          if (type === 'url') {
            localStorage.setItem('url', input.url);
            this.clientId = localStorage.getItem('url');
            this.urlTaken = false;
            this.router.navigateByUrl('/profile/' + input.url)
            this.editForm('basic')
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


}
