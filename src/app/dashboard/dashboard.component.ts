import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ConfigService } from './../service/config.service';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  iconClass: string = "border text-center bg-white shadow-sm rounded py-1 mb-2";
  loading: boolean = true;
  event: any = [];
  visit: any = [];
  recentwins: any = [];
  recentQuotation: any = [];
  currency: string;
  user:any =[];
  id: string = "0";
  links: any = [
    {
      routerLink: "dashLead",
      icon: "./assets/img/icon/pie-chart.png",
      name: "Leads"
    },
    {
      routerLink: "dashSales",
      icon: "./assets/img/icon/bar.png",
      name: "Sales"
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
    this.localData();
    
  }

  localData() {
    if ( localStorage.getItem("crm3.home.dat") ) {


      const data = JSON.parse(localStorage.getItem("crm3.home.dat"));
      this.currency = data['result']['currency'];
      this.event = data['result']['event'];
      this.visit = data['result']['visit'];
      this.recentwins = data['result']['recentwins'];
      this.recentQuotation = data['result']['recentQuotation'];
      this.name = data['result']['user']['name'];
      this.company = data['result']['user']['company'];
    }
  }
  

  logout() {
    localStorage.removeItem("cmr3ng8Token");
    $('#sidebarPanel').modal("hide");
    window.location.href = '';
  }

}
