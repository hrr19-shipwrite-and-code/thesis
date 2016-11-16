import { Component } from '@angular/core';
import { AddProductModelDirective } from '../../directives/new-project-model.directive.js'
// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ProjectAddService } from './projectAdd.services.js';


@Component({
  selector: 'project-add',
  templateUrl: './client/app/components/projectAdd/projectAdd.html'
})

export class ProjectAddComponent {
  constructor(private post: ProjectAddService) {

  }

  addProject(data) {
    this.post.postProject(data)
  }
}
