import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-thumbnail',
  templateUrl: './client/app/components/projectThumbnail/project-thumbnail.html',
  styleUrls: ['./client/app/components/projectThumbnail/projectThumbnail.css'],
})

export class ProjectThumbnailComponent {
  @Input() projects
  @Input() owner
  momentize(date) {
    return moment(date).format('MMMM Do YYYY');
  }
}
