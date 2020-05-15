import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './../service/config.service';
import { Company, NewCompany, Selected } from './company';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public label: any;
  public items: any;
  public itemsSelected: any = [];
  loading: boolean = true;
  loadingSelected: boolean = true;
  selected: any = [];
  public id: number;
  public closeResult: string;
  newContact: boolean = false;
  modalTitle: string = "";
  modalStatus: number;
  objIndex: any;
 
  search: string;
  selectModal: string = "0";
  id_user: string = "1";
  total: string = "";
  model = new NewCompany('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  user: any = [];
  company_class: any = [];
  dbCompany: boolean = false;
  selectedCompany: any = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit() {

    this.httpSelected();
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

  httpGet() {
   
    this.http.get<any>(environment.api + 'company/index/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data['data']);
      this.loading = false;

      this.items = data['data'].map(row => ({
        id: row[0],
        name: row[1],
        industry: row[4],
        class: row[5],
      }));
      console.log(this.items);
    }, () => {
      this.loading = false;
      this.configService.errorConnection(); 
    });
  }
  httpSelected() {

    this.http.get<any>(environment.api + 'company/selected', {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);
      this.id_user = data['result']['id_user'];
      this.model['id_user'] = data['result']['id_user'];
      this.user = data['result']['user'];
      this.company_class = data['result']['company_class'];
      this.loadingSelected = false;
      this.selected = data['result'];
      //  console.log(this.selected);
    });
  }



  submit: boolean = false;

  onSubmit(value = "") {

    this.submit = true;
    this.http.post(environment.api + 'company/insert',
      {
        "data": this.model
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        //  console.log(data);
        this.submit = false;
        if (value == 'next') {
          this.httpGet();
          this.model = new NewCompany('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          this.model['id_user'] = this.id_user;
        }
        else {
          this.router.navigate(['/company/', data['result']['id']]);
          $('#newCompany').modal('hide'); 
        }


      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }


  fn_delete() {

    this.http.post(environment.api + 'company/fn_delete',
      {
        "data": this.itemsSelected
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        //  console.log(data);
        this.httpGet();
        $('#newCompany').modal('hide');

      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );



  }


  copyAddress() {
    this.model['ship_street'] = this.model['bill_street'];
    this.model['ship_city'] = this.model['bill_city'];
    this.model['ship_state'] = this.model['bill_state'];
    this.model['ship_code'] = this.model['bill_code'];
    this.model['ship_country'] = this.model['bill_country'];

  }





}
