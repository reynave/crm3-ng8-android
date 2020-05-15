import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  iconClass : string = "border text-center bg-white shadow-sm rounded py-1 mb-2";


  links : any = [
    {
      routerLink: "lead",
      icon : "./assets/img/icon/lead.png",
      name : "Leads"
    },
    {
      routerLink: "priceList",
      icon : "./assets/img/icon/product.png",
      name : "Products"
    },
    {
      routerLink: "company",
      icon : "./assets/img/icon/company.png",
      name : "companies"
    },
    {
      routerLink: "contact",
      icon : "./assets/img/icon/contact.png",
      name : "Contacts"
    },
    {
      routerLink: "activity",
      icon : "./assets/img/icon/activity.png",
      name : "Activities"
    },

    {
      routerLink: "dashLead",
      icon : "./assets/img/icon/pie-chart.png",
      name : "dashboard lead"
    },

    
  ]

  constructor() {  }

  ngOnInit() {
     
  }

}
