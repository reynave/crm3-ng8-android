import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Router, ActivatedRoute } from '@angular/router'; 
import { ConfigService } from './../service/config.service'; 
import { Contact, Selectedcompany, NewContact } from './contact';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public label: any;
  public items: any;
  public itemsSelected: any = [];
  public loading: boolean = true;
  loadingSelected: boolean = true;
  selected: any = [];
  public id: number; 
  search:string = "";

  newContact: boolean = false;
  modalTitle: string = "";
  modalStatus: number;
  objIndex: any;
  searchText: string;
  selectModal: string = "0";
  id_user: string = "1";
  modelContact: any;
  dbCompany: boolean = false;
  selectedCompany: any = [];
  amount: string;
  total:string;
  companies:any= [];
  id_company:string = "0";
  constructor(
    private http: HttpClient,
    private router: Router, 
    private configService: ConfigService, 
    private activatedRoute: ActivatedRoute, 
  ) { }
 
  ngOnInit() { 
    this.httpSelected();
    this.httpGet();
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
 
    this.http.get<any>(environment.api + 'contact/index/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data['data']);
      this.loading = false;

      this.items = data['data'].map(row => ({
        id: row[0], 
        name: row[1],
        company: row[2],
        position: row[3],
      }));
      console.log(this.items);
    });
  }


 
  requestEmit(event) {
    $('#newContact').modal('hide');
    if (event) {
      this.router.navigate(['contact', event]);
    }  
    //this.modalService.dismissAll();
  }


  httpSelected() {

    this.http.get<Selectedcompany[]>( environment.api + 'contact/selected', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.loadingSelected = false;
      this.selected = data['result'];
      //  console.log(this.selected);
    });
  }

 



  fn_delete() {

    this.http.post(environment.api + 'contact/fn_delete',
      {
        "data": this.itemsSelected
      }, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        //  console.log(data);
        this.httpGet();
       // this.modalService.dismissAll();
      },
      error => {
        //  console.log(error);
        //  console.log(error.error.text);
      }
    );



  }

  open(content) {
   // this.modalService.open(content, { size: 'lg' });
  }



  fn_check(x) {
    this.objIndex = this.items.findIndex((obj => obj.id == x.id));
    if (this.items[this.objIndex]['check'] == true) {
      this.items[this.objIndex]['check'] = false;
    } else {
      this.items[this.objIndex]['check'] = true;
    }
    var object = {
      'id': x.id,
      'name': x.name,
      'company': x.company,
    }
    var objectSelect = this.itemsSelected.findIndex((obj => obj.id == x.id));
    if (objectSelect == -1) {
      this.itemsSelected.push(object);
    } else {
      this.itemsSelected.splice(objectSelect, 1);
    }
    //  console.log(this.itemsSelected);
  }

  fn_removeItemSelected(x) {
    this.objIndex = this.items.findIndex((obj => obj.id == x.id));
    var objectSelect = this.itemsSelected.findIndex((obj => obj.id == x.id));
    if (this.items[this.objIndex]['check'] == false) {
      this.items[this.objIndex]['check'] = true;
    } else {
      this.items[this.objIndex]['check'] = false;
    }
    this.itemsSelected.splice(objectSelect, 1);
  }



}
