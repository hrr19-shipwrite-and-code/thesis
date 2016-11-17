System.register(['angular2-jwt', 'rxjs/add/operator/map', '@angular/core'], function(exports_1, context_1) {
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
    var angular2_jwt_1, core_1;
    var ProfileService;
    return {
        setters:[
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProfileService = (function () {
                function ProfileService(authHttp) {
                    this.authHttp = authHttp;
                }
                ProfileService.prototype.getProfileInfo = function (url) {
                    return this.authHttp.get('http://localhost:1337/api/profile/' + url)
                        .map(function (res) { return res.json(); });
                };
                ProfileService.prototype.getProjects = function () {
                    return [
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, likes: 0, imgUrl: 'http://blog.teamtreehouse.com/wp-content/uploads/2013/10/test.png' },
                        { projectName: 'Some Project Name', userName: 'Mike', views: 0, likes: 0, imgUrl: 'https://patriciasdesignsite.files.wordpress.com/2015/01/wireframe11.jpg' },
                        { projectName: 'Some Project Name', userName: 'Nancy', views: 0, likes: 0, imgUrl: 'http://sharepoint.jsturges.com/files/2011/11/Contoso-Intranet-001-default-1024x623.png' },
                        { projectName: 'Some Project Name', userName: 'Cameron', views: 0, likes: 0, imgUrl: 'https://media.balsamiq.com/img/examples/wiki-sketch.png' },
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, likes: 0, imgUrl: 'http://blogs.balsamiq.com/champions/files/2013/10/Bayside_wireframe_lg.png' },
                        { projectName: 'Some Project Name', userName: 'Mike', views: 0, likes: 0, imgUrl: 'https://media.balsamiq.com/img/examples/boogle-sketch.png' },
                        { projectName: 'Some Project Name', userName: 'Nancy', views: 0, likes: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png' },
                        { projectName: 'Some Project Name', userName: 'Cameron', views: 0, likes: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png' },
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, likes: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png' }
                    ];
                };
                ProfileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
                ], ProfileService);
                return ProfileService;
            }());
            exports_1("ProfileService", ProfileService);
        }
    }
});
//# sourceMappingURL=profile.services.js.map