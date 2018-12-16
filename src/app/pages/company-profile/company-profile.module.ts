import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompanyProfilePage } from './company-profile.page';
import { Ionic2RatingModule } from 'ionic2-rating';
import { NewratingModule } from 'src/app/components/newrating/newrating.module';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ionic2RatingModule,
    NewratingModule,
  ],
  declarations: [CompanyProfilePage]
})
export class CompanyProfilePageModule {}
