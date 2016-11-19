import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';


@Injectable()
export class ProfileService {
  constructor(private authHttp: AuthHttp, private http: Http) {}

  getProfileInfo(url){
    return this.http.get('http://localhost:1337/api/profile/' + url)
      .map(res => res.json());
  }

  getProjects(userId){
    return this.http.get('http://localhost:1337/api/project/user/' + userId)
      .map(res => res.json());
  }
}
