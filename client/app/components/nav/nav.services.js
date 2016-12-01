System.register(['angular2-jwt', '@angular/http', '@angular/core'], function(exports_1, context_1) {
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
    var angular2_jwt_1, http_1, core_1;
    var NavService;
    return {
        setters:[
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            NavService = (function () {
                function NavService(authHttp, http) {
                    this.authHttp = authHttp;
                    this.http = http;
                }
                NavService.prototype.getNotifications = function () {
                    return this.authHttp.get('http://138.68.23.255:1337/api/notifications')
                        .map(function (res) { return res.json(); });
                };
                NavService.prototype.markAsRead = function () {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.authHttp.put('http://138.68.23.255:1337/api/notifications/view/', {}, options)
                        .map(function (res) { return res; });
                };
                NavService.prototype.decline = function (id) {
                    console.log(id);
                    return this.authHttp.delete('http://138.68.23.255:1337/api/team/leaveTeam/' + id)
                        .map(function (res) { return res; });
                };
                NavService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, http_1.Http])
                ], NavService);
                return NavService;
            }());
            exports_1("NavService", NavService);
        }
    }
});
//# sourceMappingURL=nav.services.js.map