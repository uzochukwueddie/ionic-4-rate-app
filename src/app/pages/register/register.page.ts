import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { RegisterService } from './../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  fullname: string;
  email: string;
  password: string;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private router: Router,
    private reg: RegisterService
  ) {}

  loginPage() {
    this.router.navigate(['/login']);
  }

  async userSignup() {
    await this.showLoading();
    if (this.email === undefined || this.password === undefined || this.fullname === undefined) {
      this.loadingCtrl.dismiss();
      this.showAlert('Signup Error', 'You cannot submit empty fields');
      return;
    }
    this.reg.registerUser(this.fullname, this.email, this.password)
      .subscribe(res => {
        this.loadingCtrl.dismiss();
        if (res.user) {
          this.storage.set('useremail', res.user.email);
          this.router.navigate(['/home']);
        }
      }, err => {
        this.loadingCtrl.dismiss();
        this.showAlert('Signup Error', err.error.error);
      });

      this.fullname = '';
      this.password = '';
      this.email = '';
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
