import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ConfigService } from './../../service/config.service';
import { environment } from 'src/environments/environment';

declare var $; 
declare var Chart; 

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css']
})
export class DashboardSalesComponent implements OnInit {

  public loading: boolean = true;
  datasetsLeadPerDistribution: any = [];
  datasetsLeadPerIndustry: any = [];
  event: any = [];
  visit: any = [];
  recentwins: any = []; user: any = [];
  recentQuotation: any = [];
  lead: any = {
    today: "0",
    month: "0",
    quarter: "0",
    year: "0",
  }
  id: string = "0";
  period: string;
  currency: string;
  account_manager: any = [];
  target: any = [];
  id_user_select: string;
  totalLS : number = 0;
  totalLI : number = 0;



  
  leadPerDistributionLabels: Label[] = ['Label1', 'label2', 'label3', ' label4','Label5', 'label6', 'label7', ' label8'];
  leadPerDistributionData: any = [  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ];
  
  pie: any = 'pie';

  leadPerIndustryLabels: Label[] = ['Label1', 'label2', 'label3', ' label4','Label5', 'label6', 'label7', ' label8'];
  leadPerIndustryData: any = [  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ];
  

  //doc https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/ 
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: any = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];



 

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.period = this.activatedRoute.snapshot.params.period; 
    if (!this.activatedRoute.snapshot.params.period) {
      this.period = 'quarter';
    } 
    this.httpGet(0);
    this.jquery();
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

   
  onUser(id) {
    this.id = id;
    this.httpGet(id);
  }
 

  httpGet(id) {
    this.loading = true;
    var url = environment.api + 'dashboard/index/?id=' + id + "&period=" + this.period;
 
    this.http.get(url, {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data['result']['target']);
      this.currency = data['result']['currency'];
      this.id_user_select = id;
      this.target = data['result']['target']; 
       
       
      this.loading = false;
    }, () =>{
      this.loading = false;
      this.configService.errorConnection(); 
    });
  }

  

}
