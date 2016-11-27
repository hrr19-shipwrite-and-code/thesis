import { OnInit, Component, NgZone } from '@angular/core';
import { ProfilePreviewComponent } from '../profilePreview/profilePreview.component.js';
import { SearchDevelopersServices } from './searchDevelopers.services.js';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router } from '@angular/router';



@Component({
  selector: 'searchDevelopers',
  templateUrl: './client/app/components/searchDevelopers/searchDevelopers.html',
  styleUrls: ['./client/app/components/searchDevelopers/searchDevelopers.css'],
  providers: [SearchDevelopersServices]
})

export class SearchDevelopersComponent implements OnInit{
  users;
  location;
  type;
  constructor(private searchDevelopersServices: SearchDevelopersServices, private mapsAPILoader: MapsAPILoader, private zone: NgZone, private router: Router) {}

  ngOnInit() {
    this.type = this.router.url === '/teams' ? 'Team' : 'Member';

    this.getAllProfiles({type: this.type});

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

  getAllProfiles(filter) {
    let filterConditions = {type: this.type}
    for(let key in filter) {
      if(filter[key]) {
        if(key === 'tech' || key === 'location'){
          filterConditions[key] = filter[key].split(',');
          for(let i = 0; i < filterConditions[key].length; i++) {
            filterConditions[key][i] = filterConditions[key][i].trim();
          }
        } else {
          filterConditions[key] = filter[key];
        }
      }
    }

    this.searchDevelopersServices.getAllProfiles(filterConditions)
      .subscribe(data => {
        this.users = data;
      })
  }
}
