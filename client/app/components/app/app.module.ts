import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader/ng2-uploader';
import { AgmCoreModule } from "angular2-google-maps/core";

import { NavComponent } from '../nav/nav.component.js';

import { ProfileComponent } from '../profile/profile.component.js';
import { CreateTeamComponent } from '../createTeam/createTeam.component.js';
import { ProjectComponent } from '../project/project.component.js';
import { BrowseComponent } from '../browse/browse.component.js';
import { AppComponent }   from './app.component.js';
import { HomeComponent }   from '../home/home.component.js';
import { ProjectAddComponent }   from '../projectAdd/projectAdd.component.js';
import { SearchDevelopersComponent }   from '../SearchDevelopers/SearchDevelopers.component.js';
import { ProfilePreviewComponent } from '../profilePreview/profilePreview.component.js';

import { ProjectThumbnailComponent } from '../projectThumbnail/project-thumbnail.component.js';

import { HoverDirective } from '../../directives/thumbnail-hover.directive.js';
import { DropdownDirective } from '../../directives/dropdown.directive.js';
import { TechHoverDirective } from '../../directives/tech-hover.directive.js';
import { AddProductModelDirective } from '../../directives/new-project-model.directive.js';

import { ProjectAddService } from '../projectAdd/projectAdd.services.js';
import { ProfileService } from '../profile/profile.services.js';


@NgModule({
  imports:      [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD9i3fvxLG9D3xsPzt3k8WnB2s1qxZiqM0",
      libraries: ["places"]
    }),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    Ng2UploaderModule
    ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ProfileComponent,
    CreateTeamComponent,
    ProjectComponent,
    BrowseComponent,
    ProjectAddComponent,
    SearchDevelopersComponent,
    ProfilePreviewComponent,
    ProjectThumbnailComponent,
    HoverDirective,
    TechHoverDirective,
    AddProductModelDirective,
    DropdownDirective
    ],
  bootstrap:    [ AppComponent ],
  providers: [
    AUTH_PROVIDERS,
    ProjectAddService,
    ProfileService
  ]
})

export class AppModule { }
