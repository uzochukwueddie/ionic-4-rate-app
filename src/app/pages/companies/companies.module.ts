import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Ionic2RatingModule } from 'ionic2-rating';

import { CompaniesPage } from './companies.page';

const routes: Routes = [
  {
    path: '',
    component: CompaniesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ionic2RatingModule
  ],
  declarations: [CompaniesPage]
})
export class CompaniesPageModule {}
