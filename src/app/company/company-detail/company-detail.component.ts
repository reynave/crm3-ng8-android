import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from './../../service/config.service'; 
import { CompanyDetail, Selected, UpdateCompany } from './../company';
import { NewContact } from './../../contact/contact';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  search :string = "";
  public label: any;
  public items: any = [];
  myContact:any = [];
  public loading = true;
  public id:string;
  public closeResult: string;
  modalTitle:string = "";
  objIndex:any;
  searchText : string;  
  isReadOnly:boolean=true;
  modelContact:any;
  modelBranch:any;
  model: any;
  industry:any = [];
  user:any = [];
  company_class:any=[];
  deal:any =[];
  archived:any =[];
  allow_access_data:boolean = false;
  myBranch:any = [];
  myOpportunity:any = [];
  priceList:any=[];
  attachment:any=[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute:ActivatedRoute, 
    private configService: ConfigService
  ) {  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.modelContact =  new NewContact('0','','','','','0',"1",this.id,'',''); 
    this.model = new UpdateCompany('','','','','','','','','','','','','','','','','','','');
    this.httpSelected();
    this.httpGet();
  }

  requestEmit(event) {
    $('#newContact').modal('hide');
    
    if(event == 'fn_newOpportunity'){
      this.httpGet();
    }
    else if(event=='contact'){
      this.httpGet();
    }
 
  }


  httpGet() {
    this.loading = true;
    this.http.get<CompanyDetail[]>( environment.api  + 'company/detail/'+ this.id, {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);
      this.allow_access_data = data['result']['allow_access_data'];
      this.items = data['result']['data'];
      this.myContact = data['result']['contact'];
      this.myOpportunity = data['result']['opportunity'];
      this.deal = data['result']['deal'];
      this.archived = data['result']['archived'];
      
      this.industry =  data['result']['industry'];
      this.user =  data['result']['user'];
      this.company_class =  data['result']['company_class'];
      this.attachment = data['result']['attachment'];
      this.model = new UpdateCompany(
        data['result']['data']['bill_country'],
        data['result']['data']['bill_city'],
        data['result']['data']['bill_code'],
        data['result']['data']['bill_state'],
        data['result']['data']['bill_street1'],
        data['result']['data']['ship_country'],
        data['result']['data']['ship_city'],
        data['result']['data']['ship_code'],
        data['result']['data']['ship_state'],
        data['result']['data']['ship_street1'],
        data['result']['data']['email'],
        data['result']['data']['fax'], 
        data['result']['data']['id_industry'],
        data['result']['data']['name'],
        data['result']['data']['phone'],
        data['result']['data']['website'],
        data['result']['data']['id_user'],
        data['result']['data']['id_company_class'],
        data['result']['data']['code_number'],
        
      );
      this.myBranch = data['result']['branch'];
      this.priceList = data['result']['priceList'];
    
      this.loading = false;
 
 
    },error => {
      console.log(error);
      console.log(error.error.text);
      this.loading = false;
      this.configService.errorConnection(); 
    });
  }

  selected:any = [];
  httpSelected() {

    this.http.get<Selected[]>(environment.api + 'company/selected', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.selected = data['result'];
    });
  }
   

  fn_delete(){
    if(confirm('Delete this company ?')){
    
      this.http.post( environment.api + 'company/fn_deleteSolo',
      {
        "id": this.id
      }, {
        headers: this.configService.headers()
      }).subscribe(
        data => { 
          this.router.navigate(['/company/']);

        },
        error => {
          console.log(error);
          console.log(error.error.text);
        }
      );
    
    }
  }


  fn_update(){
    this.loading = true; 
    this.http.post(environment.api+ 'company/update',
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


  submit: boolean = false;
  onSubmitContact() { 
    this.submit = true;
    this.http.post(environment.api+ 'contact/insert',
      {
        "id": this.id,
        "data": this.modelContact
      }, {
        headers: this.configService.headers()
      }).subscribe(
        data => { 
          this.submit = false;
          this.httpGet();
          this.modelContact =  new NewContact('0','','','','','0',"1",this.id,'','');
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
