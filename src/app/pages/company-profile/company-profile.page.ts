import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as _ from 'lodash';

import { CompanyService } from './../../services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePage implements OnInit {
  profile: any;
  user: any;

  constructor(
    private alerCtrl: AlertController,
    private company: CompanyService,
    private toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.profile = this.navParams.get('data');
    this.activatedRoute.queryParamMap
      .subscribe((paramsMap: Params) => {
        this.profile = JSON.parse(paramsMap.params.data);
      });
  }

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

  reviewPage(profile) {
    this.router.navigate(['/review'], { queryParams: {data: JSON.stringify(profile, null, 4)}});
  }

  viewReviews(profile) {
    this.router.navigate(['/view-reviews'], { queryParams: {companyData: JSON.stringify(profile, null, 4)}});
  }

  averageRating(arr) {
    if (arr.length <= 0) {
      return arr.length;
    } else {
      return this.roundValue(_.mean(arr));
    }
  }

  roundValue(value) {
    const factor = Math.pow(10, 1);
    return Math.round(value * factor) / factor;
  }

  ratingSum(arr) {
    if (arr.length <= 0) {
      return arr.length;
    } else {
      return _.sum(arr);
    }
  }

  async employeeRegister(profile) {
    const alert = await this.alerCtrl.create({
      header: 'Register as an employee',
      inputs: [
        {
          name: 'role',
          placeholder: 'Add Role'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          cssClass: 'alertCss',
          handler: data => {
            this.company
              .registerEmployee(profile, this.user, data.role)
              .subscribe(async res => {
                if (res.message) {
                  const toast = await this.toastCtrl.create({
                    message: res.message,
                    duration: 3000,
                    position: 'bottom'
                  });

                  await toast.present();
                }
              });
          }
        }
      ]
    });

    await alert.present();
  }

}
