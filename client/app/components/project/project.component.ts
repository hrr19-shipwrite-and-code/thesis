import {Component} from '@angular/core';


@Component({
  selector: 'project',
  templateUrl: './client/app/components/project/project.html',
  styleUrls: ['./client/app/components/project/project.css'],
})

export class ProjectComponent {
  title = 'Working Title'
  date = '11-13-2016'
  user = 'User Name'
  likes = 5
  views = 3
}
