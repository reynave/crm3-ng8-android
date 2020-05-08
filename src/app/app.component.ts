import { Component, OnInit } from '@angular/core'; 
 
declare var device;
declare var window; 

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor() { 
  }
 
  ngOnInit() {
    this.deviceready();  
  }

  deviceready() { 
    document.addEventListener("deviceready",  () => {
      console.log("deviceready android Only");
    }, false);
  }
}
