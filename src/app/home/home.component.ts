import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ConfigService } from './../service/config.service';
//import { $ } from 'protractor';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
      routerLink: "activity",
      icon: "./assets/img/icon/activity.png",
      name: "Activities"
    },
    {
      routerLink: "lead",
      icon: "./assets/img/icon/lead.png",
      name: "Leads"
    },
    {
      routerLink: "contact",
      icon: "./assets/img/icon/contact.png",
      name: "Contacts"
    },
    {
      routerLink: "company",
      icon: "./assets/img/icon/company.png",
      name: "Companies"
    },
    {
      routerLink: "",
      icon: "./assets/img/icon/opportunity.png",
      name: "Opportunities"
    },
    {
      routerLink: "",
      icon: "./assets/img/icon/quotes.png",
      name: "Quotes"
    },

    {
      routerLink: "",
      icon: "./assets/img/icon/deal.png",
      name: "Deals"
    },
    {
      routerLink: "",
      icon: "./assets/img/icon/sales-order.png",
      name: "Sales Orders"
    },
    {
      routerLink: "priceList",
      icon: "./assets/img/icon/product.png",
      name: "Products"
    },

    {
      routerLink: " ",
      icon: "./assets/img/icon/report.png",
      name: "Reports"
    },

    {
      routerLink: "checkIn",
      icon: "./assets/img/icon/check-in.png",
      name: "Check In"
    },
    {
      routerLink: "checkOut",
      icon: "./assets/img/icon/check-out.png",
      name: "Check Out"
    },
     {
      routerLink: "dash",
      icon: "./assets/img/icon/dashboard.png",
      name: "Dashboard"
    },
  ]

  linksDashboard: any = [
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
    this.httpGet(0);
    this.jquery();
  }

  localData() {
    if ( localStorage.getItem("crm3.home.dat") ) {

  
      const data = JSON.parse(localStorage.getItem("crm3.home.dat"));
      console.log(data);
      this.currency = data['result']['currency'];
      this.event = data['result']['event'];
      this.visit = data['result']['visit'];
      this.recentwins = data['result']['recentwins'];
      this.recentQuotation = data['result']['recentQuotation'];
      this.company = data['result']['company']; 
      this.name = data['result']['name']; 
      
      this.user = data['result']['user'];
    }
  }
  onUser(id) {
    this.id = id;
    this.httpGet(id);
  }

  id_user_select: string;
  httpGet(id) {
    this.id_user_select = id;
    this.loading = true; 
    var url = environment.api + 'dashboard/home/?id=' + id;

    this.http.get<any>(url, {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);
      localStorage.setItem("crm3.home.dat", JSON.stringify(data));
      this.localData();

      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
     // this.configService.errorConnection();
    });
  }

  jquery() {
    $('.carousel-multiple').owlCarousel({
      stagePadding: 32,
      margin: 16,
      nav: false,
      items: 1,
      dots: true,
      responsiveClass: true,
    });
  }

  logout() {
    localStorage.removeItem("cmr3ng8Token");
    localStorage.removeItem("crm3.home.dat");
    
    $('#sidebarPanel').modal("hide");
    window.location.href = '';
  }

}
