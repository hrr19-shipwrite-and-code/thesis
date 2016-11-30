System.register(['@angular/core', './createTeam.services.js', '@angular/router', 'angular2-google-maps/core'], function(exports_1, context_1) {
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
    var core_1, createTeam_services_js_1, router_1, core_2;
    var CreateTeamComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (createTeam_services_js_1_1) {
                createTeam_services_js_1 = createTeam_services_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            CreateTeamComponent = (function () {
                function CreateTeamComponent(createTeamService, router, mapsAPILoader, zone) {
                    this.createTeamService = createTeamService;
                    this.router = router;
                    this.mapsAPILoader = mapsAPILoader;
                    this.zone = zone;
                    this.location = '';
                    this.name = '';
                    this.notValidEmail = false;
                }
                CreateTeamComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.mapsAPILoader.load().then(function () {
                        var input = document.getElementById('location');
                        var autocomplete = new google.maps.places.Autocomplete(input, {
                            types: ['(cities)']
                        });
                        autocomplete.addListener("place_changed", function () {
                            _this.zone.run(function () {
                                _this.location = autocomplete.getPlace().formatted_address;
                            });
                        });
                    });
                };
                CreateTeamComponent.prototype.trimmer = function () {
                    this.name = this.name.trim();
                };
                CreateTeamComponent.prototype.createTeam = function (teamInfo) {
                    var _this = this;
                    if (!validator.isEmail(teamInfo.email)) {
                        this.notValidEmail = true;
                    }
                    else {
                        this.createTeamService.createTeam(teamInfo)
                            .subscribe(function (data) {
                            _this.router.navigateByUrl('/' + teamInfo.url);
                        });
                    }
                };
                CreateTeamComponent = __decorate([
                    core_1.Component({
                        selector: 'createTeam',
                        templateUrl: './client/app/components/createTeam/createTeam.html',
                        styleUrls: ['./client/app/components/createTeam/createTeam.css'],
                        providers: [createTeam_services_js_1.CreateTeamService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof createTeam_services_js_1.CreateTeamService !== 'undefined' && createTeam_services_js_1.CreateTeamService) === 'function' && _a) || Object, router_1.Router, core_2.MapsAPILoader, core_1.NgZone])
                ], CreateTeamComponent);
                return CreateTeamComponent;
                var _a;
            }());
            exports_1("CreateTeamComponent", CreateTeamComponent);
        }
    }
});
//# sourceMappingURL=createTeam.component.js.map