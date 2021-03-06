import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ConfigService } from 'src/app/service/config.service';
import { environment } from 'src/environments/environment'; 

declare var $;

@Component({
  selector: 'app-converted',
  templateUrl: './converted.component.html',
  styleUrls: ['./converted.component.css']
})
export class ConvertedComponent implements OnInit {
  search: string;
  public items: any;
  id_user:string;
  public loading: boolean = true;
  public id: number;
  total:string;
  constructor(
    private http: HttpClient,
    private router: Router, 
    private configService: ConfigService
  ) { 
  }

  ngOnInit() {
    this.id_user = this.configService.id_user();
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
    this.loading = true;
    this.http.get<any>( environment.api  + 'converted', {
      headers: this.configService.headers()
    }).subscribe(data => {  
      console.log(data);
      this.total = data['result']['total'];  
      this.items = data['result']['data'].sort(function(a, b){
        if(a. lead < b. lead) { return -1; }
        if(a. lead > b. lead) { return 1; }
        return 0;
      }); 
      this.loading = false;
    });
  }
}
