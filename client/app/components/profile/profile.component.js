System.register(['@angular/core', './profile.services.js', '../project/project.services.js', '@angular/router', 'angular2-google-maps/core'], function(exports_1, context_1) {
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
    var core_1, profile_services_js_1, project_services_js_1, router_1, router_2, core_2;
    var ProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profile_services_js_1_1) {
                profile_services_js_1 = profile_services_js_1_1;
            },
            function (project_services_js_1_1) {
                project_services_js_1 = project_services_js_1_1;
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
                function ProfileComponent(projectService, profileService, route, mapsAPILoader, zone, router) {
                    this.projectService = projectService;
                    this.profileService = profileService;
                    this.route = route;
                    this.mapsAPILoader = mapsAPILoader;
                    this.zone = zone;
                    this.router = router;
                    this.clientId = localStorage.getItem('url');
                    this.profileInfo = { Teches: [], Team: [], Member: [] };
                    this.newTech = '';
                    this.newMember = '';
                    this.urlTaken = false;
                    this.errAddMember = false;
                    this.invalidUrl = false;
                    this.editing = {
                        basic: false,
                        tech: false,
                        contact: false,
                        picture: false,
                        member: false
                    };
                    this.options = {
                        url: 'http://localhost:1337/api/user/addPicture',
                        filterExtensions: true,
                        allowedExtensions: ['image/png', 'image/jpeg', 'image/jpg'],
                        calculateSpeed: true,
                        authToken: localStorage.getItem('id_token'),
                        authTokenPrefix: 'Bearer'
                    };
                    this.techs = [];
                    this.memberType = '';
                }
                ProfileComponent.prototype.ngOnInit = function () {
                    window.scrollTo(0, 0);
                    this.getUserInfo();
                    this.getTechs();
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
                            if (data === null) {
                                _this.router.navigateByUrl('/notfound');
                            }
                            ;
                            _this.profileInfo = data;
                            _this.profileInfo.createdAt = moment(_this.profileInfo.createdAt).format('MMMM Do YYYY');
                            _this.profileInfo.picture = _this.profileInfo.picture + '?dummy=' + Date.now();
                            _this.getUserProjects(data.id);
                            _this.tempUrl = data.url;
                            if (data.type === 'Team') {
                                _this.options.url = 'http://localhost:1337/api/team/addPicture/' + _this.profileInfo.id;
                                for (var _i = 0, _a = _this.profileInfo.Member; _i < _a.length; _i++) {
                                    var member = _a[_i];
                                    if (member.url === _this.clientId) {
                                        return _this.memberType = member.TeamUsers.type;
                                    }
                                }
                            }
                            else {
                                _this.memberType = '';
                            }
                        }, function (err) { return _this.router.navigateByUrl('/notfound'); });
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
                ProfileComponent.prototype.trimmer = function () {
                    this.profileInfo.name = this.profileInfo.name.trim();
                };
                ProfileComponent.prototype.checkUrl = function (input, type) {
                    var options = { require_protocol: true };
                    for (var url in input) {
                        console.log(input[url]);
                        if (input[url] && !validator.isURL(input[url], options)) {
                            return this.invalidUrl = true;
                        }
                    }
                    this.invalidUrl = false;
                    this.updateUserInfo(input, type);
                };
                ProfileComponent.prototype.updateUserInfo = function (input, type) {
                    var _this = this;
                    if (input.url === this.profileInfo.url) {
                        return;
                    }
                    if (this.profileInfo.type === 'Team') {
                        return this.profileService.updateTeamProfile(this.profileInfo.id, input)
                            .subscribe(function (data) {
                            if (type === 'url') {
                                _this.urlTaken = false;
                                _this.router.navigateByUrl('/' + input.url);
                            }
                            else {
                                _this.editForm(type);
                            }
                        }, function (err) {
                            if (type === 'url') {
                                _this.urlTaken = true;
                            }
                        });
                    }
                    else {
                        if (type === 'basic') {
                            localStorage.setItem('name', input.name);
                        }
                        return this.profileService.updateUserProfile(input)
                            .subscribe(function (data) {
                            if (type === 'url') {
                                localStorage.setItem('url', input.url);
                                _this.clientId = localStorage.getItem('url');
                                _this.urlTaken = false;
                                _this.router.navigateByUrl('/' + input.url);
                            }
                            else {
                                _this.editForm(type);
                            }
                        }, function (err) {
                            if (type === 'url') {
                                _this.urlTaken = true;
                            }
                        });
                    }
                };
                ProfileComponent.prototype.editForm = function (key) {
                    this.editing[key] = !this.editing[key];
                };
                //Tech function
                ProfileComponent.prototype.getTechs = function () {
                    var _this = this;
                    this.projectService.getTech()
                        .subscribe(function (data) {
                        _this.techs = data;
                    });
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
                    if (this.profileInfo.type === 'Team') {
                        this.profileService.teamAddTech(this.profileInfo.id, newTech)
                            .subscribe(function (data) {
                            _this.profileInfo.Teches.push(data);
                        });
                    }
                    else {
                        this.profileService.userAddTech(newTech)
                            .subscribe(function (data) {
                            _this.profileInfo.Teches.push(data);
                        });
                    }
                    this.newTech = '';
                    this.editing.tech = !this.editing.tech;
                };
                ProfileComponent.prototype.deleteTech = function (event, techId) {
                    if (this.profileInfo.type === 'Team') {
                        this.profileService.teamDeleteTech(this.profileInfo.id, techId)
                            .subscribe(function (data) { });
                    }
                    else {
                        this.profileService.userDeleteTech(techId)
                            .subscribe(function (data) { });
                    }
                    for (var i = 0; i < this.profileInfo.Teches.length; i++) {
                        if (this.profileInfo.Teches[i].id == Number(techId)) {
                            return this.profileInfo.Teches.splice(i, 1);
                        }
                        ;
                    }
                    ;
                };
                //Image Upload function
                ProfileComponent.prototype.handleUpload = function (data) {
                    if (data && data.response && this.profileInfo.type === 'Member') {
                        data = JSON.parse(data.response);
                        localStorage.setItem("picture", data.picture + '?dummy=' + Date.now());
                    }
                };
                ProfileComponent.prototype.handleChange = function (input) {
                    var img = document.createElement("img");
                    img.src = window.URL.createObjectURL(input.files[0]);
                    var reader = new FileReader();
                    var that = this;
                    reader.addEventListener("load", function (event) {
                        that.profileInfo.picture = event.target.result;
                    }, false);
                    reader.readAsDataURL(input.files[0]);
                };
                //Manage Team function
                ProfileComponent.prototype.deleteTeam = function () {
                    var _this = this;
                    var choice = prompt('Enter the name of the team you wish to delete');
                    if (choice === this.profileInfo.name) {
                        this.profileService.deleteTeam(this.profileInfo.id)
                            .subscribe(function (data) {
                            _this.router.navigateByUrl('/' + _this.clientId);
                        });
                    }
                };
                ProfileComponent.prototype.joinTeam = function () {
                    var _this = this;
                    var response = confirm("Are you sure you want to join " + this.profileInfo.name + "?");
                    if (response) {
                        this.profileService.joinTeam(this.profileInfo.id)
                            .subscribe(function (data) {
                            data.TeamUsers = { type: 'Member' };
                            _this.memberType = 'Member';
                            _this.profileInfo.Member.push(data);
                        });
                    }
                };
                ProfileComponent.prototype.leaveTeam = function () {
                    var _this = this;
                    var response = confirm("Are you sure you want to leave " + this.profileInfo.name + "?");
                    if (response) {
                        this.profileService.leaveTeam(this.profileInfo.id)
                            .subscribe(function (data) {
                            _this.memberType = '';
                            for (var i = 0; i < _this.profileInfo.Member.length; i++) {
                                if (_this.profileInfo.Member[i].url === _this.clientId) {
                                    return _this.profileInfo.Member.splice(i, 1);
                                }
                            }
                        });
                    }
                };
                ProfileComponent.prototype.addMember = function () {
                    var _this = this;
                    this.profileService.addMember(this.profileInfo.id, this.newMember)
                        .subscribe(function (data) {
                        data.TeamUsers = { type: 'Pending' };
                        _this.profileInfo.Member.push(data);
                        _this.newMember = '';
                        _this.editing.member = !_this.editing.member;
                        _this.errAddMember = false;
                    }, function (err) { return _this.errAddMember = true; });
                };
                ProfileComponent.prototype.removeMember = function (userId, name) {
                    var _this = this;
                    var response = confirm("Are you sure you want to remove " + name + " from " + this.profileInfo.name + "?");
                    if (response) {
                        this.profileService.removeMember(this.profileInfo.id, userId)
                            .subscribe(function (data) {
                            for (var i = 0; i < _this.profileInfo.Member.length; i++) {
                                if (_this.profileInfo.Member[i].id === userId) {
                                    return _this.profileInfo.Member.splice(i, 1);
                                }
                            }
                        });
                    }
                };
                ProfileComponent.prototype.promoteMember = function (member) {
                    var _this = this;
                    var response = confirm("Are you sure you want to promote " + member.name + " to admin?");
                    if (response) {
                        this.profileService.promoteMember(this.profileInfo.id, member.id)
                            .subscribe(function (data) {
                            var index = _this.profileInfo.Member.indexOf(member);
                            _this.profileInfo.Member[index].TeamUsers.type = 'Admin';
                        });
                    }
                };
                ProfileComponent.prototype.demoteMember = function (member) {
                    var _this = this;
                    var response = confirm("Are you sure you want to demote " + member.name + " to member?");
                    if (response) {
                        this.profileService.demoteMember(this.profileInfo.id, member.id)
                            .subscribe(function (data) {
                            var index = _this.profileInfo.Member.indexOf(member);
                            _this.profileInfo.Member[index].TeamUsers.type = 'Member';
                        });
                    }
                };
                ProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: './client/app/components/profile/profile.html',
                        styleUrls: ['./client/app/components/profile/profile.css'],
                        providers: [profile_services_js_1.ProfileService, project_services_js_1.ProjectService],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof project_services_js_1.ProjectService !== 'undefined' && project_services_js_1.ProjectService) === 'function' && _a) || Object, (typeof (_b = typeof profile_services_js_1.ProfileService !== 'undefined' && profile_services_js_1.ProfileService) === 'function' && _b) || Object, router_1.ActivatedRoute, core_2.MapsAPILoader, core_1.NgZone, router_2.Router])
                ], ProfileComponent);
                return ProfileComponent;
                var _a, _b;
            }());
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
//# sourceMappingURL=profile.component.js.map