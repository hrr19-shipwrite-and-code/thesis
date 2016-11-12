System.register(['angular2/router', 'angular2/platform/browser', './components/app/app.component.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, browser_1, app_component_js_1;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_js_1_1) {
                app_component_js_1 = app_component_js_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_js_1.AppComponent, [router_1.ROUTER_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=boot.js.map