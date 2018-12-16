import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './../../services/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;

  constructor(
    private company: CompanyService,
    private router: Router
  ) {}

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

  reviewPage() {
    this.router.navigate(['/review']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  addCompany() {
    this.router.navigate(['/create-company']);
  }

}
