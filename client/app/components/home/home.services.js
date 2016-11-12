System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HomeService;
    return {
        setters:[],
        execute: function() {
            HomeService = (function () {
                function HomeService() {
                }
                HomeService.prototype.getProjects = function () {
                    return [
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Mike', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Nancy', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Cameron', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Mike', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Nancy', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Cameron', views: 0, imgUrl: '' },
                        { projectName: 'Some Project Name', userName: 'Jacob', views: 0, imgUrl: '' }
                    ];
                };
                return HomeService;
            }());
            exports_1("HomeService", HomeService);
        }
    }
});
//# sourceMappingURL=home.services.js.map