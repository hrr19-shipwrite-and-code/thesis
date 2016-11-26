System.register(['@angular/core', '@angular/router', '../profile/profile.component.js', '../createTeam/createTeam.component.js', '../project/project.component.js', '../browse/browse.component.js', '../home/home.component.js', '../projectAdd/projectAdd.component.js', '../SearchDevelopers/SearchDevelopers.component.js'], function(exports_1, context_1) {
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
    var core_1, router_1, profile_component_js_1, createTeam_component_js_1, project_component_js_1, browse_component_js_1, home_component_js_1, projectAdd_component_js_1, SearchDevelopers_component_js_1;
    var appRoutes, AppRoutingModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (profile_component_js_1_1) {
                profile_component_js_1 = profile_component_js_1_1;
            },
            function (createTeam_component_js_1_1) {
                createTeam_component_js_1 = createTeam_component_js_1_1;
            },
            function (project_component_js_1_1) {
                project_component_js_1 = project_component_js_1_1;
            },
            function (browse_component_js_1_1) {
                browse_component_js_1 = browse_component_js_1_1;
            },
            function (home_component_js_1_1) {
                home_component_js_1 = home_component_js_1_1;
            },
            function (projectAdd_component_js_1_1) {
                projectAdd_component_js_1 = projectAdd_component_js_1_1;
            },
            function (SearchDevelopers_component_js_1_1) {
                SearchDevelopers_component_js_1 = SearchDevelopers_component_js_1_1;
            }],
        execute: function() {
            appRoutes = [
                { path: '', component: home_component_js_1.HomeComponent },
                { path: 'browse', component: browse_component_js_1.BrowseComponent },
                { path: 'addproject', component: projectAdd_component_js_1.ProjectAddComponent },
                { path: 'project/:id', component: project_component_js_1.ProjectComponent },
                { path: 'createteam', component: createTeam_component_js_1.CreateTeamComponent },
                { path: 'developers', component: SearchDevelopers_component_js_1.SearchDevelopersComponent },
                { path: ':id', component: profile_component_js_1.ProfileComponent },
            ];
            AppRoutingModule = (function () {
                function AppRoutingModule() {
                }
                AppRoutingModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            router_1.RouterModule.forRoot(appRoutes)
                        ],
                        exports: [
                            router_1.RouterModule
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppRoutingModule);
                return AppRoutingModule;
            }());
            exports_1("AppRoutingModule", AppRoutingModule);
        }
    }
});
//# sourceMappingURL=app-routing.module.js.map