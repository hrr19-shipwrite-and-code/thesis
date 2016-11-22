System.register(['@angular/core', './profile.services.js', '@angular/router', 'angular2-google-maps/core'], function(exports_1, context_1) {
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
    var core_1, profile_services_js_1, router_1, router_2, core_2;
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
                router_2 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            ProfileComponent = (function () {
                function ProfileComponent(profileService, route, mapsAPILoader, zone, router) {
                    this.profileService = profileService;
                    this.route = route;
                    this.mapsAPILoader = mapsAPILoader;
                    this.zone = zone;
                    this.router = router;
                    this.clientId = localStorage.getItem('url');
                    this.profileInfo = { Teches: [], Team: [], Member: [] };
                    this.newTech = '';
                    this.urlTaken = false;
                    this.editing = {
                        basic: false,
                        tech: false,
                        contact: false
                    };
                }
                ProfileComponent.prototype.ngOnInit = function () {
                    this.getUserInfo();
                };
                ProfileComponent.prototype.googleLocation = function () {
                    var _this = this;
                    this.mapsAPILoader.load().then(function () {
                        var input = document.getElementById('location');
                        var autocomplete = new google.maps.places.Autocomplete(input, {
                            types: ['(cities)']
                        });
                        autocomplete.addListener("place_changed", function () {
                            _this.zone.run(function () {
                                _this.profileInfo.location = autocomplete.getPlace().formatted_address;
                            });
                        });
                    });
                };
                ProfileComponent.prototype.getUserInfo = function () {
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        _this.profileService.getProfileInfo(params['id'])
                            .subscribe(function (data) {
                            _this.profileInfo = data;
                            _this.profileInfo.createdAt = moment(_this.profileInfo.createdAt).format('MMMM Do YYYY');
                            _this.getUserProjects(data.id);
                            _this.tempUrl = data.url;
                            console.log(_this.profileInfo);
                        });
                    });
                };
                ProfileComponent.prototype.getUserProjects = function (userId) {
                    var _this = this;
                    this.profileService.getProjects(userId)
                        .subscribe(function (data) {
                        _this.projects = data;
                    });
                };
                ProfileComponent.prototype.isCurrentUser = function () {
                    return this.profileInfo.url === this.clientId;
                };
                ProfileComponent.prototype.updateUserInfo = function (event, input, type) {
                    var _this = this;
                    if (type === 'basic') {
                        localStorage.setItem('name', input.name);
                    }
                    if (input.url === this.clientId) {
                        return;
                    }
                    return this.profileService.updateUserProfile(input)
                        .subscribe(function (data) {
                        if (type === 'url') {
                            localStorage.setItem('url', input.url);
                            _this.clientId = localStorage.getItem('url');
                            _this.urlTaken = false;
                            _this.router.navigateByUrl('/profile/' + input.url);
                            _this.editForm('basic');
                        }
                        else {
                            _this.editForm(type);
                        }
                    }, function (err) {
                        if (type === 'url') {
                            _this.urlTaken = true;
                        }
                    });
                };
                ProfileComponent.prototype.editForm = function (key) {
                    this.editing[key] = !this.editing[key];
                };
                ProfileComponent.prototype.addTech = function () {
                    var _this = this;
                    for (var _i = 0, _a = this.profileInfo.Teches; _i < _a.length; _i++) {
                        var value = _a[_i];
                        if (value.name === this.newTech) {
                            return this.newTech = '';
                        }
                    }
                    var newTech = { name: this.newTech };
                    this.profileService.addTech(newTech)
                        .subscribe(function (data) {
                        _this.profileInfo.Teches.push(data);
                    });
                    this.newTech = '';
                    this.editing.tech = !this.editing.tech;
                };
                ProfileComponent.prototype.deleteTech = function (event, id) {
                    console.log(id);
                    this.profileService.deleteTech(id)
                        .subscribe(function (data) { });
                    for (var i = 0; i < this.profileInfo.Teches.length; i++) {
                        if (this.profileInfo.Teches[i].id == Number(id)) {
                            return this.profileInfo.Teches.splice(i, 1);
                        }
                        ;
                    }
                    ;
                };
                ProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: './client/app/components/profile/profile.html',
                        styleUrls: ['./client/app/components/profile/profile.css'],
                        providers: [profile_services_js_1.ProfileService],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof profile_services_js_1.ProfileService !== 'undefined' && profile_services_js_1.ProfileService) === 'function' && _a) || Object, router_1.ActivatedRoute, core_2.MapsAPILoader, core_1.NgZone, router_2.Router])
                ], ProfileComponent);
                return ProfileComponent;
                var _a;
            }());
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
//# sourceMappingURL=profile.component.js.map