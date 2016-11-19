import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';


@Injectable()
export class EditProfileService {
  constructor(private authHttp: AuthHttp, private http: Http) {}

  getUserInfo(){
    return this.authHttp.get('http://localhost:1337/api/editUserInfo')
    .map(res => res.json())
  }

  editUserInfo(userInfo){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.put('http://localhost:1337/api/user/edit', JSON.stringify(userInfo), options)
      .map(res => res.json);
  }
}