import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  companyname: string;

  searchResults = [];
  showList = true;
  showResults = [];
  results = false;
  noResults = false;

  constructor(
    private company: CompanyService,
    private router: Router
  ) {}

  searchCompany() {
    if (!this.companyname) {
      this.showList = false;
      return;
    }
    this.showList = true;
    this.company.searchCompany(this.companyname)
      .subscribe(res => {
        if (res.results.length > 0) {
          this.results = true;
          this.noResults = false;
          this.showResults = res.results;
          this.searchResults = res.results;
        } else {
          this.results = false;
          this.noResults = true;
          this.showResults = res.results;
          this.searchResults = [{'companyname': 'No result found'}];
        }
      }, err => {
        this.results = false;
        this.noResults = true;
        this.showResults = [];
        this.searchResults = [{'companyname': 'No result found'}];
      });
  }

  onCancel(event) {
    this.showList = false;
  }

  onClear(event) {
    this.showList = false;
  }

  companyProfile(company) {
    this.showList = false;
    this.companyname = '';
    this.router.navigate(['/company-profile'], {queryParams: {data: JSON.stringify(company, null, 4)}});
  }

}
