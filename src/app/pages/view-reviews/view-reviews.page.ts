import { ActivatedRoute, Params } from '@angular/router';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.page.html',
  styleUrls: ['./view-reviews.page.scss'],
})
export class ViewReviewsPage {
  company: any;

  constructor(
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap
      .subscribe((query: Params) => {
        this.company = JSON.parse(query.params.companyData);
      });
  }

  averageRating(arr) {
    if (arr.length === 0) {
      return arr.length;
    } else {
      return _.mean(arr);
    }
  }

  GetReviewTime = (time: number) => {
    return moment(time).fromNow();
  }

  async showAlert(rating) {
    const alert = await this.alertCtrl.create({
      header: 'Review',
      subHeader: rating.review,
      buttons: ['OK']
    });

    await alert.present();
  }

}
