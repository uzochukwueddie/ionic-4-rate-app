import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CompanyService } from './../../services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.page.html',
  styleUrls: ['./create-company.page.scss'],
})
export class CreateCompanyPage implements OnInit {
  name: string;
  address: string;
  city: string;
  country: string;
  sector: string;
  website: string;
  userId: any;

  constructor(
    private company: CompanyService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.company.getEmail().then(result => {
      this.getData(result);
    });
  }

  getData(email) {
    this.company.getUserData(email).subscribe(res => {
      this.userId = res.user._id;
    });
  }

  register() {
    this.company
      .createCompany(
        this.name,
        this.address,
        this.city,
        this.country,
        this.sector,
        this.website,
        this.userId
      )
      .subscribe(async res => {
        if (res.message) {
          const toast = await this.toastCtrl.create({
            message: res.message,
            duration: 3000,
            position: 'bottom'
          });
          await toast.present();
        }

        if (res.error) {
        }
      }, async err => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          subHeader: err.error.error,
          buttons: ['OK']
        });
        await alert.present();
      });

    this.name = '';
    this.address = '';
    this.city = '';
    this.sector = '';
    this.website = '';
    this.country = '';
  }

}
