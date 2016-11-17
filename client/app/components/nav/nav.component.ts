import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProjectAddComponent }   from '../projectAdd/projectAdd.component.js';

@Component({
  selector: 'nav',
  templateUrl: './client/app/components/nav/nav.html',
  styleUrls: ['./client/app/components/nav/nav.css'],
  providers: [AuthService, ProjectAddComponent]
})

export class NavComponent {
  constructor(private auth: AuthService, private add: ProjectAddComponent) {}

  url;
}
