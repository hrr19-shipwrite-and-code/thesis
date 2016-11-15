System.register(['@angular/core', 'angular2-jwt'], function(exports_1, context_1) {
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
    var core_1, angular2_jwt_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService() {
                    this.lock = new Auth0Lock('wtgfH9yCpAyHiTrupNH3xXsMPh0WfxYR', 'nanciee.auth0.com');
                    // Add callback for lock `authenticated` event
                    this.lock.on("authenticated", function (authResult) {
                        localStorage.setItem('id_token', authResult.idToken);
                    });
                }
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
                    //  localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                };
                AuthService.prototype.authenticated = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                ;
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map