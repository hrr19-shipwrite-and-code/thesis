System.register(['@angular/core', 'angular2-jwt', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, angular2_jwt_1, angular2_jwt_2;
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
            function (_1) {}],
        execute: function() {
            AuthService = (function () {
                //Store profile object in auth class
                function AuthService(authHttp) {
                    var _this = this;
                    this.authHttp = authHttp;
                    this.lock = new Auth0Lock('wtgfH9yCpAyHiTrupNH3xXsMPh0WfxYR', 'nanciee.auth0.com');
                    this.url = localStorage.getItem('url');
                    // Add callback for the Lock `authenticated` event
                    this.lock.on("authenticated", function (authResult) {
                        localStorage.setItem('id_token', authResult.idToken);
                        // Fetch profile information
                        _this.lock.getProfile(authResult.idToken, function (error, profile) {
                            if (error) {
                                // Handle error
                                alert(error);
                                return;
                            }
                            console.log(profile);
                            _this.findOrCreateUser(profile);
                        });
                    });
                }
                ;
                AuthService.prototype.findOrCreateUser = function (profile) {
                    this.authHttp.post('http://localhost:1337/api/user/create', JSON.stringify(profile))
                        .map(function (res) { return res._body; })
                        .subscribe(function (data) { return localStorage.setItem('url', data); });
                };
                AuthService.prototype.login = function () {
                    this.lock.show(function (error, profile, id_token) {
                        if (error) {
                            console.log(error);
                        }
                        console.log(id_token);
                        //  localStorage.setItem('profile', JSON.stringify(profile));
                        //  localStorage.setItem('id_token', id_token);
                    });
                    console.log(this.authenticated());
                };
                AuthService.prototype.logout = function () {
                    localStorage.removeItem('id_token');
                    localStorage.removeItem('url');
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
                    __metadata('design:paramtypes', [angular2_jwt_2.AuthHttp])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map