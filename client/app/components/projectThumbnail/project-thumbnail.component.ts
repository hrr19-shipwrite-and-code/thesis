import {Component, Input} from '@angular/core';

@Component({
  selector: 'project-thumbnail',
  templateUrl: './client/app/components/projectThumbnail/project-thumbnail.html'
})

export class ProjectThumbnailComponent {
  @Input() projects
}