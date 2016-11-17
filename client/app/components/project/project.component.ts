import {Component} from '@angular/core';
import { ProjectService } from './project.services.js';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'project',
  templateUrl: './client/app/components/project/project.html',
  styleUrls: ['./client/app/components/project/project.css'],
  providers: [ProjectService]
})

export class ProjectComponent {
  project: Object;
  private sub: any;
  id: String;
  error: Boolean;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  //Runs this function everytime route accessed
  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    //Uncomment below for Dummy Data
    //this.project = this.projectService.getProject(this.id)
    //Uncomment below Actual API Call
    this.getProject(this.id);
  }

  //Service function to get the project by the route params Id
  getProject(id) {
    this.projectService.getProject(id)
    .subscribe(
      data => this.project = data,
      err => this.error = true
    )
  }

  likeProject(id) {
    this.project.likes++;
    this.projectService.likeProject(id)
  }

}
