System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', 'angular2-jwt', './app-routing.module', '@angular/http', 'ng2-uploader/ng2-uploader', "angular2-google-maps/core", '../nav/nav.component.js', '../profile/profile.component.js', '../createTeam/createTeam.component.js', '../project/project.component.js', '../browse/browse.component.js', './app.component.js', '../home/home.component.js', '../projectAdd/projectAdd.component.js', '../SearchDevelopers/SearchDevelopers.component.js', '../profilePreview/profilePreview.component.js', '../pageNotFound/pageNotFound.component.js', '../projectThumbnail/project-thumbnail.component.js', '../../directives/thumbnail-hover.directive.js', '../../directives/dropdown.directive.js', '../../directives/tech-hover.directive.js', '../../directives/new-project-model.directive.js', '../projectAdd/projectAdd.services.js', '../profile/profile.services.js'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, angular2_jwt_1, app_routing_module_1, http_1, ng2_uploader_1, core_2, nav_component_js_1, profile_component_js_1, createTeam_component_js_1, project_component_js_1, browse_component_js_1, app_component_js_1, home_component_js_1, projectAdd_component_js_1, SearchDevelopers_component_js_1, profilePreview_component_js_1, pageNotFound_component_js_1, project_thumbnail_component_js_1, thumbnail_hover_directive_js_1, dropdown_directive_js_1, tech_hover_directive_js_1, new_project_model_directive_js_1, projectAdd_services_js_1, profile_services_js_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (app_routing_module_1_1) {
                app_routing_module_1 = app_routing_module_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_uploader_1_1) {
                ng2_uploader_1 = ng2_uploader_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (nav_component_js_1_1) {
                nav_component_js_1 = nav_component_js_1_1;
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
            function (app_component_js_1_1) {
                app_component_js_1 = app_component_js_1_1;
            },
            function (home_component_js_1_1) {
                home_component_js_1 = home_component_js_1_1;
            },
            function (projectAdd_component_js_1_1) {
                projectAdd_component_js_1 = projectAdd_component_js_1_1;
            },
            function (SearchDevelopers_component_js_1_1) {
                SearchDevelopers_component_js_1 = SearchDevelopers_component_js_1_1;
            },
            function (profilePreview_component_js_1_1) {
                profilePreview_component_js_1 = profilePreview_component_js_1_1;
            },
            function (pageNotFound_component_js_1_1) {
                pageNotFound_component_js_1 = pageNotFound_component_js_1_1;
            },
            function (project_thumbnail_component_js_1_1) {
                project_thumbnail_component_js_1 = project_thumbnail_component_js_1_1;
            },
            function (thumbnail_hover_directive_js_1_1) {
                thumbnail_hover_directive_js_1 = thumbnail_hover_directive_js_1_1;
            },
            function (dropdown_directive_js_1_1) {
                dropdown_directive_js_1 = dropdown_directive_js_1_1;
            },
            function (tech_hover_directive_js_1_1) {
                tech_hover_directive_js_1 = tech_hover_directive_js_1_1;
            },
            function (new_project_model_directive_js_1_1) {
                new_project_model_directive_js_1 = new_project_model_directive_js_1_1;
            },
            function (projectAdd_services_js_1_1) {
                projectAdd_services_js_1 = projectAdd_services_js_1_1;
            },
            function (profile_services_js_1_1) {
                profile_services_js_1 = profile_services_js_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            core_2.AgmCoreModule.forRoot({
                                apiKey: "AIzaSyD9i3fvxLG9D3xsPzt3k8WnB2s1qxZiqM0",
                                libraries: ["places"]
                            }),
                            platform_browser_1.BrowserModule,
                            app_routing_module_1.AppRoutingModule,
                            http_1.HttpModule,
                            forms_1.FormsModule,
                            ng2_uploader_1.Ng2UploaderModule
                        ],
                        declarations: [
                            app_component_js_1.AppComponent,
                            home_component_js_1.HomeComponent,
                            nav_component_js_1.NavComponent,
                            profile_component_js_1.ProfileComponent,
                            createTeam_component_js_1.CreateTeamComponent,
                            project_component_js_1.ProjectComponent,
                            browse_component_js_1.BrowseComponent,
                            projectAdd_component_js_1.ProjectAddComponent,
                            SearchDevelopers_component_js_1.SearchDevelopersComponent,
                            profilePreview_component_js_1.ProfilePreviewComponent,
                            project_thumbnail_component_js_1.ProjectThumbnailComponent,
                            pageNotFound_component_js_1.PageNotFoundComponent,
                            thumbnail_hover_directive_js_1.HoverDirective,
                            tech_hover_directive_js_1.TechHoverDirective,
                            new_project_model_directive_js_1.AddProductModelDirective,
                            dropdown_directive_js_1.DropdownDirective
                        ],
                        bootstrap: [app_component_js_1.AppComponent],
                        providers: [
                            angular2_jwt_1.AUTH_PROVIDERS,
                            projectAdd_services_js_1.ProjectAddService,
                            profile_services_js_1.ProfileService
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map