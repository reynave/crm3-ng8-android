import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConfigService } from './../../service/config.service';
import { environment } from 'src/environments/environment'; 
import { Activity, WidgetActivty } from './../widget-activity/activty2';
declare var $: any;
declare var navigator:any;

export class checkInOut {

  constructor(
    public id: number,
    public lat: string,
    public long: string,
    public note: string
  ) {  }

}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  checkModel = new checkInOut(0, '', '', '');
  loading: boolean = false;
  module: string;
  id: string;
  items: any = [];
  date: any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  activity: any = [];
  history: any = [];
  id_activity_type: string = "100";
  model: any = [];
  user: any = [];
  id_user: string;
  closeResult: any;
  showNewActivity: boolean = true;

  activityLatest: Activity[] = [];
  activityHistory: Activity[] = [];
  getCurrentPosition:any=[];
  checkData : any = [];
  lat:string;
  long:string;
  datetime:any = new Date;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
  ) { }

  ngOnInit() {

    this.module = this.route.snapshot.url[0].path;
    this.id = "false";
    if (this.route.snapshot.url[1]) {
      this.id = this.route.snapshot.url[1].path;
    } 
    this.httpHistory(); 
  }


  actionSheetForm(x){
    var current_date =  new Date; 
    this.checkData = x; 
    this.datetime = current_date
    navigator.geolocation.getCurrentPosition((position)=>{
      this.getCurrentPosition = {
        lat : position.coords.latitude,
        long :  position.coords.longitude,
      };

      this.lat = position.coords.latitude;
      this.long =  position.coords.longitude;

      this.checkModel['lat'] = this.lat;
      this.checkModel['long'] = this.long;
      this.checkModel['id'] = x.id;
      
    }, (onError)=>{
      console.log(onError);
    });
  }
 
  checkOutSubmit(){
    console.log(this.checkModel);
    this.http.post(environment.api + 'activity/checkOutSubmit',
      { 
        "data": this.checkModel,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.httpHistory(); 
        this.checkModel = new checkInOut(0, '', '', '');
        $('#actionSheetForm').modal('hide');
      },
      error => {
        console.log(error); 
      }
    );
  }




  // NO NEED TO CHANGE


  httpHistory() {

    this.loading = true;
    var link;
    link = environment.api + 'activity/httpCheckOut/';

    this.http.get(link, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.activityLatest = data['result']['latest']; 
      },
      error => {

      }
    );
  }

  httpHistoryFilter(obj) {

    this.loading = true;
    var link = environment.api + 'activity/httpHistory/' + this.module + '/?f=' + obj;


    this.http.get(link, {
      headers: this.configService.headers()
    }).subscribe(
      data => {

        this.id_user = data['result']['id_user'];
        this.loading = false;
        this.activityLatest = data['result']['latest'];
        this.activityHistory = data['result']['history'];
      },
      error => {

      }
    );
  }
 

  cancelActivity() {
    $('#modalActivity').modal('hide');
  }

  onInsert() {

    this.http.post(environment.api + 'activity/onInsert',
      {
        "data": this.model,
        "id": this.id,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {

        this.model['subject'] = null;
        this.model['description'] = null;
        this.model['amount'] = 0;

        // this.httpHistory();   
        if (Array.isArray(data['result']['latest']) == false) {
          this.activityLatest.unshift(data['result']['latest']);
        }

        if (Array.isArray(data['result']['history']) == false) {
          this.activityHistory.unshift(data['result']['history']);
        }
        $('#modalActivity').modal('hide');
      },
      error => {

      }
    );
  }

  tabEvent($event) {
    this.model['id_activity_type'] = $event.nextId;
  }

  fn_comments(comments, id, index, closed) {

    this.http.post(environment.api + 'activity/fn_comments',
      {
        "id_activity": id,
        "comments": comments,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {

        if (closed == 0) {

          this.activityLatest[index]['activity_comment'].push(data['result']['data']);
        } else if (closed == 1) {

          this.activityHistory[index]['activity_comment'].push(data['result']['data']);
        }

      },
      error => {

      }
    );

  }


  fn_closed_area(i) {

    if (this.activityLatest[i]['closed_area'] == false) {
      this.activityLatest[i]['closed_area'] = true;
    } else {
      this.activityLatest[i]['closed_area'] = false;
    }
  }
  fn_cancel(i){
    this.activityLatest[i]['closed_area'] = false;
  }


  fn_closed(x) {


    var objIndex = this.activityLatest.findIndex((obj => obj.id == x.id));
    this.activityLatest.splice(objIndex, 1);


    this.http.post(environment.api + 'activity/fn_closed',
      {
        "id": x.id,
        "data": x,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {

        this.activityHistory.unshift(data['result']['data']);
      },
      error => {

      }
    );

  }

  fn_remove(x) {
    var objIndex = this.activityLatest.findIndex((obj => obj.id == x.id));
    this.activityLatest.splice(objIndex, 1);

    this.http.post(environment.api + 'activity/fn_remove',
      {
        "id": x.id,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {

      },
      error => {

      }
    );
  }


  showHistory(i) {
    if (this.activityHistory[i]['show'] == false) {
      this.activityHistory[i]['show'] = true;
    } else {
      this.activityHistory[i]['show'] = false;
    }

  }
  showLatest(i) {
    if (this.activityLatest[i]['show'] == false) {
      this.activityLatest[i]['show'] = true;
    } else {
      this.activityLatest[i]['show'] = false;
    }

  }

}
