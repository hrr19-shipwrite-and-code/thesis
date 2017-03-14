System.register(['@angular/http', 'angular2-jwt', '@angular/core', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var ProjectService;
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
            },
            function (_1) {}],
        execute: function() {
            ProjectService = (function () {
                function ProjectService(http, authHttp) {
                    this.http = http;
                    this.authHttp = authHttp;
                }
                //API call to grab project by Id
                ProjectService.prototype.getProject = function (id) {
                    return this.http.get('http://174.138.71.230:1337/api/project/id/' + id)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.deleteProject = function (id) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.delete('http://174.138.71.230:1337/api/project/delete/' + id, options)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.likeProject = function (id) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.post('http://174.138.71.230:1337/api/like/project/' + id, {}, options)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.getTech = function () {
                    return this.http.get('http://174.138.71.230:1337/api/tech')
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.doesUserLike = function (id) {
                    return this.authHttp.get('http://174.138.71.230:1337/api/like/user/' + id)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.addTech = function (tech) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.post('http://174.138.71.230:1337/api/project/addTech', JSON.stringify(tech), options)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.deleteTech = function (techId, projectId) {
                    return this.authHttp.delete('http://174.138.71.230:1337/api/project/removeTech/' + projectId + '/' + techId)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.editDescription = function (id, description) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://174.138.71.230:1337/api/project/edit/' + id, description, options)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.getComment = function (id) {
                    return this.http.get('http://174.138.71.230:1337/api/comment/' + id)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.postComment = function (comment, projectId) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.post('http://174.138.71.230:1337/api/comment/create/' + projectId, JSON.stringify(comment), options)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.deleteComment = function (commentId) {
                    return this.authHttp.delete('http://174.138.71.230:1337/api/comment/delete/' + commentId)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.setAsThumb = function (id, data) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://174.138.71.230:1337/api/project/thumbnail/user/' + id, JSON.stringify(data), options)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.setTeamThumb = function (id, team, data) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://174.138.71.230:1337/api/project/thumbnail/team/' + team + '/' + id, JSON.stringify(data), options)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.deleteImage = function (id, proj) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.delete('http://174.138.71.230:1337/api/project/image/user/' + proj + '/' + id, options)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.deleteTeamImage = function (id, proj, team) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.delete('http://174.138.71.230:1337/api/project/image/team/' + proj + '/' + team + '/' + id, options)
                        .map(function (res) { return res; });
                };
                //Team functions
                ProjectService.prototype.teamDeleteProject = function (teamId, projectId) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.delete('http://174.138.71.230:1337/api/project/teamDelete/' + teamId + '/' + projectId, options)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.teamAddTech = function (teamId, tech) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.post('http://174.138.71.230:1337/api/project/teamAddTech/' + teamId, JSON.stringify(tech), options)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.teamDeleteTech = function (teamId, techId, projectId) {
                    return this.authHttp.delete('http://174.138.71.230:1337/api/project/teamRemoveTech/' + teamId + '/' + projectId + '/' + techId)
                        .map(function (res) { return res; });
                };
                ProjectService.prototype.teamEditDescription = function (teamId, projectId, description) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://174.138.71.230:1337/api/project/teamEdit/' + teamId + '/' + projectId, description, options)
                        .map(function (res) { return res; });
                };
                ProjectService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
                ], ProjectService);
                return ProjectService;
            }());
            exports_1("ProjectService", ProjectService);
        }
    }
});
//# sourceMappingURL=project.services.js.map