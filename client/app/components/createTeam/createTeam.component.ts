import { OnInit, Component, NgZone } from '@angular/core';
import { CreateTeamService } from './createTeam.services.js';
import { Router } from '@angular/router';
import { MapsAPILoader } from 'angular2-google-maps/core';


@Component({
  selector: 'createTeam',
  templateUrl: './client/app/components/createTeam/createTeam.html',
  styleUrls: ['./client/app/components/createTeam/createTeam.css'],
  providers: [CreateTeamService]
})

export class CreateTeamComponent implements OnInit{

  location = '';
  name = '';
  notValidEmail = false;
  urlTaken = false;

  constructor(private createTeamService: CreateTeamService, private router: Router, private mapsAPILoader: MapsAPILoader, private zone: NgZone) {}

  ngOnInit() {

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

  trimmer() {
    this.name = this.name.trim();
  }

  checkUrl(e) {
    this.createTeamService.checkUrl(e.target.value)
      .subscribe(
        data => { this.urlTaken = false }, 
        err => { this.urlTaken = true }
      )
  }

  checkEmail(e) {
    if(!validator.isEmail(e.target.value)){
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
