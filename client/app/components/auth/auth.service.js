System.register(['@angular/core', 'angular2-jwt', '@angular/http', '@angular/router', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular2_jwt_1, http_1, angular2_jwt_2, router_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
                angular2_jwt_2 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {}],
        execute: function() {
            AuthService = (function () {
                //Store profile object in auth class
                function AuthService(authHttp, router, http) {
                    var _this = this;
                    this.authHttp = authHttp;
                    this.router = router;
                    this.http = http;
                    this.options = {
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
                    };
                    this.lock = new Auth0Lock('mHw2LCJA0uxSEE1mQcQJxCitXZPtt5dw', 'sushiii.auth0.com', this.options);
                    // Add callback for the Lock `authenticated` event
                    this.lock.on("authenticated", function (authResult) {
                        localStorage.setItem('id_token', authResult.idToken);
                        // Fetch profile information
                        _this.lock.getProfile(authResult.idToken, function (error, profile) {
                            //Get additional github information
                            if (profile.url) {
                                _this.http.get(profile.url)
                                    .map(function (res) { return res.json(); })
                                    .subscribe(function (data) {
                                    profile.bio = data.bio;
                                    profile.blog = data.blog;
                                    _this.findOrCreateUser(profile);
                                });
                            }
                            else {
                                _this.findOrCreateUser(profile);
                            }
                        });
                    });
                }
                ;
                AuthService.prototype.findOrCreateUser = function (profile) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.authHttp.post('http://138.68.23.255:1337/api/user/create', JSON.stringify(profile), options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        localStorage.setItem('url', data.url);
                        localStorage.setItem('name', data.name);
                        localStorage.setItem('picture', data.picture);
                        setTimeout(function () { return location.reload(); }, 1000);
                    });
                };
                AuthService.prototype.login = function () {
                    this.lock.show();
                };
                AuthService.prototype.logout = function () {
                    localStorage.removeItem('id_token');
                    localStorage.removeItem('url');
                    localStorage.removeItem('name');
                    localStorage.removeItem('picture');
                    clearTimeout(localStorage.getItem('timeoutId'));
                    localStorage.removeItem('timeoutId');
                    this.router.navigateByUrl('/');
                };
                AuthService.prototype.authenticated = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                ;
                AuthService.prototype.checkUrl = function () {
                    return localStorage.getItem('url');
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_2.AuthHttp, router_1.Router, http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map