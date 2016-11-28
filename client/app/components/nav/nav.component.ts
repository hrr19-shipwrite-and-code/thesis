import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavService } from './nav.services';
import { ProjectAddComponent }   from '../projectAdd/projectAdd.component.js';
import { HttpModule, JsonpModule } from '@angular/http';

@Component({
  selector: 'nav',
  templateUrl: './client/app/components/nav/nav.html',
  styleUrls: ['./client/app/components/nav/nav.css'],
  providers: [AuthService, ProjectAddComponent, NavService],
  host: {
    '(window:click)': 'handleClick($event)'
  }
})

export class NavComponent {
  notificationShow = false;
  profileShow = false;
  name;
  picture;
  notifications;
  url;
  constructor(private auth: AuthService, private add: ProjectAddComponent, private nav: NavService) {}

  ngOnInit() {
    this.checkAgain()
    this.notifications = this.nav.getNotifications()
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

  handleClick(e) {
    if (e.target.id === 'notification') {
      this.notificationShow = !this.notificationShow;
      this.profileShow = false;
    } else if (e.target.id === 'profile') {
      this.profileShow = !this.profileShow;
      this.notificationShow = false; 
    } else {  
      this.notificationShow = false;
      this.profileShow = false;
    }
  }
}
