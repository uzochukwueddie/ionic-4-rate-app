import { CompanyService } from './services/company.service';
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user: any;
  pages: any[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private company: CompanyService
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', url: '/home', icon: 'home' },
      {
        title: 'Create Company',
        url: '/create-company',
        icon: 'create'
      },
      { title: 'Companies', url: '/companies', icon: 'list-box' },
      { title: 'Search', url: '/search', icon: 'search' },
      { title: 'Leaderboard', url: '/leaderboard', icon: 'archive' }
    ];

    this.company.getEmail().then(result => {
      if (result === null) {
        this.navCtrl.navigateRoot('/login');
      }

      if (result !== null) {
        this.company.getUserData(result)
          .subscribe(res => {
            this.user = res.user;
            this.navCtrl.navigateRoot('/home');
          }, () => {
            this.navCtrl.navigateRoot('/login');
          });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // openPage(page) {
  //   if (page.component === 'HomePage') {
  //     this.nav.setRoot(page.component);
  //   } else {
  //     this.nav.push(page.component);
  //   }
  // }

  settings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    this.storage.remove('useremail');
    this.navCtrl.navigateRoot('/login');
  }
}
