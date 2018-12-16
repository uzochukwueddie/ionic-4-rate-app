import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private storage: Storage) {}

  getUserData(email): Observable<any> {
    return this.http.get(`${BASEURL}/home/${email}`);
  }

  async getEmail() {
    return await this.storage.get('useremail');
  }

  createCompany(
    name,
    address,
    city,
    country,
    sector,
    website,
    userId?
  ): Observable<any> {
    return this.http.post(`${BASEURL}/company/create`, {
      name,
      address,
      city,
      country,
      sector,
      website,
      userId
    });
  }

  getCompanies(): Observable<any> {
    return this.http.get(`${BASEURL}/companies/all`);
  }

  addCompanyReview(
    companyId,
    culture,
    benefits,
    balance,
    speed,
    overall,
    review,
    userId
  ): Observable<any> {
    return this.http.post(`${BASEURL}/company/review`, {
      companyId,
      culture,
      benefits,
      balance,
      speed,
      overall,
      review,
      userId
    });
  }

  registerEmployee(company, user, role): Observable<any> {
    return this.http.post(`${BASEURL}/register/employee`, {
      company: company,
      user: user,
      role: role
    });
  }

  uploadImage(user, image): Observable<any> {
    return this.http.post(`${BASEURL}/v1/profile/upload`, {
      user: user,
      image: image
    });
  }

  uploadLogo(id, image): Observable<any> {
    return this.http.post(`${BASEURL}/v1/company/upload`, {
      company: id,
      image: image
    });
  }

  searchCompany(company): Observable<any> {
    return this.http.post(`${BASEURL}/search-company`, {
      company: company
    });
  }

  leaderBoard(): Observable<any> {
    return this.http.get(`${BASEURL}/companies/leaderboard`);
  }
}
