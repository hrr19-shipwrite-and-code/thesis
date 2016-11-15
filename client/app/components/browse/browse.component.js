System.register(['@angular/core', './browse.services.js'], function(exports_1, context_1) {
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
    var core_1, browse_services_js_1;
    var BrowseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browse_services_js_1_1) {
                browse_services_js_1 = browse_services_js_1_1;
            }],
        execute: function() {
            BrowseComponent = (function () {
                function BrowseComponent(browseService, el, renderer) {
                    this.el = el;
                    this.renderer = renderer;
                    this.filteredTech = [];
                    this.techs = browseService.getTech();
                }
                BrowseComponent.prototype.addTechToSearch = function (tech) {
                    if (this.filteredTech.indexOf(tech) === -1) {
                        this.renderer.setElementClass(this.el.nativeElement, 'selected', true);
                        this.filteredTech.push(tech);
                    }
                    else {
                        this.renderer.setElementClass(this.el.nativeElement, 'selected', false);
                        var index = this.filteredTech.indexOf(tech);
                        this.filteredTech.splice(index, index + 1);
                    }
                    console.log(this.filteredTech);
                };
                BrowseComponent = __decorate([
                    core_1.Component({
                        selector: 'browse',
                        templateUrl: './client/app/components/browse/browse.html',
                        providers: [browse_services_js_1.BrowseService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof browse_services_js_1.BrowseService !== 'undefined' && browse_services_js_1.BrowseService) === 'function' && _a) || Object, core_1.ElementRef, core_1.Renderer])
                ], BrowseComponent);
                return BrowseComponent;
                var _a;
            }());
            exports_1("BrowseComponent", BrowseComponent);
        }
    }
});
//# sourceMappingURL=browse.component.js.map