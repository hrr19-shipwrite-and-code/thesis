import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from '../home/home.component.js';
import {ProfileComponent} from '../profile/profile.component.js';



@Component({
  selector: 'nav',
  templateUrl: './client/app/components/nav/nav.html',
  directives: [ROUTER_DIRECTIVES]
})
// @RouteConfig([
//   {path: '/', name: 'Home', component: HomeComponent},
//   {path: '/', name: 'Profile', component: ProfileComponent}  
// ])

export class NavComponent { }