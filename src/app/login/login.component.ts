import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login } from './login';
import { ConfigService } from './../service/config.service';
import { environment } from './../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new Login("", "", false, "", "android");
  loading: boolean = true;
  note: string;
  constructor(
    private configService: ConfigService,
    private route: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    console.log(this.configService.getToken());
    if( this.configService.getToken()  ){
      
      this.configService.checkSession().subscribe(data=>{
        console.log(data);
        if(data['login'] == true){
          this.route.navigate(['home']);
        }else{
          this.note = 'Your session login is expired, please login again';
        }
      });
 

    }   
  }

  onSubmit() {
    console.log(this.model);
    console.log(environment.api + 'login/signin');
    this.http.post<any>(environment.api + 'login/signin', {
      email: this.model['email'],
      password: this.model['password'],
      remember: this.model['remember'],
      player_id: this.model['player_id'],
      device: this.model['device']
    }).subscribe(data => {
      console.log(data);
      this.loading = false;
      if (data['data']['login'] ) {
        this.configService.setToken(data['data']['token']);
        this.route.navigate(['leads']);
      } else {
        this.note = data['data']['note'];
      }


    });

  }

}
