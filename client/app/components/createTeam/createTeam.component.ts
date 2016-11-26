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

  createTeam(teamInfo) {
    console.log(teamInfo)
    this.createTeamService.createTeam(teamInfo)
      .subscribe( data => {
        this.router.navigateByUrl('/' + teamInfo.url);
       });
  }
}
