System.register(['angular2/core'], function(exports_1, context_1) {
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
    var HoverDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HoverDirective = (function () {
                function HoverDirective(el, renderer) {
                    this.el = el;
                    this.renderer = renderer;
                }
                HoverDirective.prototype.hover = function () {
                    this.renderer.setElementClass(this.el.nativeElement, 'hide', false);
                };
                HoverDirective.prototype.hoverStop = function () {
                    this.renderer.setElementClass(this.el.nativeElement, 'hide', true);
                };
                HoverDirective = __decorate([
                    core_1.Directive({
                        selector: '[hover]',
                        host: {
                            '(mouseover)': 'hover()',
                            '(mouseleave)': 'hoverStop()'
                        },
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], HoverDirective);
                return HoverDirective;
            }());
            exports_1("HoverDirective", HoverDirective);
        }
    }
});
//# sourceMappingURL=thumbnail-hover.directive.js.map