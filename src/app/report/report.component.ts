import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ConfigService } from './../service/config.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  iconClass: string = "border text-center bg-white shadow-sm rounded py-1 mb-2";
  loading: boolean = true;

  links: any = [
    {
      routerLink: "lead",
      routerLink2: "converted",
      icon: "./assets/img/icon/archived.png",
      name: "Converted"
    },
     {
      routerLink: "lost",
      routerLink2: "",
      icon: "./assets/img/icon/lose.png",
      name: "Lose"
    },
  ]
 
  

  name: string = "Loading...";
  company: string = "Loading...";
  constructor(
    private configService: ConfigService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

}
