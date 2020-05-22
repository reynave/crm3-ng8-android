import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConfigService } from './../../service/config.service';
import { environment } from 'src/environments/environment';
import { Activity, WidgetActivty } from './activty2';

declare var $: any;

@Component({
  selector: 'app-widget-activity',
  templateUrl: './widget-activity.component.html',
  styleUrls: ['./widget-activity.component.css']
})
export class WidgetActivityComponent implements OnInit {


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

    this.httpGet();
    this.httpHistory(); 
  }

  


  httpHistory() {

    this.loading = true;
    var link;
    if (this.module == "activity") {
      link = environment.api + 'activity/httpHistory/' + this.module + '/?f=' + this.id;
    } else {
      link = environment.api + 'activity/httpHistory/' + this.module + '/' + this.id
    }

    this.http.get(link, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.activityLatest = data['result']['latest'];
        this.activityHistory = data['result']['history'];
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

  httpGet() {
    var link;
    if (this.module == "activity") {
      link = environment.api + 'activity/httpGet/' + this.module + '/?f=' + this.id;
    } else {
      link = environment.api + 'activity/httpGet/' + this.module + '/' + this.id
    }

    this.http.get(link, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
      
        this.loading = false;
        this.items = data['result']['data'];
        this.model = new WidgetActivty(this.id_activity_type, this.id_user, "", "0", '', '', this.date, this.date, this.date, "00:00", "00:00", data['result']['data']['id_company'], data['result']['data']['id_opporunty'], 0);

        this.model['id_user'] = data['result']['data']['id_user'];
        this.model['id_person'] = data['result']['data']['person'][0]['id'];
        this.model['id_module'] = data['result']['data']['id_module'];
        this.id_user = data['result']['id_user'];
        this.user = data['result']['user'];
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
