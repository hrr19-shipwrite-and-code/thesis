import {Component} from 'angular2/core';
import {HomeComponent} from '../home/home.component.js';

@Component({
  selector: 'sushi',
  template: '<home></home>',
  directives: [HomeComponent]
})
export class AppComponent { }