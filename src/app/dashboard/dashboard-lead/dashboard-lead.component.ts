import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ConfigService } from './../../service/config.service';
import { environment } from 'src/environments/environment';

declare var $; 
declare var Chart;
declare var D3Funnel;

@Component({
  selector: 'app-dashboard-lead',
  templateUrl: './dashboard-lead.component.html',
  styleUrls: ['./dashboard-lead.component.css']
})
export class DashboardLeadComponent implements OnInit {

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
  


  // barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  // barChartType: any = 'bar';
  // barChartLegend = true;
  // barChartPlugins = [];

  // barChartData: ChartDataSets[] = [
  //   { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  // ];



 

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
  }

  onPeriod(period) {
    this.period = period;
    this.httpGet(this.id);
    this.loading = true;
    this.router.navigate(['/dashLead/',period ]);
    // setInterval(function(){ 
    //   window.location.reload(); 
    //  }, 300);
    $('#DialogIconedInfo').modal('hide');
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
  
      this.currency = data['result']['currency'];
      this.id_user_select = id;
      this.target = data['result']['target'];
      this.account_manager = data['result']['account_manager'];
      this.lead = data['result']['lead'];
      this.user = data['result']['user'];
      this.event = data['result']['event'];
      this.visit = data['result']['visit'];
      this.recentwins = data['result']['recentwins'];
      this.recentQuotation = data['result']['recentQuotation'];


      this.leadPerDistributionLabels = data['result']['leadPerDistribution']['labels']; 
      this.leadPerDistributionData  = data['result']['leadPerDistribution']['datasets'][0]['data'];

      this.leadPerIndustryLabels  =  data['result']['leadPerIndustry']['labels']; 
      this.leadPerIndustryData =  data['result']['leadPerIndustry']['datasets'][0]['data'];
      
    
      this.funnel(data['result']['funnel']);

      this.loading = false;
    }, () =>{
      this.loading = false;
      this.configService.errorConnection(); 
    });
  }

  funnel(dataFunnel) {


    const options = {
      block: {
        dynamicHeight: true,
        minHeight: 15,
        highlight: true,
        barOverlay: true,
      },
      chart: {
        bottomPinch: true,
        curve: {
          enabled: true,
        }
      }
    };

    const chart = new D3Funnel('#funnel');
    chart.draw(dataFunnel, options);
  }

  


}
