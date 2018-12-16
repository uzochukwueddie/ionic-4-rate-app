import { Component, OnInit } from '@angular/core';

import { CompanyService } from './../../services/company.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  companies = [];

  constructor(private company: CompanyService) { }

  ngOnInit() {
    this.company.leaderBoard()
      .subscribe(res => {
        this.companies = res.result;
      });
  }

}
