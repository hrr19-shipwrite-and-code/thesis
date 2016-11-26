System.register(['angular2-jwt', '@angular/http', 'rxjs/add/operator/map', '@angular/core'], function(exports_1, context_1) {
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
    var angular2_jwt_1, http_1, core_1;
    var ProfileService;
    return {
        setters:[
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProfileService = (function () {
                function ProfileService(authHttp, http) {
                    this.authHttp = authHttp;
                    this.http = http;
                }
                ProfileService.prototype.getProfileInfo = function (url) {
                    return this.http.get('http://localhost:1337/api/profile/' + url)
                        .map(function (res) { return res.json(); });
                };
                ProfileService.prototype.getProjects = function (userId) {
                    return this.http.get('http://localhost:1337/api/project/user/' + userId)
                        .map(function (res) { return res.json(); });
                };
                ProfileService.prototype.updateUserProfile = function (data) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://localhost:1337/api/user/edit', data, options)
                        .map(function (res) { return res.json(); });
                };
                ProfileService.prototype.userAddTech = function (tech) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.post('http://localhost:1337/api/user/addTech', JSON.stringify(tech), options)
                        .map(function (res) { return res.json(); });
                };
                ProfileService.prototype.userDeleteTech = function (techId) {
                    return this.authHttp.delete('http://localhost:1337/api/user/removeTech/' + techId)
                        .map(function (res) { return res; });
                };
                ProfileService.prototype.teamAddTech = function (teamId, tech) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.post('http://localhost:1337/api/team/addTech/' + teamId, JSON.stringify(tech), options)
                        .map(function (res) { return res.json(); });
                };
                ProfileService.prototype.teamDeleteTech = function (teamId, techId) {
                    return this.authHttp.delete('http://localhost:1337/api/team/removeTech/' + teamId + '/' + techId)
                        .map(function (res) { return res; });
                };
                ProfileService.prototype.updateTeamProfile = function (teamId, data) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://localhost:1337/api/team/edit/' + teamId, data, options)
                        .map(function (res) { return res; });
                };
                ProfileService.prototype.deleteTeam = function (teamId) {
                    return this.authHttp.delete('http://localhost:1337/api/team/delete/' + teamId)
                        .map(function (res) { return res; });
                };
                ProfileService.prototype.addMember = function (teamId, memberURL) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.post('http://localhost:1337/api/team/addMember/' + teamId + '/' + memberURL, {}, options)
                        .map(function (res) { return res.json(); });
                };
                ProfileService.prototype.removeMember = function (teamId, userId) {
                    return this.authHttp.delete('http://localhost:1337/api/team/removeMember/' + teamId + '/' + userId)
                        .map(function (res) { return res; });
                };
                ProfileService.prototype.promoteMember = function () {
                };
                ProfileService.prototype.demoteMember = function () {
                };
                ProfileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, http_1.Http])
                ], ProfileService);
                return ProfileService;
            }());
            exports_1("ProfileService", ProfileService);
        }
    }
});
//# sourceMappingURL=profile.services.js.map