import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ConfigService } from './../service/config.service';
import { environment } from './../../environments/environment';
import { Newlead } from './leads';

declare var $;

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  loading: boolean = true;
  items: any = [];
  id_user: string;
  model: any;
  dbCompany: boolean = false;
  selectedCompany: any = [];
  selected: any = [];
  search: string;
  constructor(
    private configService: ConfigService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.id_user = this.configService.id_user();
    this.model = new Newlead(this.id_user, '1', '1', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', "", "", "", "", "1", {
      "year": 1980,
      "month": 3,
      "day": 5
    }, false);
    this.httpGet();
    this.httpSelected();

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
    this.http.get<any>(environment.api + 'lead/index', {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.items = data['data'].map(row => ({
        id: row[0],
        status: row[1],
        name: row[2],
        company: row[3],
        industry: row[5],
        source: row[6],
        color: row[8],
      }));
      console.log(this.items);
    }, error => { 
      this.loading = false;
      this.configService.errorConnection(); 
    });
  }

  httpSelected() {

    this.http.get<any>(environment.api + 'lead/selected', {
      headers: this.configService.headers()
    }).subscribe(data => {

      this.selected = data['result'];
      console.log(this.selected);
    });
  }

  httpCompany() {
    this.http.get<any>(environment.api + 'lead/getCompany', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.selectedCompany = data['result']['data'];
      console.log(this.selectedCompany);
    });
  }

  fnSearch() {
    alert(this.search)
    //$("#loader").show();
  }


  fnRequestCompanyData() {

    this.loading = true;
    this.http.get(environment.api + 'lead/getCompany/?id=' + this.model['id_company'], {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.loading = false;
      console.log(data);
      this.model['isDuplicate'] = true;
      this.model['website'] = data['result']['data'][0]['website'];
      this.model['phone'] = data['result']['data'][0]['phone'];
      this.model['fax'] = data['result']['data'][0]['fax'];
      this.model['website'] = data['result']['data'][0]['website'];
      this.model['id_company_class'] = data['result']['data'][0]['id_company_class'];

      this.model['address_street'] = data['result']['data'][0]['bill_street1'];
      this.model['address_city'] = data['result']['data'][0]['bill_city'];
      this.model['address_state'] = data['result']['data'][0]['bill_state'];
      this.model['address_code'] = data['result']['data'][0]['bill_code'];
      this.model['address_country'] = data['result']['data'][0]['bill_country'];


      // this.selectedCompany = data['result']['data'];
      // console.log(this.selectedCompany);
    });
  }

  submit: boolean = false;
  onSubmit() {
    this.submit = true;
    this.http.post(environment.api + 'lead/insert',
      {
        "data": this.model
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.submit = false;
        $('#ModalBasic').modal('hide');
        this.router.navigate(['/lead/', data['result']['id_lead']]);



      },
      error => {
        console.log(error);
        console.log(error.error.text);
      }
    );
  }
}
