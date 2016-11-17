import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {

  constructor (private http: Http, private authHttp: AuthHttp) {}
  //API call to grab project by Id
  getProject(id) {
    return this.http.get('http://localhost:1337/api/project/id/' + id)
      .map(res => res.json())
  }

  likeProject(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.post('http://localhost:1337/api/like/project/' + id, {}, options)
      .map(res => res.json())
  }

  getTech(){
    return [
      {name: 'React'},
      {name: 'JavaScript'},
      {name: 'TypeScript'},
      {name: 'Angular'},
      {name: 'Angular 2'},
      {name: 'Redux'}
    ]
  }

  // getProject(id){
  //   return {
  //     "id": 1,
  //     "title": "blah",
  //     "description": null,
  //     "views": 3,
  //     "thumbnail": null,
  //     "deploy": null,
  //     "github": null,
  //     "contribute": null,
  //     "progress": null,
  //     "createdAt": "2016-11-14T20:09:17.000Z",
  //     "updatedAt": "2016-11-16T05:22:39.000Z",
  //     "ProfileId": 1,
  //     "Profile": {
  //       "name": "Mike",
  //       "url": "mike"
  //     },
  //     "Images": ["https://d13yacurqjgara.cloudfront.net/users/684814/screenshots/3091594/creative_agency_-_landing_apge.jpg"],
  //     "Comments": [],
  //     "Teches": [{name: 'React'}],
  //     "likes": 1
  //   }
  // }

}