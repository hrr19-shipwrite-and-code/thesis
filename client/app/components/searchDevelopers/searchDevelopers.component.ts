import { OnInit, Component, NgZone } from '@angular/core';
import { ProfilePreviewComponent } from '../profilePreview/profilePreview.component.js';
import { SearchDevelopersServices } from './searchDevelopers.services.js';
import { MapsAPILoader } from 'angular2-google-maps/core';



@Component({
  selector: 'searchDevelopers',
  templateUrl: './client/app/components/searchDevelopers/searchDevelopers.html',
  styleUrls: ['./client/app/components/searchDevelopers/searchDevelopers.css'],
  providers: [SearchDevelopersServices]
})

export class SearchDevelopersComponent implements OnInit{
  users;
  location;
  constructor(private searchDevelopersServices: SearchDevelopersServices, private mapsAPILoader: MapsAPILoader, private zone: NgZone) {}

  ngOnInit() {
    this.getAllUsers({});

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

  getAllUsers(filter) {
    let filterConditions = {}
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

    this.searchDevelopersServices.getAllUsers(filterConditions)
      .subscribe(data => {
        console.log(data);
        this.users = data;
      })
  }
}
