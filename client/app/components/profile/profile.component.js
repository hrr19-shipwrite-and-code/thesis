System.register(['@angular/core', './profile.services.js', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, profile_services_js_1, router_1;
    var ProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profile_services_js_1_1) {
                profile_services_js_1 = profile_services_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ProfileComponent = (function () {
                function ProfileComponent(profileService, route) {
                    this.profileService = profileService;
                    this.route = route;
                    this.profileInfo = { Teches: [], Team: [], Member: [] };
                    this.projects = profileService.getProjects();
                    this.getUserInfo();
                }
                ProfileComponent.prototype.getUserInfo = function () {
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        _this.profileService.getProfileInfo(params['id'])
                            .subscribe(function (data) {
                            _this.profileInfo = data;
                            console.log(data);
                        });
                    });
                };
                ProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: './client/app/components/profile/profile.html',
                        styleUrls: ['./client/app/components/profile/profile.css'],
                        providers: [profile_services_js_1.ProfileService],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof profile_services_js_1.ProfileService !== 'undefined' && profile_services_js_1.ProfileService) === 'function' && _a) || Object, router_1.ActivatedRoute])
                ], ProfileComponent);
                return ProfileComponent;
                var _a;
            }());
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
//# sourceMappingURL=profile.component.js.map