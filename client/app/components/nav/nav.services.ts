import { AuthHttp } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NavService {
  constructor(private authHttp: AuthHttp, private http: Http){}

  getNotifications() {
    return this.authHttp.get('http://174.138.71.230:1337/api/notifications')
      .map(res => res.json())
  }

  markAsRead() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.put('http://174.138.71.230:1337/api/notifications/view/', {}, options)
      .map(res => res)
  }

  decline(id) {
    console.log(id)
    return this.authHttp.delete('http://174.138.71.230:1337/api/team/leaveTeam/' + id)
      .map(res => res)
  }

}
