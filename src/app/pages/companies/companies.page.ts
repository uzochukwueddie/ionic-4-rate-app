import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CompanyService } from './../../services/company.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {
  companies = [];
  rating: number;

  constructor(
    private company: CompanyService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.company.getCompanies()
      .subscribe(res => {
        this.companies = res.result;
      });
  }

  companyProfile(company) {
    this.router.navigate(['/company-profile'], {queryParams: {data: JSON.stringify(company, null, 4)}});
  }

  averageRating(number) {
    if (number.length <= 0) {
      this.rating = number.length;
    } else {
      this.rating = _.mean(number);
    }

    return this.roundValue(this.rating);
  }

  roundValue(value) {
    const factor = Math.pow(10, 1);
    return Math.round(value * factor) / factor;
  }

}
