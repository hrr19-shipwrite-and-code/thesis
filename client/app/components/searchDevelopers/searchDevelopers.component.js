System.register(['@angular/core', './searchDevelopers.services.js', 'angular2-google-maps/core'], function(exports_1, context_1) {
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
    var core_1, searchDevelopers_services_js_1, core_2;
    var SearchDevelopersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (searchDevelopers_services_js_1_1) {
                searchDevelopers_services_js_1 = searchDevelopers_services_js_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            SearchDevelopersComponent = (function () {
                function SearchDevelopersComponent(searchDevelopersServices, mapsAPILoader, zone) {
                    this.searchDevelopersServices = searchDevelopersServices;
                    this.mapsAPILoader = mapsAPILoader;
                    this.zone = zone;
                }
                SearchDevelopersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getAllUsers({});
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
                SearchDevelopersComponent.prototype.getAllUsers = function (filter) {
                    var _this = this;
                    var filterConditions = {};
                    for (var key in filter) {
                        if (filter[key]) {
                            if (key === 'tech' || key === 'location') {
                                filterConditions[key] = filter[key].split(',');
                                for (var i = 0; i < filterConditions[key].length; i++) {
                                    filterConditions[key][i] = filterConditions[key][i].trim();
                                }
                            }
                            else {
                                filterConditions[key] = filter[key];
                            }
                        }
                    }
                    this.searchDevelopersServices.getAllUsers(filterConditions)
                        .subscribe(function (data) {
                        console.log(data);
                        _this.users = data;
                    });
                };
                SearchDevelopersComponent = __decorate([
                    core_1.Component({
                        selector: 'searchDevelopers',
                        templateUrl: './client/app/components/searchDevelopers/searchDevelopers.html',
                        styleUrls: ['./client/app/components/searchDevelopers/searchDevelopers.css'],
                        providers: [searchDevelopers_services_js_1.SearchDevelopersServices]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof searchDevelopers_services_js_1.SearchDevelopersServices !== 'undefined' && searchDevelopers_services_js_1.SearchDevelopersServices) === 'function' && _a) || Object, core_2.MapsAPILoader, core_1.NgZone])
                ], SearchDevelopersComponent);
                return SearchDevelopersComponent;
                var _a;
            }());
            exports_1("SearchDevelopersComponent", SearchDevelopersComponent);
        }
    }
});
//# sourceMappingURL=searchDevelopers.component.js.map