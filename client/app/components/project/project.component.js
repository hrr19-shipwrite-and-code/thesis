System.register(['@angular/core', './project.services.js', '@angular/router', '../auth/auth.service'], function(exports_1, context_1) {
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
    var core_1, project_services_js_1, router_1, auth_service_1;
    var ProjectComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (project_services_js_1_1) {
                project_services_js_1 = project_services_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            ProjectComponent = (function () {
                function ProjectComponent(projectService, route, authService) {
                    this.projectService = projectService;
                    this.route = route;
                    this.authService = authService;
                    this.color = '#888B8D';
                    this.like = { color: this.color };
                }
                //Runs this function everytime route accessed
                ProjectComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        _this.id = params['id'];
                    });
                    this.getProject(this.id);
                    this.doesUserLike(this.id);
                    this.techs = this.projectService.getTech();
                };
                //Service function to get the project by the route params Id
                ProjectComponent.prototype.getProject = function (id) {
                    var _this = this;
                    this.projectService.getProject(id)
                        .subscribe(function (data) { return _this.project = data; }, function (err) { return _this.error = true; });
                };
                //Checks if the user already likes this project
                ProjectComponent.prototype.doesUserLike = function (id) {
                    var _this = this;
                    this.projectService.doesUserLike(id)
                        .subscribe(function (data) {
                        if (data.like)
                            _this.like.color = 'red';
                    }, function (err) { return err; });
                };
                //Service for liking/unliking a project
                ProjectComponent.prototype.likeProject = function (id) {
                    var _this = this;
                    this.projectService.likeProject(id)
                        .subscribe(function (data) {
                        if (data.like) {
                            _this.project.likes++;
                            _this.like.color = 'red';
                        }
                        else {
                            _this.project.likes--;
                            _this.like.color = '#888B8D';
                        }
                    }, function (err) { return _this.authService.login(); });
                };
                //Verify current user is owner of the project
                ProjectComponent.prototype.isOwner = function (projectOwner) {
                    var currentUser = localStorage.getItem('authId');
                    return currentUser === projectOwner ? true : false;
                };
                //Add tech to project
                ProjectComponent.prototype.addTech = function (event, tech) {
                    event.preventDefault();
                    for (var i = 0; i <= this.project.Teches.length; i++) {
                        if (i === this.project.Teches.length) {
                            var temp = {
                                name: tech.tech
                            };
                            this.project.Teches.push(temp);
                            this.projectService.addTech(temp);
                        }
                        if (this.project.Teches[i].name === tech.tech) {
                            return;
                        }
                    }
                };
                ProjectComponent.prototype.editDescription = function () {
                    document.getElementById('project-description').className += ' display-none';
                    document.getElementById('project-description-input').className = '';
                };
                ProjectComponent.prototype.editDescriptionPost = function (event, input) {
                    event.preventDefault();
                    this.project.descripiton = input.descripiton;
                    document.getElementById('project-description').className = 'description';
                    document.getElementById('project-description-input').className = 'display-none';
                    this.projectService.editDescription(input.description);
                    //Post comment and add comment to view
                    postComment(comment);
                    {
                        console.log(comment, this.id);
                        this.projectService.postComment(comment, this.id)
                            .subscribe(function (data) {
                            console.log(data);
                        });
                        this.comment = '';
                    }
                };
                ProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'project',
                        templateUrl: './client/app/components/project/project.html',
                        styleUrls: ['./client/app/components/project/project.css'],
                        providers: [project_services_js_1.ProjectService, auth_service_1.AuthService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof project_services_js_1.ProjectService !== 'undefined' && project_services_js_1.ProjectService) === 'function' && _a) || Object, router_1.ActivatedRoute, auth_service_1.AuthService])
                ], ProjectComponent);
                return ProjectComponent;
                var _a;
            }());
            exports_1("ProjectComponent", ProjectComponent);
        }
    }
});
//# sourceMappingURL=project.component.js.map