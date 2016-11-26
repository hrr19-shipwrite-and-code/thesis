import { AuthHttp } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
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

  updateUserProfile(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.put('http://localhost:1337/api/user/edit', data, options)
      .map(res => res.json())
  }

  userAddTech(tech) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.post('http://localhost:1337/api/user/addTech', JSON.stringify(tech), options)
      .map(res => res.json());
  }

  userDeleteTech(techId) {
    return this.authHttp.delete('http://localhost:1337/api/user/removeTech/' +  techId)
      .map(res => res);
  }

  teamAddTech(teamId, tech) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.post('http://localhost:1337/api/team/addTech/' + teamId, JSON.stringify(tech), options)
      .map(res => res.json());
  }

  teamDeleteTech(teamId, techId) {
    return this.authHttp.delete('http://localhost:1337/api/team/removeTech/' + teamId + '/' +  techId)
      .map(res => res);
  }

  updateTeamProfile(teamId, data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.put('http://localhost:1337/api/team/edit/' + teamId, data, options)
      .map(res => res);
  }

  deleteTeam(teamId) {
    return this.authHttp.delete('http://localhost:1337/api/team/delete/' + teamId)
      .map(res => res);
  }

  addMember(teamId, memberURL) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.post('http://localhost:1337/api/team/addMember/' + teamId + '/' + memberURL, {}, options)
      .map(res => res.json());
  }

  removeMember(teamId, userId) {
    return this.authHttp.delete('http://localhost:1337/api/team/removeMember/' + teamId + '/' + userId)
      .map(res => res);
  }
}
