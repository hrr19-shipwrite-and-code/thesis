import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';

import { NavComponent } from '../nav/nav.component.js';

import { ProfileComponent } from '../profile/profile.component.js';
import { BrowseComponent } from '../browse/browse.component.js';
import { AppComponent }   from './app.component.js';
import { HomeComponent }   from '../home/home.component.js';
import { ProjectAddComponent }   from '../projectAdd/projectAdd.component.js';

import { ProjectThumbnailComponent } from '../projectThumbnail/project-thumbnail.component.js';

import { HoverDirective } from '../../directives/thumbnail-hover.directive.js';
import { TechHoverDirective } from '../../directives/tech-hover.directive.js';
import { AddProductModelDirective } from '../../directives/new-project-model.directive.js';

import { ProjectAddService } from '../projectAdd/projectAdd.services.js';


@NgModule({
  imports:      [ 
    BrowserModule, 
    AppRoutingModule,
    FormsModule
    ],
  declarations: [ 
    AppComponent, 
    HomeComponent,
    NavComponent,
    ProfileComponent,
    BrowseComponent,
    ProjectAddComponent,

    ProjectThumbnailComponent,

    HoverDirective,
    TechHoverDirective,
    AddProductModelDirective
    ],
  bootstrap:    [ AppComponent ],
  providers: [
    AUTH_PROVIDERS,
    ProjectAddService
  ]
})

export class AppModule { }
