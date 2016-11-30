System.register(['@angular/core', './searchDevelopers.services.js', 'angular2-google-maps/core', '@angular/router', '@angular/common'], function(exports_1, context_1) {
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
    var core_1, searchDevelopers_services_js_1, core_2, router_1, common_1;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SearchDevelopersComponent = (function () {
                function SearchDevelopersComponent(searchDevelopersServices, mapsAPILoader, zone, router, loc) {
                    this.searchDevelopersServices = searchDevelopersServices;
                    this.mapsAPILoader = mapsAPILoader;
                    this.zone = zone;
                    this.router = router;
                    this.loc = loc;
                    this.hire = false;
                    this.currentPage = 1;
                    this.page = [];
                    this.filterConditions = {};
                }
                SearchDevelopersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var split = this.router.url.split('?');
                    var url = split[0];
                    var search = split[1] ? split[1].split('&') : [];
                    for (var i = 0; i < search.length; i++) {
                        var filter = search[i].split('=');
                        if (filter[0] === 'tech' || filter[0] === 'location') {
                            filter[1] = filter[1].split('%2C').join(', ');
                        }
                        filter[0] !== 'users' ? this[filter[0]] = filter[1] : false;
                    }
                    this.type = url === '/teams' ? 'Team' : 'Member';
                    this.getAllProfiles({ location: this.location, tech: this.tech, hire: this.hire, name: this.name });
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
                SearchDevelopersComponent.prototype.getAllProfiles = function (filter) {
                    var _this = this;
                    var filterConditions = this.currentPage != 1 ? { offset: (this.currentPage - 1) * 6 } : {};
                    for (var key in filter) {
                        if (filter[key]) {
                            if (key === 'tech' || key === 'location') {
                                var techList = filter[key].split(',');
                                filterConditions[key] = techList;
                                for (var i = 0; i < filterConditions[key].length; i++) {
                                    filterConditions[key][i] = filterConditions[key][i].trim();
                                }
                            }
                            else {
                                filterConditions[key] = filter[key];
                            }
                        }
                    }
                    var path = this.type === 'Member' ? '/developers' : '/teams';
                    this.router.navigate([path], { queryParams: filterConditions });
                    this.filterConditions = filterConditions;
                    filterConditions.type = this.type;
                    this.searchDevelopersServices.getAllProfiles(filterConditions)
                        .subscribe(function (data) {
                        _this.users = data.rows;
                        _this.count = data.count;
                        _this.page = data.count / 6 >= 5 ? Array(5).fill().map(function (x, i) { return i + 1; }) : Array(Math.ceil(data.count / 6)).fill().map(function (x, i) { return i + 1; });
                    });
                };
                SearchDevelopersComponent.prototype.clearSearch = function () {
                    document.getElementById('search-form').reset();
                    this.getAllProfiles();
                };
                SearchDevelopersComponent.prototype.selectPage = function (page) {
                    this.currentPage = page;
                    var path = this.type === 'Member' ? '/developers' : '/teams';
                    this.filterConditions.offset = (page - 1) * 6;
                    this.router.navigate([path], { queryParams: this.filterConditions });
                    this.getAllProfiles();
                    window.scrollTo(0, 0);
                };
                SearchDevelopersComponent = __decorate([
                    core_1.Component({
                        selector: 'searchDevelopers',
                        templateUrl: './client/app/components/searchDevelopers/searchDevelopers.html',
                        styleUrls: ['./client/app/components/searchDevelopers/searchDevelopers.css'],
                        providers: [searchDevelopers_services_js_1.SearchDevelopersServices]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof searchDevelopers_services_js_1.SearchDevelopersServices !== 'undefined' && searchDevelopers_services_js_1.SearchDevelopersServices) === 'function' && _a) || Object, core_2.MapsAPILoader, core_1.NgZone, router_1.Router, common_1.Location])
                ], SearchDevelopersComponent);
                return SearchDevelopersComponent;
                var _a;
            }());
            exports_1("SearchDevelopersComponent", SearchDevelopersComponent);
        }
    }
});
//# sourceMappingURL=searchDevelopers.component.js.map