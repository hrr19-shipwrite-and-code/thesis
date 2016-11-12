import {Component} from 'angular2/core';
import {HomeService} from './home.services';

@Component({
  selector: 'home',
  templateUrl: './client/app/components/home/home.html'
})

export class HomeComponent {
  projects;
  constructor(homeService: HomeService){
    this.projects = homeService.getProjects();
  }
}