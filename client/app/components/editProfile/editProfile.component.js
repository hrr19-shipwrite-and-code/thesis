System.register(['@angular/core', './editProfile.services.js', '@angular/router', 'angular2-google-maps/core'], function(exports_1, context_1) {
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
    var core_1, editProfile_services_js_1, router_1, core_2;
    var EditProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (editProfile_services_js_1_1) {
                editProfile_services_js_1 = editProfile_services_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            EditProfileComponent = (function () {
                function EditProfileComponent(editProfileService, router, mapsAPILoader, zone) {
                    this.editProfileService = editProfileService;
                    this.router = router;
                    this.mapsAPILoader = mapsAPILoader;
                    this.zone = zone;
                    this.userInfo = {};
                    this.picture = '';
                    this.options = {
                        url: 'http://localhost:1337/api/user/addPicture',
                        filterExtensions: true,
                        allowedExtensions: ['image/png', 'image/jpg'],
                        calculateSpeed: true,
                        authToken: localStorage.getItem('id_token'),
                        authTokenPrefix: 'Bearer'
                    };
                }
                EditProfileComponent.prototype.ngOnInit = function () {
                    this.getUserInfo();
                    // this.mapsAPILoader.load().then(() => {
                    //   let input = document.getElementById('location')
                    //   let autocomplete = new google.maps.places.Autocomplete(input, {
                    //     types: ['(cities)']
                    //   });
                    //   autocomplete.addListener("place_changed", () => {
                    //     this.zone.run(() => {
                    //       this.userInfo.location = autocomplete.getPlace().formatted_address
                    //     });
                    //   });
                    // });
                };
                EditProfileComponent.prototype.getUserInfo = function () {
                    var _this = this;
                    this.editProfileService.getUserInfo()
                        .subscribe(function (data) {
                        _this.userInfo = data;
                        _this.picture = _this.userInfo.picture;
                        console.log(data);
                    });
                };
                EditProfileComponent.prototype.editUserInfo = function () {
                    var _this = this;
                    this.editProfileService.editUserInfo(this.userInfo)
                        .subscribe(function (data) {
                        _this.router.navigateByUrl('/profile/' + _this.userInfo.url);
                    });
                    localStorage.setItem("url", this.userInfo.url);
                    localStorage.setItem("name", this.userInfo.name);
                };
                EditProfileComponent.prototype.handleUpload = function (data) {
                    if (data && data.response) {
                        data = data.response;
                        localStorage.setItem("picture", data);
                    }
                };
                EditProfileComponent.prototype.handleChange = function (input) {
                    var img = document.createElement("img");
                    img.src = window.URL.createObjectURL(input.files[0]);
                    var reader = new FileReader();
                    var that = this;
                    reader.addEventListener("load", function (event) {
                        that.picture = event.target.result;
                    }, false);
                    reader.readAsDataURL(input.files[0]);
                };
                EditProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'editProfile',
                        templateUrl: './client/app/components/editProfile/editProfile.html',
                        styleUrls: ['./client/app/components/editProfile/editProfile.css'],
                        providers: [editProfile_services_js_1.EditProfileService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof editProfile_services_js_1.EditProfileService !== 'undefined' && editProfile_services_js_1.EditProfileService) === 'function' && _a) || Object, router_1.Router, core_2.MapsAPILoader, core_1.NgZone])
                ], EditProfileComponent);
                return EditProfileComponent;
                var _a;
            }());
            exports_1("EditProfileComponent", EditProfileComponent);
        }
    }
});
//# sourceMappingURL=editProfile.component.js.map