import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { NavComponent } from '../nav/nav.component.js';

import { ProfileComponent } from '../profile/profile.component.js';
import { ProjectComponent } from '../project/project.component.js';
import { BrowseComponent } from '../browse/browse.component.js';
import { AppComponent }   from './app.component.js';
import { HomeComponent }   from '../home/home.component.js';

import { ProjectThumbnailComponent } from '../projectThumbnail/project-thumbnail.component.js';

import { HoverDirective } from '../../directives/thumbnail-hover.directive.js';
import { TechHoverDirective } from '../../directives/tech-hover.directive.js';



@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule
    ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ProfileComponent,
    ProjectComponent,
    BrowseComponent,

    ProjectThumbnailComponent,

    HoverDirective,
    TechHoverDirective
    ],
  bootstrap:    [ AppComponent ],
  providers: [
    AUTH_PROVIDERS
  ]
})

export class AppModule { }
