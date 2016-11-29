System.register(['@angular/core', '@angular/router', './projectAdd.services.js', '../profile/profile.services.js'], function(exports_1, context_1) {
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
    var core_1, router_1, projectAdd_services_js_1, profile_services_js_1;
    var ProjectAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (projectAdd_services_js_1_1) {
                projectAdd_services_js_1 = projectAdd_services_js_1_1;
            },
            function (profile_services_js_1_1) {
                profile_services_js_1 = profile_services_js_1_1;
            }],
        execute: function() {
            ProjectAddComponent = (function () {
                function ProjectAddComponent(projectService, profileService, router) {
                    this.projectService = projectService;
                    this.profileService = profileService;
                    this.router = router;
                    this.userUrl = localStorage.getItem('url');
                    this.defaultValue = 'Completed';
                    this.owner = '';
                    this.userInfo = {};
                    this.repos = [];
                    this.title = '';
                    this.github = '';
                    this.description = '';
                    this.username = 'default';
                    this.haveGithub = null;
                    this.selected = {};
                }
                ProjectAddComponent.prototype.ngOnInit = function () {
                    this.getProfileInfo();
                };
                ProjectAddComponent.prototype.addProject = function (data) {
                    var _this = this;
                    if (data.owner === this.userInfo.id) {
                        this.projectService.userCreateProject(data)
                            .subscribe(function (data) { return _this.router.navigateByUrl('/project/' + data.id); }, function (err) { return console.log(err); });
                    }
                    else {
                        this.projectService.teamCreateProject(data, data.owner)
                            .subscribe(function (data) { return _this.router.navigateByUrl('/project/' + data.id); }, function (err) { return console.log(err); });
                    }
                };
                ProjectAddComponent.prototype.getProfileInfo = function () {
                    var _this = this;
                    this.profileService.getProfileInfo(this.userUrl)
                        .subscribe(function (data) {
                        _this.userInfo = data;
                        _this.owner = data.id;
                    });
                };
                ProjectAddComponent.prototype.getGithubProject = function (gitUsername) {
                    var _this = this;
                    this.projectService.getGithubProject(gitUsername)
                        .subscribe(function (data) {
                        _this.repos = data;
                        _this.haveGithub = true;
                    });
                };
                ProjectAddComponent.prototype.handleChange = function (e) {
                    var check;
                    if (e.target.value === 'Member') {
                        check = this.userInfo.github;
                        this.selected = this.userInfo;
                    }
                    else {
                        check = this.userInfo.Team[e.target.value].github;
                        this.selected = this.userInfo.Team[e.target.value];
                    }
                    if (check) {
                        check = check.split('/');
                        this.getGithubProject(check[check.length - 1]);
                    }
                    else {
                        this.repos = [];
                        this.haveGithub = false;
                    }
                };
                ProjectAddComponent.prototype.handleChooseRepo = function (e, repoIndex) {
                    e.preventDefault();
                    var repo = this.repos[repoIndex];
                    this.github = repo.html_url;
                    this.title = repo.name;
                    this.description = repo.description;
                    this.owner = this.selected.id;
                };
                ProjectAddComponent = __decorate([
                    core_1.Component({
                        selector: 'project-add',
                        templateUrl: './client/app/components/projectAdd/projectAdd.html',
                        styleUrls: ['./client/app/components/projectAdd/projectAdd.css'],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof projectAdd_services_js_1.ProjectAddService !== 'undefined' && projectAdd_services_js_1.ProjectAddService) === 'function' && _a) || Object, (typeof (_b = typeof profile_services_js_1.ProfileService !== 'undefined' && profile_services_js_1.ProfileService) === 'function' && _b) || Object, router_1.Router])
                ], ProjectAddComponent);
                return ProjectAddComponent;
                var _a, _b;
            }());
            exports_1("ProjectAddComponent", ProjectAddComponent);
        }
    }
});
//# sourceMappingURL=projectAdd.component.js.map