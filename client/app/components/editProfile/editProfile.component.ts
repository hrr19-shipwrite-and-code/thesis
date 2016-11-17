import { Component } from '@angular/core';
import { EditProfileService } from './editProfile.services.js'

@Component({
  selector: 'editProfile',
  templateUrl: './client/app/components/editProfile/editProfile.html',
  styleUrls: ['./client/app/components/editProfile/editProfile.css'],
  providers: [EditProfileService],
})

export class EditProfileComponent {

  userInfo = {};

  constructor(private editProfileService: EditProfileService) {
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
  }
}
