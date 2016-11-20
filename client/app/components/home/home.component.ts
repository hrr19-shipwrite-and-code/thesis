import { Component } from '@angular/core';
import { HomeService } from './home.services.js';
import { HoverDirective } from '../../directives/thumbnail-hover.directive.js';

import { ProjectThumbnailComponent } from '../projectThumbnail/project-thumbnail.component.js';

@Component({
  selector: 'home',
  templateUrl: './client/app/components/home/home.html',
  styleUrls: ['./client/app/components/home/home.css'],
  providers: [HomeService]
})

export class HomeComponent {
  filterHidden = true;
  projects;
  constructor(private homeService: HomeService) {
    //this.projects = homeService.getProjects();
  }

  ngOnInit() {
    this.homeService.getProjects()
      .subscribe(
        data => this.projects = data,
        error => alert(error)
      )
  }

  filterBar() {
    if(this.filterHidden) {
      document.getElementById('filter-bar').className = 'filter-bar';
      this.filterHidden = !this.filterHidden
    } else {
      document.getElementById('filter-bar').className = 'filter-bar filter-bar-hide';      
      this.filterHidden = !this.filterHidden      
    }
  }

  filter(e, filter) {
    e.preventDefault()
    let filterConditions = {}
    for(let key in filter) {
      if(filter[key]) {
        if(key === 'tech'){
          filterConditions[key] = filter[key].split(',');
          for(let i = 0; i < filterConditions[key].length; i++) {
            filterConditions[key][i] = filterConditions[key][i].trim();
          }
        } else {
          filterConditions[key] = filter[key];
        }
      }
    }
    this.homeService.filter(filterConditions);
  }

  sort(sortType) {
    this.homeService.sortBy(sortType);
  }

}
