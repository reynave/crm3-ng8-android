import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login, Repass } from './login';
import { ConfigService } from './../service/config.service';
import { environment } from './../../environments/environment';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new Login("", "", false, "", "android");
  repass = new Repass("");
  loading: boolean = false;
  note: string;
  constructor(
    private configService: ConfigService,
    private route: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() { 
    if( this.configService.getToken()  ){ 
      this.configService.checkSession().subscribe(data=>{ 
        if(data['login'] == true){
          this.route.navigate(['home']);
        }else{
          this.note = 'Your session login is expired, please login again';
        }
      }); 
    }   
  }
  goHome(){
    $('#DialogIconedSuccess').modal('hide');
    this.route.navigate(['home']);
  }

  onSubmit() {
    this.loading = true
    this.http.post<any>(environment.api + 'login/signin', {
      email: this.model['email'],
      password: this.model['password'],
      remember: this.model['remember'],
      player_id: this.model['player_id'],
      device: this.model['device']
    }).subscribe(data => { 
      if (data['data']['login'] ) {
        $('#DialogIconedSuccess').modal('show');
        this.configService.setToken(data['data']['token']);
        this.loading = false;

      } else {
        this.loading = false;
        this.note = data['data']['note'];
      } 
    });

  }

  onResetPass(){
    this.loading = true;
    console.log(this.repass);
  }
}
