import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { RegisterService } from './../../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;

  loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private router: Router,
    private reg: RegisterService
  ) {}

  registerPage() {
    this.router.navigate(['/register']);
  }

  async login() {
    await this.showLoading();
    if (this.email === undefined || this.password === undefined) {
      this.loadingCtrl.dismiss();
      this.showAlert('Login Error', 'You cannot submit empty fields');
      return;
    }
    this.reg.loginUser(this.email, this.password).subscribe(
      res => {
        this.loadingCtrl.dismiss();
        if (res.user) {
          this.storage.set('useremail', res.user.email);
          this.router.navigate(['/home']);
        }
      },
      err => {
        this.loadingCtrl.dismiss();
        this.showAlert('Login Error', err.error.error);
      });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating...',
      spinner: 'crescent',
      duration: 3000
    });

    return await loading.present();
  }

  async showAlert(header, subHeader) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      buttons: ['OK']
    });

    return await alert.present();
  }

}
