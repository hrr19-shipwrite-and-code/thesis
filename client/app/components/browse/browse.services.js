System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BrowseService;
    return {
        setters:[],
        execute: function() {
            BrowseService = (function () {
                function BrowseService() {
                }
                BrowseService.prototype.getTech = function () {
                    return [
                        'JavaScript',
                        'TypeScript',
                        'HTML',
                        'CSS',
                        'jQuery',
                        'AngularJS',
                        'React',
                        'React-Native',
                        'Ruby'
                    ];
                };
                return BrowseService;
            }());
            exports_1("BrowseService", BrowseService);
        }
    }
});
//# sourceMappingURL=browse.services.js.map