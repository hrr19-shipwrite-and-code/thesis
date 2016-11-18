System.register(['angular2-jwt', 'rxjs/add/operator/map', '@angular/core', '@angular/http'], function(exports_1, context_1) {
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
    var angular2_jwt_1, core_1, http_1;
    var EditProfileService;
    return {
        setters:[
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            EditProfileService = (function () {
                function EditProfileService(authHttp, http) {
                    this.authHttp = authHttp;
                    this.http = http;
                }
                EditProfileService.prototype.getUserInfo = function () {
                    return this.authHttp.get('http://localhost:1337/api/editUserInfo')
                        .map(function (res) { return res.json(); });
                };
                EditProfileService.prototype.editUserInfo = function (userInfo) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://localhost:1337/api/user/edit', JSON.stringify(userInfo), options)
                        .map(function (res) { return res; });
                };
                EditProfileService.prototype.editUserPicture = function (picture) {
                    // let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
                    // let options = new RequestOptions({ headers: headers });
                    return this.http.post('http://localhost:1337/api/user/addPicture', picture)
                        .map(function (res) { return res; });
                };
                EditProfileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, http_1.Http])
                ], EditProfileService);
                return EditProfileService;
            }());
            exports_1("EditProfileService", EditProfileService);
        }
    }
});
//# sourceMappingURL=editProfile.services.js.map