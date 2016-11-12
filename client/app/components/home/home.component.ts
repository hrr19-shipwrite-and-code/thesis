import {Component} from 'angular2/core';
import {HomeService} from './home.services.js';

@Component({
  selector: 'home',
  templateUrl: './client/app/components/home/home.html',
  providers: [HomeService]
})

export class HomeComponent {
  projects;
  constructor(homeService: HomeService){
    this.projects = homeService.getProjects();
  }

  over(){
    console.log("Mouseover called");
  }
}