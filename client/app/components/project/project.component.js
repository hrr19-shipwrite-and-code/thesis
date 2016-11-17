System.register(['@angular/core', './project.services.js', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, project_services_js_1, router_1;
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
            }],
        execute: function() {
            ProjectComponent = (function () {
                function ProjectComponent(projectService, route) {
                    this.projectService = projectService;
                    this.route = route;
                }
                //Runs this function everytime route accessed
                ProjectComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        _this.id = params['id'];
                    });
                    //Uncomment below for Dummy Data
                    //this.project = this.projectService.getProject(this.id)
                    //Uncomment below Actual API Call
                    this.getProject(this.id);
                };
                //Service function to get the project by the route params Id
                ProjectComponent.prototype.getProject = function (id) {
                    var _this = this;
                    this.projectService.getProject(id)
                        .subscribe(function (data) { return _this.project = data; }, function (err) { return _this.error = true; });
                };
                ProjectComponent.prototype.likeProject = function (id) {
                    console.log(this.project.likes);
                    this.project.likes++;
                    this.projectService.likeProject(id);
                };
                ProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'project',
                        templateUrl: './client/app/components/project/project.html',
                        styleUrls: ['./client/app/components/project/project.css'],
                        providers: [project_services_js_1.ProjectService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof project_services_js_1.ProjectService !== 'undefined' && project_services_js_1.ProjectService) === 'function' && _a) || Object, router_1.ActivatedRoute])
                ], ProjectComponent);
                return ProjectComponent;
                var _a;
            }());
            exports_1("ProjectComponent", ProjectComponent);
        }
    }
});
//# sourceMappingURL=project.component.js.map