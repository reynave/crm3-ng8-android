import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../environments/environment';
import { ConfigService } from './../../service/config.service';

@Component({
  selector: 'app-price-list-modal',
  templateUrl: './price-list-modal.component.html',
  styleUrls: ['./price-list-modal.component.css']
})
export class PriceListModalComponent implements OnInit {
  @Output()
  uploaded = new EventEmitter<string>();
  search:string;
  public label: any;
  public catalog: any = [];
  public pricelist: any = [];
  public items: any = [];
  loading_productlist:boolean=false;
  myContact: any = [];
  public loading = true;
  public id: number;
  public closeResult: string;
  id_price_list: string;
  quoteModel: any;
  isReadOnly: boolean = true;
  step: number = 1;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService
  ) {

  }

  module:string = this.activatedRoute.snapshot.url[0].path;
  ngOnInit() {
 
    this.id = this.activatedRoute.snapshot.params.id;
    this.httpGet();
  }

  httpGet() {
    this.loading = true; 
    this.http.get(environment.api+ 'pricelist/modal/'+this.module+'/'+ this.id, {
      headers: this.configService.headers()
    }).subscribe(data => {
 
      this.loading = false;
      this.items = data['result']['data'];
      this.pricelist = data['result']['data'];
    }, error => {

    });
  }
 
  

  total: number = 0;
  addProduct: any = [];
  i: number = 1;
  addList(x) {
    var temp = {
      id: this.i++,
      id_product: x.id,
      name: x.name,
      price : x.price
    }
    this.addProduct.push(temp); // from top as bottom
    this.total = this.addProduct.length;
  }

  removeList(x) {

    var objIndex = this.addProduct.findIndex((obj => obj.id == x.id));
    this.addProduct.splice(objIndex, 1);
    this.total = this.addProduct.length;
  }



  save() { 
    this.loading = true;
    this.http.post(environment.api+ 'pricelist/insermodule/',
      {
        "id" : this.id,
        "module" : this.module,
        "data": this.addProduct,
      }, {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.loading = false;
      this.uploaded.emit('complete');
    //  location.reload();
    }, error => {
    });
  }
}
