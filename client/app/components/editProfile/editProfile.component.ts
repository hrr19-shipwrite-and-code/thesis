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
  picture: any = '';
  options: Object = {
    url: 'http://localhost:1337/api/user/addPicture',
    filterExtensions: true,
    allowedExtensions: ['image/png', 'image/jpg'],
    calculateSpeed: true,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: 'Bearer'
  };


  constructor(private editProfileService: EditProfileService, private router: Router) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.editProfileService.getUserInfo()
      .subscribe( data => {
          this.userInfo = data;
          this.picture = this.userInfo.picture
          console.log(data)
        });
  }

  editUserInfo(userInfo) {
    this.editProfileService.editUserInfo(userInfo)
      .subscribe( data => {
        this.router.navigateByUrl('/profile/' + userInfo.url);
       });
      localStorage.setItem("url", userInfo.url);
      localStorage.setItem("name", userInfo.name);
  }


  handleUpload(data): void {
    if (data && data.response) {
      data = data.response;
      localStorage.setItem("picture", data);
    }
  }

  handleChange(input) {
    let img = document.createElement("img");
    img.src = window.URL.createObjectURL(input.files[0]);

    const reader = new FileReader();
    const that = this;

    reader.addEventListener("load", (event) => {
      that.picture = event.target.result;
    }, false);

    reader.readAsDataURL(input.files[0]);
  }
}
