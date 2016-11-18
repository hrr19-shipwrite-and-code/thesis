import { Component } from '@angular/core';
import { EditProfileService } from './editProfile.services.js';
import { Router } from '@angular/router';


@Component({
  selector: 'editProfile',
  templateUrl: './client/app/components/editProfile/editProfile.html',
  styleUrls: ['./client/app/components/editProfile/editProfile.css'],
  providers: [EditProfileService]
})

export class EditProfileComponent {

  userInfo = {};
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:1337/api/user/addPicture'
  };

  constructor(private editProfileService: EditProfileService, private router: Router) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.editProfileService.getUserInfo()
      .subscribe( data => {
          this.userInfo = data;
          console.log(data)
        });
  }

  editUserInfo(userInfo) {
    this.editProfileService.editUserInfo(userInfo)
      .subscribe( data => {
          console.log(data)
        });
    localStorage.setItem("url", userInfo.url);
    this.router.navigateByUrl('/profile/' + userInfo.url);
  }


  handleUpload(data): void {
    if (data && data.response) {
      data = data.response;
      this.uploadFile = data;
    }
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
}
}
