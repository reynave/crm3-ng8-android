import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Login, Repass } from "./login";
import { ConfigService } from "./../service/config.service";
import { environment } from "./../../environments/environment";

declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  model = new Login("", "", false, "", "android");
  repass = new Repass("");
  loading: boolean = false;
  note: string = "";
  constructor(
    private configService: ConfigService,
    private route: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    if (this.configService.getToken()) {
      this.configService.checkSession().subscribe((data) => {
        if (data["login"] == true) {
          this.route.navigate(["home"]);
        } else {
          this.note = "Your session login is expired, please login again";
        }
      });
    }
  }

  goHome() {
    $("#DialogIconedSuccess").modal("hide");
    this.route.navigate(["home"]);
  }

  onSubmit() {
    this.loading = true;
    this.http
      .post<any>(environment.api + "auth/login", {
        username: this.model["email"],
        password: this.model["password"],
        remember: this.model["remember"],
        player_id: this.model["player_id"],
        device: this.model["device"],
      })
      .subscribe(
        (data) => {
          this.loading = false; 
          if (data["token"] != null) {
            $("#DialogIconedSuccess").modal("show");
            this.configService.setToken(data["token"]); 
          } else {
             this.note = "Error ! Auth fail";
          }
        },
        (error) => {
          this.loading = false;
          this.note = error["message"];
        },
      );
  }

  onResetPass() {
    this.loading = true;
    console.log(this.repass);
    this.http
      .post<any>(environment.api + "auth/forgetpass", {
        data: this.repass,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          if (data["error"] == 0) {
            $("#DialogFormForgetPass").modal("hide");
            $("#DialogReturnForgetPass").modal("show");
          } else {
            alert("Error ! Auth fail");
          }
        },
        (error) => {
          this.loading = false;
          alert("Server Error or Internet problem ");
        },
      );
  }
}
