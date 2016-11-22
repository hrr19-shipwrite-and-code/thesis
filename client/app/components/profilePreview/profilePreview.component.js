System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var ProfilePreviewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProfilePreviewComponent = (function () {
                function ProfilePreviewComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ProfilePreviewComponent.prototype, "users", void 0);
                ProfilePreviewComponent = __decorate([
                    core_1.Component({
                        selector: 'profile-preview',
                        templateUrl: './client/app/components/profilePreview/profilePreview.html',
                        styleUrls: ['./client/app/components/profilePreview/profilePreview.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProfilePreviewComponent);
                return ProfilePreviewComponent;
            }());
            exports_1("ProfilePreviewComponent", ProfilePreviewComponent);
        }
    }
});
//# sourceMappingURL=profilePreview.component.js.map