import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProjectAddComponent }   from '../projectAdd/projectAdd.component.js';
import { HttpModule, JsonpModule } from '@angular/http';

@Component({
  selector: 'nav',
  templateUrl: './client/app/components/nav/nav.html',
  styleUrls: ['./client/app/components/nav/nav.css'],
  providers: [AuthService, ProjectAddComponent]
})

export class NavComponent {
  constructor(private auth: AuthService, private add: ProjectAddComponent) {}
  name;
  picture;
  url;

  ngOnInit() {
    this.checkAgain()
  }

  checkAgain() {
    if (localStorage.getItem('name') === null) {
      let that = this;
      setTimeout(function() {
        that.checkAgain()
      }, 600);
    } else {
      this.name = localStorage.getItem('name');
      this.picture = localStorage.getItem('picture');
    }
  }
}
