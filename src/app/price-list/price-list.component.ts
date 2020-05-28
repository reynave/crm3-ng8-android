import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { ConfigService } from './../service/config.service'; 

declare var $;

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
 
  items: any = [];
  loading: boolean = true;
  total:string;
  objIndex:any=[];
  search : string;
  itemsSelected: any = [];
  constructor(
    private http: HttpClient,
    private router: Router, 
    private configService: ConfigService
  ) {   }
  ngOnInit() {
  
    this.itemsSelected = [];
    $(".toggle-searchbox").click(function () {
      var a = $("#search").hasClass("show");
      if (a) {
        $("#search").removeClass("show");
      }
      else {
        $("#search").addClass("show");
        $("#search .form-control").focus();
      }
    });
    this.httpGet(); 
  }


  httpGet() {
    
    var formatter = new Intl.NumberFormat('id-ID', );

    this.http.get<any>(environment.api + "pricelist/index/", {
      headers: this.configService.headers()
    }).subscribe(data => {

      this.loading = false;
        this.items = data['data'].map(row => ({
          id: row[0],
          sku: row[1],
          name: row[2],
          currency : row[3],
          price: row[4],
          type: row[5],
          qty: row[6],
        })).sort(function(a, b){
          if(a. name < b. name) { return -1; }
          if(a. name > b. name) { return 1; }
          return 0;
        });
      

    }, error=>{
      
      this.loading = false;
      this.configService.errorConnection(); 
    });

  }
}
 
