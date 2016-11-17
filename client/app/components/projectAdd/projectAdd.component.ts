import { Component } from '@angular/core';
import { AddProductModelDirective } from '../../directives/new-project-model.directive.js'
import { Router, ActivatedRoute } from '@angular/router';
// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ProjectAddService } from './projectAdd.services.js';


@Component({
  selector: 'project-add',
  templateUrl: './client/app/components/projectAdd/projectAdd.html'
})

export class ProjectAddComponent {
  constructor(private post: ProjectAddService, private router: Router) {

  }

  addProject(data) {
    this.post.postProject(data, this.edit)
  }

  edit(data) {
    // this.router.navigate("/");
  }
}
