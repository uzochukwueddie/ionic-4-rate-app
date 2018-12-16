import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  registerUser(fullname, email, password): Observable<any> {
    return this.http.post(`${BASEURL}/signup/user`, {
      fullname: fullname,
      email: email,
      password: password
    });
  }

  loginUser(email, password): Observable<any> {
    return this.http.post(`${BASEURL}/login/user`, {
      email: email,
      password: password
    });
  }
}
