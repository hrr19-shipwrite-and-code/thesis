import { OnInit, Component, NgZone } from '@angular/core';
import { CreateTeamService } from './createTeam.services.js';
import { Router } from '@angular/router';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { AuthService } from '../auth/auth.service.js';


@Component({
  selector: 'createTeam',
  templateUrl: './client/app/components/createTeam/createTeam.html',
  styleUrls: ['./client/app/components/createTeam/createTeam.css'],
  providers: [CreateTeamService, AuthService]
})

export class CreateTeamComponent implements OnInit{

  location = '';
  name = '';
  notValidEmail = false;
  urlTaken = false;
  urlInvalid = false;

  constructor(private createTeamService: CreateTeamService, private router: Router, private mapsAPILoader: MapsAPILoader, private zone: NgZone, private auth: AuthService) {}

  ngOnInit() {
    this.isAuth();
    this.mapsAPILoader.load().then(() => {
      let input = document.getElementById('location')
      let autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
      });
      autocomplete.addListener("place_changed", () => {
        this.zone.run(() => {
          this.location = autocomplete.getPlace().formatted_address
        });
      });
    });

  }

  isAuth() {
    if (!this.auth.authenticated()) {
      this.router.navigateByUrl('/');
    }
  }

  trimmer() {
    this.name = this.name.trim();
  }

  checkUrl(e) {
    const url = e.target.value
    if(!/^[a-zA-Z0-9_-]{1,30}$/.test(url) && url.length > 0){
      return this.urlInvalid = true;
    }
    this.urlInvalid = false;

    this.createTeamService.checkUrl(url)
      .subscribe(
        data => { this.urlTaken = false }, 
        err => { this.urlTaken = true }
      )
  }

  checkEmail(e) {
    let email = e.target.value
    if(!validator.isEmail(email) && email.length > 0){
      return this.notValidEmail = true;
    }
    this.notValidEmail = false;
  }

  createTeam(teamInfo) {
    if(!this.urlTaken && !this.notValidEmail && this.name !== ''){
      this.notValidEmail = false;
      this.createTeamService.createTeam(teamInfo)
        .subscribe( data => {
          this.router.navigateByUrl('/' + teamInfo.url);
         });
    }
    
  }
}
