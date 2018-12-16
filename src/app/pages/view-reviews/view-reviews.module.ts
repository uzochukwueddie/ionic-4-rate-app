import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NewratingModule } from './../../components/newrating/newrating.module';

import { ViewReviewsPage } from './view-reviews.page';
import { Ionic2RatingModule } from 'ionic2-rating';

const routes: Routes = [
  {
    path: '',
    component: ViewReviewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ionic2RatingModule,
    NewratingModule
  ],
  declarations: [ViewReviewsPage]
})
export class ViewReviewsPageModule {}
