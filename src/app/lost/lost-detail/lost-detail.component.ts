import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-lost-detail',
  templateUrl: './lost-detail.component.html',
  styleUrls: ['./lost-detail.component.css']
})
export class LostDetailComponent implements OnInit {
  public label: any;
  public items: any = [];
  myContact: any = [];
  public loading = true;
  public id: string;
  public closeResult: string;
  stage: any = [];
  objIndex: any;
  searchText: string;
  id_stage: string;
  currentDate = new Date();
  id_stageNext: string;
  editable: boolean = false;
  modelContact: any;
  modelBranch: any;
  product: any = []
  isReadOnly: boolean = true;
  myBranch: any = [];
  user: any = [];
  width: string;
  finish: boolean = false;
  stageNotes: string;
  quoteModel: any = [];
  quotes: any = [];
  business: any = [];
  model: any = [];
  lead_source: any = [];
  contact: any = [];
  sales_order: any = [];
  attachment:any = [];
  attachmentPO : any = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private configService: ConfigService
  ) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.items = {
      name: "",
      start_date: "",
      closed_date: "",
      expecting_closing_date: "" ,
      quote:{
        id: "0",
        quote_number: null,
        name: null,
        grand_total: null,
        contact: "  ",
        user: false,
      }

    }
    this.httpGet();
    this.jquery();
  } 
  
  
  jquery(){
    
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
  }

  httpGet() {
    this.loading = true;
    this.http.get<any>( environment.api   + 'lost/detail/' + this.id, {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);

      if( data['result']['data']['closed'] == false){ 
          this.router.navigate(['opportunity/', this.id]);  
      }


      this.items = data['result']['data'];
      this.stage = data['result']['stage'];
      this.quotes = data['result']['quotes'];
      this.width = data['result']['width'];
      this.id_stage = data['result']['data']['id_stage'];
      this.product = data['result']['product'];
      this.business = data['result']['business'];
    
      this.contact = data['result']['contact'];
      this.user = data['result']['user'];
      this.loading = false;

      this.sales_order = data['result']['sales_order'];
      
      this.lead_source = data['result']['lead_source'];
 
      this.attachment = data['result']['attachment'];
      this.attachmentPO = data['result']['attachmentPO'];

    }, error => {
      console.log(error);
      console.log(error.error.text);
    });
  }


  rollback() {
    if (confirm("Are you sure want to rollback ?")) {

      this.loading = true;
      this.http.post( environment.api   +  'deal/rollback',
        {
          "id": this.id, 
        }, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          this.loading = false;
          console.log(data); 
          this.router.navigate(['opportunity/', this.id]); 

        },
        error => {
          console.log(error);
          console.log(error.error.text);
        }
      );

    }
  }

}
