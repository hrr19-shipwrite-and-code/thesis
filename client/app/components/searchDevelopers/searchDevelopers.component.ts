import { Component } from '@angular/core';
import { ProfilePreviewComponent } from '../profilePreview/profilePreview.component.js';
import { SearchDevelopersServices } from './searchDevelopers.services.js';



@Component({
  selector: 'searchDevelopers',
  templateUrl: './client/app/components/searchDevelopers/searchDevelopers.html',
  styleUrls: ['./client/app/components/searchDevelopers/searchDevelopers.css'],
  providers: [SearchDevelopersServices]
})

export class SearchDevelopersComponent {
  users;
  constructor(private searchDevelopersServices: SearchDevelopersServices) {
    this.getAllUsers({});
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
