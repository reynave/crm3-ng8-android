import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
import { ConfigService } from './../../service/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error-connection',
  templateUrl: './error-connection.component.html',
  styleUrls: ['./error-connection.component.css']
})
export class ErrorConnectionComponent implements OnInit {
  loading:boolean = false;
  constructor(
    private configService: ConfigService,
    private route: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    
  }

  reconnecting(){
    this.configService.checkSession().subscribe(data=>{ 
       if(data['login'] == true){
         this.route.navigate(['home']);
       }
    },error =>{
      this.loading = false;
    });
  }
  

}
