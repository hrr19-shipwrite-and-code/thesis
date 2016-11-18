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

  getTech() {
    return [
      {name: 'React'},
      {name: 'JavaScript'},
      {name: 'TypeScript'},
      {name: 'Angular'},
      {name: 'Angular 2'},
      {name: 'Redux'}
    ]
  }

  doesUserLike(id) {
    return this.authHttp.get('http://localhost:1337/api/like/user/' + id)
      .map(res => res.json())
  }

  addTech(tech) {
    console.log(tech) //{name: "tech here"}
  }

  editDescription(description) {
    console.log(description) //string
  }

  postComment(comment, projectId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.post('http://localhost:1337/api/comment/create/' + projectId, JSON.stringify(comment), options)
      .map(res => res.json());
  }
}