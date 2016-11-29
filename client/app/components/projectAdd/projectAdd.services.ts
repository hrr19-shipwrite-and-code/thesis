import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectAddService {
  postProject
  constructor (private authHttp: AuthHttp, private http: Http) {}

  userCreateProject(project) {
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   const url = 'http://localhost:1337/api/project/userCreate'
   return this.authHttp.post(url, JSON.stringify(project), options)
    .map(res => res.json())
  }

  teamCreateProject(project, teamId) {
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   const url = 'http://localhost:1337/api/project/teamCreate/' + teamId
   return this.authHttp.post(url, JSON.stringify(project), options)
    .map(res => res.json())
  }

  getGithubProject(gitUsername) {
    return this.http.get('http://api.github.com/users/' + gitUsername + '/repos')
      .map(res => res.json())
  }
}