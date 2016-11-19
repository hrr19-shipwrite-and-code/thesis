import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  options = {
    additionalSignUpFields: [{
      name: "name",
      placeholder: "Enter full name",
    }]
  }
  lock = new Auth0Lock('wtgfH9yCpAyHiTrupNH3xXsMPh0WfxYR', 'nanciee.auth0.com', this.options);


  //Store profile object in auth class

  constructor(private authHttp: AuthHttp, private router: Router) {

    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }
        console.log(profile);
        this.findOrCreateUser(profile)
      });
    });
  };

  findOrCreateUser(profile) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authHttp.post('http://localhost:1337/api/user/create', JSON.stringify(profile), options)
      .map(res => res.json())
      .subscribe( data => {
        console.log(data)
        localStorage.setItem('url', data.url);
        localStorage.setItem('name', data.name);
        localStorage.setItem('picture', data.picture);
      })
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('url');
    localStorage.removeItem('name');
    localStorage.removeItem('picture');
    this.router.navigateByUrl('/');
  }

  authenticated() {
    return tokenNotExpired();
  };

  checkUrl() {
    return localStorage.getItem('url');
  }
}