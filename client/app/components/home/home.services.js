System.register(['@angular/http', '@angular/core', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var http_1, core_1;
    var HomeService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            HomeService = (function () {
                function HomeService(http) {
                    this.http = http;
                }
                // //Working API to get ALL
                // getProjects() {
                //   return this.http.get('http://localhost:1337/api/project/getAll')
                //     .map(res => res.json())
                // }
                HomeService.prototype.getProjects = function () {
                    return [
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, imgUrl: 'http://blog.teamtreehouse.com/wp-content/uploads/2013/10/test.png' },
                        { projectName: 'Some Project Name', userName: 'Mike', views: 0, imgUrl: 'https://patriciasdesignsite.files.wordpress.com/2015/01/wireframe11.jpg' },
                        { projectName: 'Some Project Name', userName: 'Nancy', views: 0, imgUrl: 'http://sharepoint.jsturges.com/files/2011/11/Contoso-Intranet-001-default-1024x623.png' },
                        { projectName: 'Some Project Name', userName: 'Cameron', views: 0, imgUrl: 'https://media.balsamiq.com/img/examples/wiki-sketch.png' },
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, imgUrl: 'http://blogs.balsamiq.com/champions/files/2013/10/Bayside_wireframe_lg.png' },
                        { projectName: 'Some Project Name', userName: 'Mike', views: 0, imgUrl: 'https://media.balsamiq.com/img/examples/boogle-sketch.png' },
                        { projectName: 'Some Project Name', userName: 'Nancy', views: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png' },
                        { projectName: 'Some Project Name', userName: 'Cameron', views: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png' },
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png' }
                    ];
                };
                HomeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HomeService);
                return HomeService;
            }());
            exports_1("HomeService", HomeService);
        }
    }
});
//# sourceMappingURL=home.services.js.map