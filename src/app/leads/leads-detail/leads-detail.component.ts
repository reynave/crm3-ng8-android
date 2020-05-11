import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from './../../service/config.service';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LeadDetail, SelectUser, Opportunity, UpdateLead, LeadConvert } from './../leads';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-leads-detail',
  templateUrl: './leads-detail.component.html',
  styleUrls: ['./leads-detail.component.css']
})
export class LeadsDetailComponent implements OnInit {

  items: any = [];
  loading = true;
  id: string; 
  newContact: boolean = false;
  modalTitle: string = "";
  modalStatus: number;
  objIndex: any;
  searchText: string;
  isReadOnly: boolean = true;
  lead: any = {
    birthdate:[]
  };
  lead_status: any = [];
  customer_class: any = [];
  title: any = [];
  lead_source: any = [];
  industry: any = [];
  showNewActivity: boolean = false;
  activity: any = [];
  opportunity_stage: any = [];
  leadConvert: any = [];

  loadingConvert: boolean = false;
  company: any = [];
  user: any = [];
  contacts: any = [];
  attachment: any = [];
  company_class: any = [];
  product: any = [];
  accessRules: any = [];
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
    this.httpGet();
  }

  httpGet() {
    this.items = {
      company: {
        new: false,
        id: "",
        name: "",
      },
      lead_status: {
        id: "",
        name: "",
        color: "",
      }
    }

    this.loading = true;
    this.http.get<LeadDetail[]>(environment.api + 'lead/detail/' + this.id, {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);

      if (data['error'] != 0) {
        this.router.navigate(['warning/access/user']);
      } else {
        
        this.items = data['result']['lead'];
        this.title = data['result']['title'];
        this.lead_source = data['result']['lead_source'];
        this.industry = data['result']['industry'];
        this.user = data['result']['user'];
        this.lead_status = data['result']['lead_status'];
        this.product = data['result']['product'];
        this.customer_class = data['result']['customer_class'];
        this.opportunity_stage = data['result']['opportunity_stage'];
        this.company = data['result']['company'];
        this.company_class = data['result']['company_class'];

        this.attachment = data['result']['attachment'];
        this.lead = new UpdateLead(
          data['result']['lead']['id_user'],
          data['result']['lead']['id_title'],
          data['result']['lead']['id_lead_source'],
          data['result']['lead']['id_industry'],
          data['result']['lead']['first_name'],
          data['result']['lead']['last_name'],
          data['result']['lead']['email'],
          data['result']['lead']['mobile'],
          data['result']['lead']['phone'],
          data['result']['lead']['company'],
          data['result']['lead']['website'],
          data['result']['lead']['address_street'],
          data['result']['lead']['address_city'],
          data['result']['lead']['address_state'],
          data['result']['lead']['address_code'],
          data['result']['lead']['address_country'],
          data['result']['lead']['opportunity'],
          data['result']['lead']['position'],
          data['result']['lead']['amount'],
          data['result']['lead']['id_company_class'],
          data['result']['lead']['department'],
          data['result']['lead']['fax'],

          data['result']['lead']['sex'],
          data['result']['lead']['birthdate'],
        );

        this.leadConvert = new LeadConvert(
          data['result']['lead']['isDuplicate'],
          data['result']['lead']['company'],
          data['result']['lead']['id_company'],
          data['result']['lead']['id_company_class'],
          data['result']['lead']['first_name'],
          data['result']['lead']['last_name'],

          data['result']['lead']['opportunity'],
          data['result']['lead']['amount'],
          data['result']['lead']['id_user'],
          [],

        );
      }
      this.loading = false;
    }, error => {
      console.log(error);
      console.log(error.error.text);
    });
  }

  fn_selectContact(id) {
    this.loading = true;
    this.http.get(environment.api + 'lead/selectContact/' + id, {
      headers: this.configService.headers()
    }).subscribe(data => {

      this.contacts = data['result']['contacts'];
      this.loading = false;
    });
  }

  onChangeLeadStatus(id) {

    id = id.replace(/ +/g, "");
    var res = id.split(":");
    this.http.post(environment.api + 'lead/onChangeLeadStatus',
      {
        "id_lead": this.id,
        "id_lead_status": res[1]
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.items['lead_status']['color'] = data['result']['data']['color'];
        this.items['lead_status']['name'] = data['result']['data']['name'];

      },
      error => {
        // console.log(error);
        // console.log(error.error.text);
      }
    );
  }

  open(content) {
  //  this.modalService.open(content, { size: "lg" });
  }



  fn_delete() {
    if (confirm('Delete this lead ?')) {

      this.http.post(environment.api + 'lead/fn_deleteSolo',
        {
          "id_lead": this.id
        }, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          this.router.navigate(['/lead/']);

        },
        error => {
          // console.log(error);
          // console.log(error.error.text);
        }
      );

    }
  }

  fn_deleteProduct(x) {

    var objIndex = this.product.findIndex((obj => obj.id == x.id));
    this.product.splice(objIndex, 1);

    this.http.post(environment.api + 'lead/fn_deleteProduct',
      {
        "id": x.id
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }

  onConvert() {
    this.loading = true;
    this.loadingConvert = true;

    this.http.post(environment.api + 'lead/convert',
      {
        "id": this.id,
        "data": this.leadConvert
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loadingConvert = false;
        this.loading = false;
      //  this.modalService.dismissAll('just closed');
        this.router.navigate(['/lead/converted/', this.id]);
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }

  fn_update() {
    this.loading = true;
    this.http.post(environment.api + 'lead/update',
      {
        "id_lead": this.id,
        "data": this.lead
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.httpGet();
      },
      error => {
        this.loading = false;
        console.log(error);
        console.log(error.error.text);
      }
    );

  }

  requestEmit(event) {
    $('#priceListModal').modal('hide');
    this.httpGet();
   
  }

  fn_newActivity() {
    this.showNewActivity = true;
  }


  selectedFile = null;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload(target) {
    const fd = new FormData();
    fd.append('files', this.selectedFile, this.selectedFile.name);
    fd.append('token', this.configService.token());
    fd.append('module', target);
    fd.append('id', this.id);

    console.log(fd, this.configService.token());
    this.http.post(environment.api + 'upload/attachment', fd, { 
    })
      .subscribe( 
        data => { 
          this.attachment = data['result']['attachment'];
          this.httpGet();
          this.selectedFile = "";
        }

      );
  }

  fn_attach_delete(x) {
    this.loading = true;

    this.http.post(environment.api + 'pricelist/fn_attach_delete',
      {
        "id": x.id,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        var objIndex = this.attachment.findIndex((obj => obj.id == x.id));
        this.attachment.splice(objIndex, 1);
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }


  edit(){
    this.isReadOnly=false; 
    $('a[href="#details"]').tab('show') 
  }

}
