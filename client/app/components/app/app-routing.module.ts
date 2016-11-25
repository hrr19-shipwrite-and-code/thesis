import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from '../profile/profile.component.js';
import { CreateTeamComponent } from '../createTeam/createTeam.component.js';
import { ProjectComponent } from '../project/project.component.js';
import { BrowseComponent } from '../browse/browse.component.js';
import { AppComponent }   from './app.component.js';
import { HomeComponent }   from '../home/home.component.js';
import { ProjectAddComponent }   from '../projectAdd/projectAdd.component.js';
import { SearchDevelopersComponent }   from '../SearchDevelopers/SearchDevelopers.component.js';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'addproject', component: ProjectAddComponent},
  { path: 'project/:id', component: ProjectComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'createteam', component: CreateTeamComponent },
  { path: 'developers', component: SearchDevelopersComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
