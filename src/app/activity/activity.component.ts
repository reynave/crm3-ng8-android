import { Component, OnInit, ViewChild   } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from './../service/config.service';  
import { WidgetActivityComponent } from './widget-activity/widget-activity.component';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @ViewChild(WidgetActivityComponent, { static: true }) childcomp: WidgetActivityComponent;

  public label: any;
  public user: any = [];
  public itemsSelected: any = [];
  public loading = true;
  public id:number;
  public closeResult: string;
  json :any;
  newContact: boolean = false;
  modalTitle:string = "";
  modalStatus:number;
  objIndex:any;
  searchText : string;
  filter : any = { 
    id_user : "0", 
    id_activity_type : "0", 
    date_select : "0",
    id_related : "0",
    comments : false ,
  }
  showActivity:boolean=false;
  parentMessage:string = "message from parent";

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private configService: ConfigService
  ) {   }

  ngOnInit() {  
    this.httpGet();
    var objFilter = this.activatedRoute.snapshot.params.filter;
    if(objFilter){
      objFilter = JSON.parse(atob(objFilter));
      this.filter['id_user'] = objFilter['id_user']; 
      this.filter['id_activity_type'] = objFilter['id_activity_type']; 
      this.filter['date_select'] = objFilter['date_select']; 
      this.filter['id_related'] = objFilter['id_related']; 
      this.filter['comments'] = objFilter['comments'];  
    }
  }


  httpGet() {
    this.loading = true; 
    this.http.get( environment.api + 'activity', {
      headers: this.configService.headers()
    }).subscribe(data => {
    
      this.user = data['result']['user']; 
      this.loading = false;
    },() =>{
      this.loading = false;
      this.configService.errorConnection(); 
    });
  }

  fn_filter(){
   var obj =  btoa(JSON.stringify(this.filter));  
    
    this.childcomp.httpHistoryFilter(obj);

    this.router.navigate(['/activity/',obj ]);
   
  }


}
