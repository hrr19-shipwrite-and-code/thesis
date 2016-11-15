import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  lock = new Auth0Lock('wtgfH9yCpAyHiTrupNH3xXsMPh0WfxYR', 'nanciee.auth0.com');

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

 login() {
   this.lock.show((error: string, profile: Object, id_token: string) => {
     if (error) {
       console.log(error);
     }
     console.log(id_token)
    //  localStorage.setItem('profile', JSON.stringify(profile));
    //  localStorage.setItem('id_token', id_token);
   });
   console.log(this.authenticated())
 }

 logout() {
  //  localStorage.removeItem('profile');
   localStorage.removeItem('id_token');
 }

 authenticated() {
    return tokenNotExpired();
  };
}