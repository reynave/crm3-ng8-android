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
  currency: string = "Rp";
  account_manager: any = [];
  target: any = [];
  id_user_select: string;
  totalLS: number = 0;
  totalLI: number = 0;


  //doc https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/ 
  salesmanOptions: ChartOptions = { responsive: true, };
  salesmanLabels: Label[] = ['Quater 1', 'Quater 2', 'Quater 3', 'Quater 4'];
  salesmanType: any = 'bar';
  salesmanLegend = true;
  salesmanPlugins = [];
  salesmanData: ChartDataSets[] = [
    {
      data: [0, 0, 0, 0,],
      label: 'Loading...',
      backgroundColor: "rgb(30, 178, 166)",
      borderColor: "rgba(255,99,132,1)",
      hoverBackgroundColor: "rgba(255,99,132,0.8)",
      hoverBorderColor: "rgba(255,99,132,1)"
    }
  ];


  targetBarOptions: ChartOptions = {
    title: {
      display: false,
      text: 'Target Per Years'
    },
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,

      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  targetBarLabels: Label[] = ['Quater 1', 'Quater 2', 'Quater 3', 'Quater 4'];
  targetBarType: any = 'bar';
  targetBarLegend = true;
  targetBarPlugins = [];
  targetBarData: ChartDataSets[] = [
    {
      data: [0, 0, 0, 0,],
      label: 'Loading...',
    }
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
    var formatter = new Intl.NumberFormat('en-US');
    this.loading = true;
    var url = environment.api + 'dashboard/sales/?id=' + id + "&period=" + this.period;

    this.http.get(url, {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data['result']['barChartDataQty']);
      this.currency = data['result']['currency'];
      this.id_user_select = id;
      this.target = data['result']['target'];

      this.salesmanLabels = data['result']['barChartDataAmount']['labels'];
      this.salesmanData = data['result']['barChartDataAmount']['datasets'];


      this.targetBarLabels = data['result']['barChartDataQty']['labels'];
      this.targetBarData = data['result']['barChartDataQty']['datasets'];


      this.loading = false;
    }, () => {
      this.loading = false;
      this.configService.errorConnection();
    });
  }



}
