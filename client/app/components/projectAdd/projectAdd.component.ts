import { Component } from '@angular/core';
import { AddProductModelDirective } from '../../directives/new-project-model.directive.js'
import { Router, ActivatedRoute } from '@angular/router';
// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ProjectAddService } from './projectAdd.services.js';


@Component({
  selector: 'project-add',
  templateUrl: './client/app/components/projectAdd/projectAdd.html',
  styleUrls: ['./client/app/components/projectAdd/projectAdd.css'],
})

export class ProjectAddComponent {
  private userInfo = localStorage.getItem('url');
  constructor(private projectService: ProjectAddService, private router: Router) {}

  addProject(data) {
    this.projectService.createProject(data)
      .subscribe(
        data => this.router.navigateByUrl('/project/' + data.id),
        err => console.log(err)
      )
  }
}
