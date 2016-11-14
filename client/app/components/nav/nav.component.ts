import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from '../home/home.component.js';
import {ProfileComponent} from '../profile/profile.component.js';



@Component({
  selector: 'nav',
  templateUrl: './client/app/components/nav/nav.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['./client/app/components/nav/nav.css']
})

export class NavComponent { }
