import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { CompanyService } from './../../services/company.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any;
  imagePath: string;

  constructor(
    private company: CompanyService,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.company.getEmail().then(result => {
      this.getData(result);
    });
  }

  getData(email) {
    this.company.getUserData(email).subscribe(res => {
      this.user = res.user;
    });
  }

  addImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 300,
      targetHeight: 300
    };

    this.camera.getPicture(options).then(imgUrl => {
      this.imagePath = 'data:image/jpeg;base64,' + imgUrl;

      this.company.uploadImage(this.user, this.imagePath).subscribe(res => {
        console.log(res);
      });
    });
  }

  addLogo(name) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 300,
      targetHeight: 300
    };

    this.camera.getPicture(options).then(imgUrl => {
      this.imagePath = 'data:image/jpeg;base64,' + imgUrl;

      this.company.uploadLogo(name._id, this.imagePath).subscribe(res => {
        console.log(res);
      });
    });
  }

}
