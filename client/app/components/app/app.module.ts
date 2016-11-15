import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { NavModule } from '../nav/nav.module';
import { NavComponent } from '../nav/nav.component.js';

import { ProfileComponent } from '../profile/profile.component.js';
import { BrowseComponent } from '../browse/browse.component.js';
import { AppComponent }   from './app.component.js';
import { HomeComponent }   from '../home/home.component.js';

import { ProjectThumbnailComponent } from '../projectThumbnail/project-thumbnail.component.js';

import { HoverDirective } from '../../directives/thumbnail-hover.directive.js';
import { TechHoverDirective } from '../../directives/tech-hover.directive.js';



@NgModule({
  imports:      [ 
    BrowserModule, 
    AppRoutingModule
    ],
  declarations: [ 
    AppComponent, 
    HomeComponent,
    NavComponent,
    ProfileComponent,
    BrowseComponent,

    ProjectThumbnailComponent,

    HoverDirective,
    TechHoverDirective
    ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
