import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  varKey: string = "mXTSxrEKSErYnZb33LyBus5RpVtGNfcgEBqxp5Unk5azj4ZgdWfhkfVDKJ3KSLFG7DtecSehXe7Q67NGFWGehU3ANexas3ZbrkfU";
  varToken: string;

  constructor(
    private http: HttpClient,
  ) { 
    this.varToken = localStorage.getItem('cmr3ng8Token'); 
  }


  getToken() {
    return localStorage.getItem('cmr3ng8Token') ? localStorage.getItem('cmr3ng8Token') : false;
  }

  checkSession(){
    return this.http.post<any>(environment.api + 'login/checkSession', {
      token: localStorage.getItem('cmr3ng8Token'), 
    })
  }

  setToken(value="") {
    localStorage.setItem("cmr3ng8Token",value);
    return value ? true:false;
  } 
 
  headers() { 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Key': this.varKey,
      'Token': this.varToken,
    });
  }

  token() {
    return this.varToken;
  }

  id_user() {
    return this.varToken;
  }

}
