import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from './../../service/config.service';
import { NewContact } from './../contact';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
  @Output()
  uploaded = new EventEmitter<string>();

  public loading = true;
  public id: string;
  public closeResult: string;
  modelContact: any;
  module: string = this.activatedRoute.snapshot.url[0].path;
  saveLabel : string = "Save";
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService
  ) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.modelContact = new NewContact('', '', '', '', '', '', '', '0','','');
    if(this.module == 'contact'){
      this.saveLabel = "Save & Go Detail";
    }
    this.httpGet();
     // Input
     $(".clear-input").click(function () {
      $(this).parent(".input-wrapper").find(".form-control").focus();
      $(this).parent(".input-wrapper").find(".form-control").val("");
      $(this).parent(".input-wrapper").removeClass("not-empty");
    });
    // active
    $(".form-group .form-control").focus(function () {
      $(this).parent(".input-wrapper").addClass("active");
    }).blur(function () {
      $(this).parent(".input-wrapper").removeClass("active");
    })
    // empty check
    $(".form-group .form-control").keyup(function () {
      var inputCheck = $(this).val().length;
      if (inputCheck > 0) {
        $(this).parent(".input-wrapper").addClass("not-empty");
      }
      else {
        $(this).parent(".input-wrapper").removeClass("not-empty");
      }
    });
  }

  lead_source:any = [];
  company:any = [];
  title:any = [];
  user:any = [];

  httpGet() {
    this.loading = true;
    var url =  environment.api + 'contact/widget_new_contact/' + this.module + '/' + this.id;
    console.log(url);
    this.http.get(url, {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.lead_source = data['result']['lead_source'];
      this.company = data['result']['company'];

      this.title = data['result']['title'];
      this.user = data['result']['user'];
      
      this.modelContact = new NewContact(
        '',
        '',
        '',
        '',
        '',
        '',
        data['result']['data']['id_user'],
        data['result']['data']['id_company'],'','');
      console.log(data);
      this.loading = false;
    }, error => {
      console.log(error);
      console.log(error.error.text);
    });
  }

  onSubmit() {
    this.loading = true;
    this.http.post( environment.api + 'contact/insert',
      { 
        "data": this.modelContact
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        if (this.module == 'company') {  
          this.uploaded.emit('contact');
        } else {
          this.uploaded.emit( data['result']['id']);
        }

      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }

  close(){
   
    this.uploaded.emit();
  }
}
