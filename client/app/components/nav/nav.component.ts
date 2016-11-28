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
  numberOfNotifications;
  name;
  picture;
  notifications;
  url;
  constructor(private auth: AuthService, private add: ProjectAddComponent, private nav: NavService) {}

  ngOnInit() {
    this.checkAgain();
    this.checkNotifications();
  }

  checkNotifications(){
    this.nav.getNotifications()
      .subscribe( data => {
        this.notifications = data;
        this.numberOfNotifications = this.notificationCount();
      })
    setInterval(() =>{
      this.checkNotifications();
    }, 300000)
  }

  notificationCount() {
    let count = 0;
    this.notifications.filter((note) => {
      if(!note.viewed) count++;
    })
    return count;
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
    let className = e.target.className.split(' ')[0];
    if (e.target.id === 'notification' && className !== 'inside') {
      this.notificationShow = !this.notificationShow;
      this.profileShow = false;
      this.nav.markAsRead()
        .subscribe( data => {
          this.checkNotifications();
        })
    } else if (e.target.id === 'profile' && className !== 'inside') {
      this.profileShow = !this.profileShow;
      this.notificationShow = false; 
    } else if (className !== 'inside') {  
      this.notificationShow = false;
      this.profileShow = false;
    }
  }
}
