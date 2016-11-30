import { OnInit, Component, NgZone } from '@angular/core';
import { ProfilePreviewComponent } from '../profilePreview/profilePreview.component.js';
import { SearchDevelopersServices } from './searchDevelopers.services.js';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'searchDevelopers',
  templateUrl: './client/app/components/searchDevelopers/searchDevelopers.html',
  styleUrls: ['./client/app/components/searchDevelopers/searchDevelopers.css'],
  providers: [SearchDevelopersServices]
})

export class SearchDevelopersComponent implements OnInit{
  users;
  location;
  tech;
  hire = false;
  name;
  type;
  currentPage = 1;
  count;
  page = [];
  filterConditions = {};
  constructor(private searchDevelopersServices: SearchDevelopersServices, private mapsAPILoader: MapsAPILoader, private zone: NgZone, private router: Router, private loc: Location) {}

  ngOnInit() {
    let split = this.router.url.split('?');
    let url = split[0];
    let search = split[1] ? split[1].split('&') : [];
    for(let i = 0; i < search.length; i++){
      let filter = search[i].split('=');
      if(filter[0] === 'tech' || filter[0] === 'location') {
        filter[1] = filter[1].split('%2C').join(', ');
      }
      filter[0] !== 'users' ? this[filter[0]] = filter[1] : false;
    }

    this.type = url === '/teams' ? 'Team' : 'Member';

    this.getAllProfiles({location: this.location, tech: this.tech, hire: this.hire, name: this.name});

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
    let filterConditions = this.currentPage != 1 ? {offset: (this.currentPage-1)*6} : {};
    for(let key in filter) {
      if(filter[key]) {
        if(key === 'tech' || key === 'location'){
          let techList = filter[key].split(',');
          filterConditions[key] = techList;
          for(let i = 0; i < filterConditions[key].length; i++) {
            filterConditions[key][i] = filterConditions[key][i].trim();
          }
        } else {
          filterConditions[key] = filter[key];
        }
      }
    }

    let path = this.type === 'Member' ? '/developers' : '/teams'
    this.router.navigate([path],{ queryParams: filterConditions})
    this.filterConditions = filterConditions
    filterConditions.type = this.type;

    this.searchDevelopersServices.getAllProfiles(filterConditions)
      .subscribe(data => {
        this.users = data.rows;
        this.count = data.count;
        this.page = data.count/6 >= 5 ? Array(5).fill().map((x,i)=>i+1) : Array(Math.ceil(data.count/6)).fill().map((x,i)=>i+1);
      })
  }

  clearSearch() {
    document.getElementById('search-form').reset();
    this.getAllProfiles();
  }

  selectPage(page) {
    this.currentPage = page;
    let path = this.type === 'Member' ? '/developers' : '/teams'
    this.filterConditions.offset = (page-1)*6;
    this.router.navigate([path],{ queryParams: this.filterConditions});
    this.getAllProfiles();
    window.scrollTo(0,0)
  }
}
