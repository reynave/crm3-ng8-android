import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-lead-converted',
  templateUrl: './lead-converted.component.html',
  styleUrls: ['./lead-converted.component.css']
})
export class LeadConvertedComponent implements OnInit {

  public items: any = {
    user : {
      id:"",  name:"",
    },
    lead : {
      id:"",  name:"",
    },
    company : {
      id:"",  name:"",
    },
    contact : {
      id:"",  name:"",
    },
    opportunity : {
      id:"",  name:"",
    },
    convert : {
      date:"",  
      id_user:"",
      user:"",
    },

  };
  public loading = true;
  public id: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private configService: ConfigService
  ) { 
  }


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id; 
    this.httpGet(); 
  }
  httpGet() { 
    this.http.get( environment.api + 'lead/converted/' + this.id, {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);
      this.items = data['result']['data'];
      this.loading = false;
    });

  }

}
