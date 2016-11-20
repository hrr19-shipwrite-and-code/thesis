import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  constructor (private http: Http) {}
  // //Working API to get ALL
  getProjects() {
    return this.http.get('http://localhost:1337/api/project/getAll')
      .map(res => res.json())
  }

  filter(req) {
    // req => {
    //   tech: Array[3], 
    //   title: "Sushi", 
    //   user: "JGoD", 
    //   status: "In Progress", 
    //   openSource: "false"
    // }
  }

  sortBy(type) {
    console.log(type) // 'date' or 'likes' or 'views'
  }
}
