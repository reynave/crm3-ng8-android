import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './../service/config.service';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Opportunity } from './opportunity';
import { environment } from 'src/environments/environment';

declare var $;


@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {
  search: string;
  public label: any;
  public items: any = [];
  public itemsSelected: any = [];
  public loading: boolean = true;
  loadingSelected: boolean = true;
  selected: any = [];
  public id: number;
  public closeResult: string;
  newContact: boolean = false;
  objIndex: any;
  selectModal: string = "0";
  id_user: string = "1";
  model: any;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.httpGet();
    this.jquery();
  }

  jquery() {

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
   
    this.http.get<any>(environment.api + 'opportunity/index/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.loading = false;
      console.log(data);
      this.items = data['data'].map(row => ({
        id: row[0],
        name: row[1], 
        company: row[2],
        stage: row[3], 
      })).sort(function(a, b){
        if(a. name < b. name) { return -1; }
        if(a. name > b. name) { return 1; }
        return 0;
      });
      
      
     
    }, error => {  
      this.loading = false;
      this.configService.errorConnection(); 
    });
  }

  requestEmit(event) {
    if (event) {
      this.router.navigate(['opportunity', event]);
    }

    $('#ModalBasic').modal('hide');
  }

}
