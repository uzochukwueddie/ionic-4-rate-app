import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  culture: number;
  benefits: number;
  balance: number;
  speed: number;
  overall: number;
  review: string;
  userId: any;

  companyProfile: any;
  name: string;

  constructor(
    private company: CompanyService,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap
      .subscribe((paramsMap: Params) => {
        this.companyProfile = JSON.parse(paramsMap.params.data);
        this.name = this.companyProfile.companyname;
      });
  }

  ngOnInit() {
    this.company.getEmail().then(result => {
      this.getData(result);
    });
  }

  addReview() {
    this.company
      .addCompanyReview(
        this.companyProfile._id,
        this.culture,
        this.benefits,
        this.balance,
        this.speed,
        this.overall,
        this.review,
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
          const toast = await this.toastCtrl.create({
            message: res.error,
            duration: 3000,
            position: 'bottom'
          });

         await toast.present();
        }
      });

    this.review = '';
  }

  getData(email) {
    this.company.getUserData(email).subscribe(res => {
      if (res.user !== null) {
        this.userId = res.user._id;
      }
    });
  }

}
