System.register(['@angular/http', 'angular2-jwt', '@angular/core'], function(exports_1, context_1) {
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
    var http_1, angular2_jwt_1, core_1;
    var ProjectAddService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProjectAddService = (function () {
                function ProjectAddService(authHttp) {
                    this.authHttp = authHttp;
                }
                ProjectAddService.prototype.userCreateProject = function (project) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = 'http://localhost:1337/api/project/userCreate';
                    return this.authHttp.post(url, JSON.stringify(project), options)
                        .map(function (res) { return res.json(); });
                };
                ProjectAddService.prototype.teamCreateProject = function (project, teamId) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = 'http://localhost:1337/api/project/teamCreate/' + teamId;
                    return this.authHttp.post(url, JSON.stringify(project), options)
                        .map(function (res) { return res.json(); });
                };
                ProjectAddService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
                ], ProjectAddService);
                return ProjectAddService;
            }());
            exports_1("ProjectAddService", ProjectAddService);
        }
    }
});
//# sourceMappingURL=projectAdd.services.js.map