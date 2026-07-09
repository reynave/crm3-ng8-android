import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  varKey: any = "";
  varToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 
    this.varToken = localStorage.getItem('tokenCrmCoId') || ""; 
  }


  getToken() {
     this.varToken = localStorage.getItem('tokenCrmCoId') || ""; 
    return this.varToken ? this.varToken : false;
  }

  checkSession(){
    return this.http.post<any>(environment.api + 'login/checkSession', {
      token: this.varToken, 
    })
  }

  setToken(value="") {
    localStorage.setItem("tokenCrmCoId",value);
    this.varToken = value;
    return value ? true:false;
  } 
 
  headers() { 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Key': this.varKey,
      'Token':  this.varToken,
    });
  }

  token() {
     this.varToken = localStorage.getItem('tokenCrmCoId') || "";
    return  this.varToken;
  }

  id_user() {
    return this.varToken;
  }

  errorConnection(){
    alert("Please check internet connection !"); 
    this.router.navigate(['/error/connection/']);
  }


  parseJwt(token: string): any {
    if (!token) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
      throw new Error("Format token tidak valid");
    }

    const payload = parts[1];

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    const decoded = atob(padded);

    return JSON.parse(decoded);
  }
}
