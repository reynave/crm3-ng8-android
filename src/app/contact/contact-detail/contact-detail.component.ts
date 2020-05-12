import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from './../../service/config.service';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CompanyDetail, Selected } from './../../company/company';
import { UpdateContact } from './../contact';
import { NewOpportunity } from './../../opportunity/opportunity';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  public label: any;
  public company: any = [];
  public lead_source: any = [];
  public title: any = [];
  public user: any = [];
  public items: any = [];

  public loading = true;
  public id: string;
  public closeResult: string;
  newContact: boolean = false;
  index: number;
  searchText: string;
  selectedCompany: any = [];
  model: any = {
    birthdate: {
      year : 1990,
      month : 1,
      day : 1
    }
  };;
  dataOpportunity: any = [];
  dataOpportunityStage: any = [];
  loadingSelected: boolean = false;
  selected: any = [];
  isReadOnly: boolean = true;
  newOpportunity: any;
  attachment: any = [];
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

  requestEmit(event) {
    if (event == 'fn_newOpportunity') {
      this.httpGet();
    }
    this.modalService.dismissAll();
  }



  httpGet() {
    this.loading = true;
    this.http.get( environment.api + 'contact/detail/' + this.id, {
      headers: this.configService.headers()
    }).subscribe(data => {
      if (data['error'] != 0) {
        this.router.navigate(['warning/access/user']);
      } else {

        this.items = data['result']['data'];
        this.company = data['result']['company'];
        this.lead_source = data['result']['lead_source'];
        this.title = data['result']['title'];
        this.user = data['result']['user'];
        this.dataOpportunity = data['result']['opportunity'];
        this.dataOpportunityStage = data['result']['stage'];
        this.attachment = data['result']['attachment'];
        this.newOpportunity = new NewOpportunity(
          data['result']['data']['id_user'],
          '',
          '',
          this.id,
          data['result']['data']['id_company'],
          [],
          "", "");

        this.model = new UpdateContact(
          data['result']['data']['id_company'],
          data['result']['data']['email'],
          data['result']['data']['first_name'],
          data['result']['data']['id_lead_source'],
          data['result']['data']['id_title'],
          data['result']['data']['id_user'],
          data['result']['data']['last_name'],
          data['result']['data']['mobile'],
          data['result']['data']['phone'],
          data['result']['data']['position'],
          data['result']['data']['department'],
          data['result']['data']['sex'],
          data['result']['data']['birthdate'],
        );
 
        console.log(data);
        this.loading = false;

      }
    }, error => {
      console.log(error);
      console.log(error.error.text);
    });
  }


  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
 

  fn_update() {
    
    this.loading = true;
    console.log(this.model);
    console.log(environment.api + 'contact/update');
    this.http.post(environment.api + 'contact/update',
      {
        "id": this.id,
        "data": this.model
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
        this.loading = false;
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }


  fn_delete() {
    if (confirm('Delete this Contact ?')) {

      this.http.post(environment.api + 'contact/fn_deleteSolo',
        {
          "id": this.id
        }, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/contact/']);

        },
        error => {
          // console.log(error);
          // console.log(error.error.text);
        }
      );

    }
  }


  fn_newOpportunity() {
    this.loading = true;
    console.log(this.model);
    this.http.post(environment.api + 'opportunity/fn_newOpportunity',
      {
        "id": this.id,
        "data": this.newOpportunity
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
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
      //    reportProgress: true,
      //  observe: 'events'
    })
      .subscribe(
        /*  event => {
            if(event.type === HttpEventType.UploadProgress){
              console.log(event ); // handle event here
            }else if( event.type === HttpEventType.Response ){
              console.log(event ); // handle event here
            }
           
          },*/
        data => {
          // console.log(data); 
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
