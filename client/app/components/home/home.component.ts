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
  filterConditions = {};
  sortType = 'default'
  filterHidden = true;
  projects = [];
  pagination = 0;
  count;
  clearResults = false;
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.getProjects({sort: this.sortType});
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

  getProjects(filterConditions) {
    this.homeService.getProjects(filterConditions)
      .subscribe(data => {
        this.projects = [...this.projects,...data.rows]
        this.count = data.count
      })
  }

  filter(filter) {
    this.clearResults = true;
    this.projects = [];
    let filterConditions = {sort: this.sortType};
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
    this.pagination = 0;
    this.filterConditions = filterConditions;
    this.getProjects(filterConditions);
  }

  clearSearch(e) {
    document.getElementById("home-search").reset()
    if (this.clearResults || this.pagination > 0) {
      this.projects = [];
      this.filterConditions = {sort: 'default'};
      this.pagination = 0;
      this.getProjects(this.filterConditions)
      this.clearResults = false;
    }
  }

  sort(sortType) {
    this.projects = [];
    this.sortType = sortType;
    this.pagination = 0;
    this.filterConditions.offset = 0;
    this.filterConditions.sort = sortType;
    this.getProjects(this.filterConditions);
  }

  loadMore() {
    this.pagination++;
    this.filterConditions.offset = this.pagination*12;
    this.getProjects(this.filterConditions);
  }

}
