System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ProjectAddService;
    return {
        setters:[],
        execute: function() {
            ProjectAddService = (function () {
                function ProjectAddService() {
                }
                ProjectAddService.prototype.postProject = function (data, cb) {
                    console.log(data); // data is an obj with title, description, status, deploy, github, and openSource
                };
                return ProjectAddService;
            }());
            exports_1("ProjectAddService", ProjectAddService);
        }
    }
});
//# sourceMappingURL=projectAdd.services.js.map