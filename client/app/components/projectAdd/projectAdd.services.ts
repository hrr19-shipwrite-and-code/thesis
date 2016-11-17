import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectAddService {
  postProject
  constructor (private authHttp: AuthHttp) {}

  createProject(project) {
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   const url = 'http://localhost:1337/api/project/create'
   return this.authHttp.post(url, JSON.stringify(project), options)
    .map(res => res)
    .subscribe(
      data => data,
      err => console.log(err)
    )
  }

}