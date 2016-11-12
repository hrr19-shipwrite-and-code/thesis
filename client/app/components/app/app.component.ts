import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {NavComponent} from '../nav/nav.component.js';

import {HomeComponent} from '../home/home.component.js';
import {ProfileComponent} from '../profile/profile.component.js';

@Component({
  selector: 'sushi',
  templateUrl: './client/app/components/app/app.html',
  directives: [NavComponent, HomeComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/', name: 'Home', component: HomeComponent},
  {path: '/profile', name: 'Profile', component: ProfileComponent}
])

export class AppComponent { }
