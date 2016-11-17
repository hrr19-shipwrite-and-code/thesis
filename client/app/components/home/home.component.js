System.register(['@angular/core', './home.services.js'], function(exports_1, context_1) {
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
    var core_1, home_services_js_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (home_services_js_1_1) {
                home_services_js_1 = home_services_js_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(homeService) {
                    this.homeService = homeService;
                    //this.projects = homeService.getProjects();
                }
                HomeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.homeService.getProjects()
                        .subscribe(function (data) { return _this.projects = data; }, function (error) { return alert(error); });
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home',
                        templateUrl: './client/app/components/home/home.html',
                        styleUrls: ['./client/app/components/home/home.css'],
                        providers: [home_services_js_1.HomeService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof home_services_js_1.HomeService !== 'undefined' && home_services_js_1.HomeService) === 'function' && _a) || Object])
                ], HomeComponent);
                return HomeComponent;
                var _a;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map