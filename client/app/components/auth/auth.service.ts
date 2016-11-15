// import {Injectable} from 'angular2/core';
// import {tokenNotExpired} from 'angular2-jwt';

// declare var Auth0Lock: any;

// @Injectable()
// export class AuthService {

//  lock = new Auth0Lock('wtgfH9yCpAyHiTrupNH3xXsMPh0WfxYR', 'nanciee.auth0.com');

//  login() {
//    this.lock.show((error: string, profile: Object, id_token: string) => {
//      if (error) {
//        console.log(error);
//      }
//      console.log(id_token)
//      localStorage.setItem('profile', JSON.stringify(profile));
//      localStorage.setItem('id_token', id_token);
//    });
//  }

//  logout() {
//    localStorage.removeItem('profile');
//    localStorage.removeItem('id_token');
//  }

//  public authenticated() {
//     return tokenNotExpired();
//   };
// }