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
                function ProjectComponent(projectService, route, authService, router) {
                    this.projectService = projectService;
                    this.route = route;
                    this.authService = authService;
                    this.router = router;
                    this.color = '#888B8D';
                    this.like = { color: this.color };
                    this.newComment = '';
                    this.comments = [];
                    this.techs = [];
                    this.newTech = '';
                    this.picture = { url: '/client/app/assets/thumbnail.png' };
                    this.options = {
                        filterExtensions: true,
                        allowedExtensions: ['image/png', 'image/jpeg', 'image/jpg', 'gif'],
                        authToken: localStorage.getItem('id_token'),
                        authTokenPrefix: 'Bearer'
                    };
                    this.editDescrip = false;
                    this.editTitle = false;
                    this.editTech = false;
                    this.editGithub = false;
                    this.editDeploy = false;
                    this.editProgress = false;
                    this.editSource = false;
                    this.team = false;
                    this.imgError = false;
                    this.memberType = '';
                    this.githubErr = false;
                    this.deployErr = false;
                }
                //Runs this function everytime route accessed
                ProjectComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        _this.id = params['id'];
                    });
                    window.scrollTo(0, 0);
                    this.getProject(this.id);
                    this.getComment(this.id);
                    this.doesUserLike(this.id);
                    this.getAllTech();
                    this.options.url = 'http://138.68.23.255:1337/api/project/upload/user/' + this.id;
                    ;
                };
                //Service function to get the project by the route params Id
                ProjectComponent.prototype.getProject = function (id) {
                    var _this = this;
                    this.projectService.getProject(id)
                        .subscribe(function (data) {
                        if (data.Images.length > 0) {
                            _this.picture = data.Images[0];
                        }
                        data.createdAt = moment(data.createdAt).format('MMMM Do YYYY');
                        _this.determineOpenSource(data.openSource);
                        _this.project = data;
                        if (data.Profile.Member.length > 0) {
                            _this.options.url = 'http://138.68.23.255:1337/api/project/upload/team/' + data.Profile.id + '/' + _this.id;
                            _this.team = true;
                        }
                        for (var _i = 0, _a = data.Profile.Member; _i < _a.length; _i++) {
                            var member = _a[_i];
                            if (member.url === localStorage.getItem('url')) {
                                //this.options.url = ???
                                return _this.memberType = member.TeamUsers.type;
                            }
                        }
                    }, function (err) { return _this.router.navigateByUrl('/notfound'); });
                };
                ProjectComponent.prototype.gotoUser = function () {
                    this.router.navigateByUrl('/' + this.project.Profile.url);
                };
                ProjectComponent.prototype.determineOpenSource = function (data) {
                    if (data) {
                        this.openSource = "Open source";
                    }
                    else {
                        this.openSource = "Not open source";
                    }
                };
                ProjectComponent.prototype.deleteProject = function () {
                    var _this = this;
                    var choice = prompt('Enter the projects the title of the project you wish to delete');
                    if (choice === this.project.title) {
                        if (this.memberType === '') {
                            this.projectService.deleteProject(this.id)
                                .subscribe(function (data) { return _this.router.navigateByUrl('/'); }, function (err) { return err; });
                        }
                        else {
                            this.projectService.teamDeleteProject(this.project.Profile.id, this.id)
                                .subscribe(function (data) { return _this.router.navigateByUrl('/'); }, function (err) { return err; });
                        }
                    }
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
                ProjectComponent.prototype.getAllTech = function () {
                    var _this = this;
                    this.projectService.getTech()
                        .subscribe(function (data) {
                        _this.techs = data;
                    });
                };
                //Add tech to project
                ProjectComponent.prototype.addTech = function () {
                    var _this = this;
                    for (var _i = 0, _a = this.project.Teches; _i < _a.length; _i++) {
                        var value = _a[_i];
                        if (value.name === this.newTech) {
                            return this.newTech = '';
                        }
                    }
                    var newTech = { name: this.newTech, id: this.project.id };
                    if (this.memberType === '') {
                        this.projectService.addTech(newTech)
                            .subscribe(function (data) {
                            _this.project.Teches.push(data);
                        });
                    }
                    else {
                        this.projectService.teamAddTech(this.project.Profile.id, newTech)
                            .subscribe(function (data) {
                            _this.project.Teches.push(data);
                        });
                    }
                    this.newTech = '';
                };
                ProjectComponent.prototype.deleteTech = function (event) {
                    if (this.memberType === '') {
                        this.projectService.deleteTech(event.target.id, this.project.id)
                            .subscribe(function (data) { });
                    }
                    else {
                        this.projectService.teamDeleteTech(this.project.Profile.id, event.target.id, this.project.id)
                            .subscribe(function (data) { });
                    }
                    for (var i = 0; i < this.project.Teches.length; i++) {
                        if (this.project.Teches[i].id == Number(event.target.id)) {
                            return this.project.Teches.splice(i, 1);
                        }
                        ;
                    }
                    ;
                };
                //Post comment and add comment to view
                ProjectComponent.prototype.postComment = function () {
                    var _this = this;
                    this.projectService.postComment({ comment: this.newComment }, this.id)
                        .subscribe(function (data) {
                        data.createdAt = moment(data.createdAt).format('MMMM Do YYYY');
                        data.Profile = {
                            name: localStorage.getItem('name'),
                            url: localStorage.getItem('url'),
                            picture: localStorage.getItem('picture')
                        };
                        _this.comments.unshift(data);
                        _this.project.comments++;
                    });
                    this.newComment = '';
                };
                //check if the comment is by the logged in user
                ProjectComponent.prototype.checkUser = function (url) {
                    return localStorage.getItem('url') === url;
                };
                //author of comment can delete their comment
                ProjectComponent.prototype.deleteComment = function (event, comment) {
                    this.projectService.deleteComment(event.target.id)
                        .subscribe(function (data) { });
                    var commentIndex = this.comments.indexOf(comment);
                    this.comments.splice(commentIndex, 1);
                    this.project.comments--;
                };
                ProjectComponent.prototype.getComment = function (id) {
                    var _this = this;
                    this.projectService.getComment(id)
                        .subscribe(function (data) {
                        data.forEach(function (comment) {
                            comment.createdAt = moment(data.createdAt).format('MMMM Do YYYY');
                        });
                        _this.comments = data;
                    });
                };
                //Image Upload function
                ProjectComponent.prototype.handleUpload = function (data) {
                    if (data && data.response) {
                        data = JSON.parse(data.response);
                        this.picture = data;
                        this.project.Images.push(data);
                        this.uploadFile = data;
                        this.imgError = false;
                    }
                };
                ProjectComponent.prototype.imageError = function () {
                    this.imgError = true;
                };
                //Set image as project thumbnail
                ProjectComponent.prototype.updateThumbnail = function () {
                    if (this.team) {
                        var data = this.picture;
                        this.projectService.setTeamThumb(this.id, this.project.Profile.id, data)
                            .subscribe(function (data) { return data; }, function (err) { return err; });
                    }
                    else {
                        var data = this.picture;
                        this.projectService.setAsThumb(this.id, data)
                            .subscribe(function (data) { return data; }, function (err) { return err; });
                    }
                };
                //Function to make thumbnail the large image
                ProjectComponent.prototype.setMainImage = function (img) {
                    this.picture = img;
                };
                //Delete image from database and page
                ProjectComponent.prototype.deleteImage = function (id) {
                    var _this = this;
                    if (this.team) {
                        this.projectService.deleteTeamImage(id, this.id, this.project.Profile.id)
                            .subscribe(function (data) {
                            for (var i = 0; i < _this.project.Images.length; i++) {
                                var img = _this.project.Images[i];
                                if (img.id === id) {
                                    _this.project.Images.splice(i, i + 1);
                                    _this.picture = _this.project.Images[0] || { url: '/client/app/assets/thumbnail.png' };
                                    if (_this.picture.url === '/client/app/assets/thumbnail.png') {
                                        _this.updateThumbnail();
                                    }
                                }
                            }
                        }, function (err) { return err; });
                    }
                    else {
                        this.projectService.deleteImage(id, this.id)
                            .subscribe(function (data) {
                            for (var i = 0; i < _this.project.Images.length; i++) {
                                var img = _this.project.Images[i];
                                if (img.id === id) {
                                    _this.project.Images.splice(i, i + 1);
                                    _this.picture = _this.project.Images[0] || { url: '/client/app/assets/thumbnail.png' };
                                    if (_this.picture.url === '/client/app/assets/thumbnail.png') {
                                        _this.updateThumbnail();
                                    }
                                }
                            }
                        }, function (err) { return err; });
                    }
                };
                //Checks whether to hide certain buttons
                ProjectComponent.prototype.checkForImages = function () {
                    return this.project.Images.length > 0;
                };
                ProjectComponent.prototype.urlChecker = function (url, type) {
                    var options = { require_protocol: true };
                    if (url.length > 0) {
                        if (!validator.isURL(url, options)) {
                            if (type === 'github') {
                                this.githubErr = true;
                            }
                            else if (type === 'deploy') {
                                this.deployErr = true;
                            }
                        }
                        else {
                            if (type === 'github') {
                                this.githubErr = false;
                            }
                            else if (type === 'deploy') {
                                this.deployErr = false;
                            }
                        }
                    }
                    else {
                        if (type === 'github') {
                            this.githubErr = false;
                        }
                        else if (type === 'deploy') {
                            this.deployErr = false;
                        }
                    }
                };
                ProjectComponent.prototype.editProject = function (event, input, type) {
                    var _this = this;
                    if (type === 'github') {
                        this.urlChecker(input.github, type);
                    }
                    else if (type === 'deploy') {
                        this.urlChecker(input.deploy, type);
                    }
                    if (type !== 'progress' && type !== 'contribute') {
                        event.preventDefault();
                    }
                    if (type === 'contribute') {
                        this.determineOpenSource(this.project.contribute);
                    }
                    if (type === 'github') {
                        if (this.githubErr) {
                            return;
                        }
                    }
                    if (type === 'deploy') {
                        if (this.deployErr) {
                            return;
                        }
                    }
                    this.project[type] = input[type];
                    if (this.memberType === '') {
                        this.projectService.editDescription(this.id, input)
                            .subscribe(function (data) { return _this.editingProject(type); }, function (err) { return err; });
                    }
                    else {
                        this.projectService.teamEditDescription(this.project.Profile.id, this.id, input)
                            .subscribe(function (data) { return _this.editingProject(type); }, function (err) { return err; });
                    }
                };
                ProjectComponent.prototype.trimTitle = function () {
                    this.project.title = this.project.title.trim();
                };
                ProjectComponent.prototype.editingProject = function (type) {
                    if (type === 'tech') {
                        return this.editTech = !this.editTech;
                    }
                    else if (type === 'description') {
                        this.editDescrip = !this.editDescrip;
                    }
                    else if (type === 'title') {
                        this.editTitle = !this.editTitle;
                    }
                    else if (type === 'github') {
                        this.editGithub = !this.editGithub;
                    }
                    else if (type === 'deploy') {
                        this.editDeploy = !this.editDeploy;
                    }
                    else if (type === 'progress') {
                        this.editProgress = !this.editProgress;
                    }
                    else if (type === 'contribute') {
                        this.editSource = !this.editSource;
                    }
                };
                ProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'project',
                        templateUrl: './client/app/components/project/project.html',
                        styleUrls: ['./client/app/components/project/project.css'],
                        providers: [project_services_js_1.ProjectService, auth_service_1.AuthService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof project_services_js_1.ProjectService !== 'undefined' && project_services_js_1.ProjectService) === 'function' && _a) || Object, router_1.ActivatedRoute, auth_service_1.AuthService, router_1.Router])
                ], ProjectComponent);
                return ProjectComponent;
                var _a;
            }());
            exports_1("ProjectComponent", ProjectComponent);
        }
    }
});
//# sourceMappingURL=project.component.js.map