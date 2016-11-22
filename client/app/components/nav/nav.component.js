System.register(['@angular/core', '../auth/auth.service', '../projectAdd/projectAdd.component.js'], function(exports_1, context_1) {
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
    var core_1, auth_service_1, projectAdd_component_js_1;
    var NavComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (projectAdd_component_js_1_1) {
                projectAdd_component_js_1 = projectAdd_component_js_1_1;
            }],
        execute: function() {
            NavComponent = (function () {
                function NavComponent(auth, add) {
                    this.auth = auth;
                    this.add = add;
                }
                // name = localStorage.getItem('name');
                // picture = localStorage.getItem('picture');
                NavComponent.prototype.ngOnInit = function () {
                    this.name = localStorage.getItem('name');
                    this.picture = localStorage.getItem('picture');
                };
                NavComponent = __decorate([
                    core_1.Component({
                        selector: 'nav',
                        templateUrl: './client/app/components/nav/nav.html',
                        styleUrls: ['./client/app/components/nav/nav.css'],
                        providers: [auth_service_1.AuthService, projectAdd_component_js_1.ProjectAddComponent]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, (typeof (_a = typeof projectAdd_component_js_1.ProjectAddComponent !== 'undefined' && projectAdd_component_js_1.ProjectAddComponent) === 'function' && _a) || Object])
                ], NavComponent);
                return NavComponent;
                var _a;
            }());
            exports_1("NavComponent", NavComponent);
        }
    }
});
//# sourceMappingURL=nav.component.js.map