import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';


@Injectable()
export class ProfileService {
  constructor(private authHttp: AuthHttp) {}

  getProfileInfo(url){
    return this.authHttp.get('http://localhost:1337/api/profile/' + url)
    .map(res => res.json())
  }

  getProjects(){
    return [
      {projectName: 'Some Project Name', userName: 'Jacob', views: 0, likes: 0, imgUrl: 'http://blog.teamtreehouse.com/wp-content/uploads/2013/10/test.png'},
      {projectName: 'Some Project Name', userName: 'Mike', views: 0, likes: 0, imgUrl: 'https://patriciasdesignsite.files.wordpress.com/2015/01/wireframe11.jpg'},
      {projectName: 'Some Project Name', userName: 'Nancy', views: 0, likes: 0, imgUrl: 'http://sharepoint.jsturges.com/files/2011/11/Contoso-Intranet-001-default-1024x623.png'},
      {projectName: 'Some Project Name', userName: 'Cameron', views: 0, likes: 0, imgUrl: 'https://media.balsamiq.com/img/examples/wiki-sketch.png'},
      {projectName: 'Some Project Name', userName: 'Jacob', views: 0, likes: 0, imgUrl: 'http://blogs.balsamiq.com/champions/files/2013/10/Bayside_wireframe_lg.png'},
      {projectName: 'Some Project Name', userName: 'Mike', views: 0, likes: 0, imgUrl: 'https://media.balsamiq.com/img/examples/boogle-sketch.png'},
      {projectName: 'Some Project Name', userName: 'Nancy', views: 0, likes: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png'},
      {projectName: 'Some Project Name', userName: 'Cameron', views: 0, likes: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png'},
      {projectName: 'Some Project Name', userName: 'Jacob', views: 0, likes: 0, imgUrl: 'https://daks2k3a4ib2z.cloudfront.net/img/site-placeholder@2x.png'}
    ]
  }
}
