import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from './../../service/config.service';
import { NewOpportunity } from './../opportunity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-opportunity-new',
  templateUrl: './opportunity-new.component.html',
  styleUrls: ['./opportunity-new.component.css']
})
export class OpportunityNewComponent implements OnInit {
  @Output()
  uploaded = new EventEmitter<string>();

  public loading = true;
  public id: string;
  public closeResult: string; 
  model:any;
  module:string = this.activatedRoute.snapshot.url[0].path;
  stage:any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,  
    private configService: ConfigService
  ) { 
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id; 
    this.model = new NewOpportunity('','','','','',[],'','');
    this.httpGet();
  }
  company:any=[];
  contact:any=[];
  user:any=[];
  lead_source: any = [];
  httpGet() {
    this.loading = true;
    var url = environment.api + 'opportunity/widget_new_opportunity/' +this.module+'/'+ this.id;
    console.log(url);
    this.http.get(url, {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.stage = data['result']['stage'];
      this.company = data['result']['company'];
      this.contact = data['result']['contact'];
      this.user = data['result']['user'];
      this.lead_source =  data['result']['lead_source'];
      this.model = new NewOpportunity(
        data['result']['data']['id_user'],
        '',
        '',
        data['result']['data']['id_contact'],
        data['result']['data']['id_company'],
        [],
        '',''
      );
     

      console.log(data);
      this.loading = false;
    },error => {
      console.log(error);
      console.log(error.error.text);
    });
  }

  fn_newOpportunity(){
    this.loading = true; 
    this.http.post(environment.api + 'opportunity/fn_newOpportunity',
      {
        "id": this.id,
        "data": this.model
      }, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);  
          this.loading = false;
          if(this.module == 'opportunity'){
            this.uploaded.emit(data['result']['id']);
          }else{
            this.uploaded.emit('fn_newOpportunity');
          }
      
        },
        error => {
          console.log(error);
          console.log(error.error.text);
        }
      );
  }

  updateContact(){
    if(this.module == 'opportunity'){
      console.log(this.model['id_company']);
      this.loading = true; 
      this.http.get( environment.api + 'opportunity/contact/'+this.model['id_company'],
      {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);  
          this.contact = data['result']['contact'];
          this.loading = false; 
        },
        error => {
          console.log(error);
          console.log(error.error.text);
        }
      );

    }
  
  }

  close(){
    this.uploaded.emit();
  }

}
