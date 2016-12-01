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
    }],
    auth: {
      redirect: false,
    },
    theme: {
      logo: './client/app/assets/sushi.png',
      primaryColor: 'salmon'
    },
    languageDictionary: {
      title: "sushiii"
    },
  }
  lock = new Auth0Lock('mHw2LCJA0uxSEE1mQcQJxCitXZPtt5dw', 'sushiii.auth0.com', this.options);


  //Store profile object in auth class

  constructor(private authHttp: AuthHttp, private router: Router, private http: Http) {

    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        //Get additional github information
        if(profile.url){
          this.http.get(profile.url)
          .map(res => res.json())
          .subscribe(data => {
            profile.bio = data.bio;
            profile.blog = data.blog;
            this.findOrCreateUser(profile)
          })  
        } else {
          this.findOrCreateUser(profile)
        } 
      });
    });
  };

  findOrCreateUser(profile) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authHttp.post('http://138.68.23.255:1337/api/user/create', JSON.stringify(profile), options)
      .map(res => res.json())
      .subscribe( data => {
        localStorage.setItem('url', data.url);
        localStorage.setItem('name', data.name);
        localStorage.setItem('picture', data.picture);
        setTimeout(() => location.reload(), 1000);
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
    clearTimeout(localStorage.getItem('timeoutId'))
    localStorage.removeItem('timeoutId');
    this.router.navigateByUrl('/');
  }

  authenticated() {
    return tokenNotExpired();
  };

  checkUrl() {
    return localStorage.getItem('url');
  }
}