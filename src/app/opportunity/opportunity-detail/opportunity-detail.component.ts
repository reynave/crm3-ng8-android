import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from './../../service/config.service';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { OpportunityDetail, OpportunityClosedLose, OpportunityClosedWin } from './../opportunity';
import { Newquote } from './../../quote/quote';
import { OpportunityUpdate, UpdateOpportunity } from './../opportunity';
import { environment } from 'src/environments/environment';

declare var $;
@Component({
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.css']
})
export class OpportunityDetailComponent implements OnInit {
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
  modelClosedWin: any;
  modelClosedLose: any;
  finish: boolean = false;
  stageNotes: string;
  quoteModel: any = [];
  quotes: any;
  business: any = [];

  reason: string = "";
  reason_win: any = [];
  reason_lose: any = [];
  id_closed_reason: string;
  model: any = [];
  lead_source: any = [];
  updateOpportunity: any = [];
  contact: any = [];
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
      start_date: {
        year: 0,
        month: 0,
        day: 0,
      },
      expecting_closing_date: {
        year: 0,
        month: 0,
        day: 0,
      }
    }
    this.httpGet();
  }

  requestEmit(event) {
    this.httpGet();
    // this.modalService.dismissAll();
     $('#addPriceList').modal('hide'); 
     $('#ModalNewQuotes').modal('hide');
  }


  httpGet() {
    this.loading = true;
    this.http.get(environment.api + 'opportunity/detail/' + this.id, {
      headers: this.configService.headers()
    }).subscribe(data => {

      this.loading = false;

      if (data['error'] != 0) {
        this.router.navigate(['warning/access/user']);
      } else {

        if (data['result']['data']['closed'] == true) {
          if (data['result']['data']['id_stage'] == 1000) {
            this.router.navigate(['deal/', this.id]);
          } else if (data['result']['data']['id_stage'] == 3000) {
            this.router.navigate(['lose/', this.id]);
          }
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



        this.quoteModel = new Newquote(
          data['result']['data']['name'],
          [],
          "",
          data['result']['data']['id_user'],
          data['result']['data']['id_contact'],


          data['result']['data']['contact']['email'],
          data['result']['data']['contact']['phone'],
          data['result']['information']['fax'],

          data['result']['information']['bill_name'],
          data['result']['information']['bill_street1'],
          data['result']['information']['bill_city'],
          data['result']['information']['bill_state'],
          data['result']['information']['bill_code'],
          data['result']['information']['bill_country'],

          data['result']['information']['ship_name'],
          data['result']['information']['ship_street1'],
          data['result']['information']['ship_city'],
          data['result']['information']['ship_state'],
          data['result']['information']['ship_code'],
          data['result']['information']['ship_country'],

          false
        );

        this.reason_win = data['result']['reason_win'];
        this.reason_lose = data['result']['reason_lose'];

        this.lead_source = data['result']['lead_source'];
        this.attachment = data['result']['attachment'];
        this.attachmentPO = data['result']['attachmentPO'];

        this.updateOpportunity = new UpdateOpportunity(
          data['result']['data']['id_user'],
          data['result']['data']['id_opportunity_business'],
          data['result']['data']['id_lead_source'],
          data['result']['data']['name'],
          data['result']['data']['amount'],
          data['result']['data']['closed_date'],
          data['result']['data']['start_date'],
          data['result']['data']['id_contact'],
          data['result']['data']['expecting_closing_date'],
          data['result']['data']['budget'],
          data['result']['data']['comparison_with_competitor'],
          data['result']['data']['competitor'],
          data['result']['data']['critical_point'],
          data['result']['data']['our_proposal'],
          data['result']['data']['po'],
          data['result']['data']['notes1'],
          data['result']['data']['notes2'],
          data['result']['data']['notes3'],
          data['result']['data']['id_quote'],

        );


        this.model = new OpportunityUpdate(data['result']['data']['name'], data['result']['data']['id_lead_source'], data['result']['data']['id_user'], data['result']['data']['id_contact']);

      }
    }, error => {
      console.log(error);
      console.log(error.error.text);
    });
  }

  onClosed(i) {
    if (i == 'win') {
      var data = this.modelClosedWin;

    } else if (i == 'lose') {
      var data = this.modelClosedLose;
    }
    this.http.post(environment.api + 'opportunity/updateClosed',
      {
        "id": this.id,
        "data": data,
        "status": i
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {

        if (i == 'win') {
          this.router.navigate(['/deal/', this.id]);

        } else if (i == 'lose') {
          this.router.navigate(['/lose/', this.id]);

        }
        this.finish = true;
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
  lookingContact(e) {
    console.log(e.target.value);
    console.log(this.contact);

    var objIndex = this.contact.findIndex((obj => obj.id == e.target.value));
    this.quoteModel['phone'] = this.contact[objIndex]['phone'];
    this.quoteModel['email'] = this.contact[objIndex]['email'];


  }

  fn_editable() {

  }
  showUpdateStage: boolean = false;
  stageCurrent: string;
  updateStep(id, closed = 0) {
    console.log(id);
    console.log(closed);
    console.log(this.stage);
    console.log(this.id_stage);

    if (closed < 999) {

      var objIndex = this.stage.findIndex((obj => obj.id == id));
      this.stage[objIndex]['current'] = false;

      var id_next = this.stage[objIndex]['id_next'];
      var objIndex2 = this.stage.findIndex((obj => obj.id == id_next));
      this.stage[objIndex2]['current'] = "current";

    }

    this.loading = true;
    this.http.post(environment.api + 'opportunity/updateStep',
      {
        "id_opportunity": this.id,
        "id_stage": this.id_stage,
        "closed": closed,
        "data": this.updateOpportunity,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (closed == 1000) {
          this.router.navigate(['deal/', this.id]);
        } else if (closed == 3000) {
          this.router.navigate(['lose/', this.id]);
        } else {

          this.id_stage = id_next;
          this.stage[objIndex]['done'] = "done";
        }


      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );


  }

  closeOpportunity(id) {


    this.loading = true;
    this.http.post(environment.api + 'opportunity/closeOpportunity',
      {
        "id_opportunity": this.id,
        "id_stage": this.id_stage,
        "id_closed_reason": this.id_closed_reason,
        "data": this.updateOpportunity,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (data['result']['id_stage'] == 1000) {
          this.router.navigate(['deal/', this.id]);
        } else if (data['result']['id_stage'] == 3000) {
          this.router.navigate(['lost/', this.id]);
        }
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }

  nextStage(x) {
    console.log(x);
    this.stageCurrent = x.name;
    this.id_stageNext = x.id;
    if (this.items["id_stage"] == x.id) {
      this.showUpdateStage = false;
    } else if (this.items["id_stage"] != x.id) {
      this.showUpdateStage = true;
    }

    this.stageNotes = x.notes;

    this.id_stage = x.id;
    this.stage.map(a => a.current = false);
    var objIndex = this.stage.findIndex((obj => obj.id == x.id));
    this.stage[objIndex]['current'] = "current";




  }


  fn_delete_prorduct(data) {

    var objIndex = this.product.findIndex((obj => obj.id == data.id));
    this.product.splice(objIndex, 1);


    this.http.post(environment.api + 'opportunity/fn_delete_prorduct',
      {
        "id_opportunity": this.id,
        "data": data,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }

  open(content) {
    this.modalService.open(content);
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  fn_closed(id_stage) {

    this.loading = true;
    this.http.post(environment.api + 'opportunity/fn_closed',
      {
        "id_opportunity": this.id,
        "id_stage": id_stage,
        "data": this.updateOpportunity,
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.router.navigate(['deal/', this.id]);
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );

  }


  fn_delete() {
    if (confirm('Delete this Opportunity ?')) {

      this.http.post(environment.api + 'opportunity/fn_deleteSolo',
        {
          "id": this.id
        }, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          this.router.navigate(['/opportunity/']);

        },
        error => {
          console.log(error);
          console.log(error.error.text);
        }
      );

    }
  }

  fn_newQuote() {
    console.log(this.quoteModel);
    this.loading = true;
    this.http.post(environment.api + 'opportunity/fn_newQuote',
      {
        "id": this.id,
        "data": this.quoteModel
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.router.navigate(['/quote/', data['result']['id']]);
      

        $('#addPriceList').modal('hide'); 
        $('#ModalNewQuotes').modal('hide');
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }

  loadingUpdateQuiz: string = "";
  updateQuiz() {
    this.loadingUpdateQuiz = "Saving...";
    this.http.post(environment.api + 'opportunity/update',
      {
        "id": this.id,
        "data": this.updateOpportunity
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.loadingUpdateQuiz = "";
        console.log(data);
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }

  fn_update() {

    this.http.post(environment.api + 'opportunity/update',
      {
        "id": this.id,
        "data": this.updateOpportunity
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }


  fn_sales_order() {

    var objIndex = this.quotes.findIndex((obj => obj.id == this.modelClosedWin.id_quote));
    console.log(this.quotes[objIndex]);
    this.modelClosedWin['sales_order'] = this.quotes[objIndex]['quotes_number'];
  }
  attachment: any = [];
  attachmentPO: any = [];
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
}
