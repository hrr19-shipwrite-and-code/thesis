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
    this.getAllUsers();
  }

  getAllUsers() {
    this.searchDevelopersServices.getAllUsers({})
      .subscribe(data => {
        console.log(data);
        this.users = data;
      })
  }
}
