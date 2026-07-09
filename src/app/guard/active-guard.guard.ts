import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ConfigService } from '../service/config.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private configService: ConfigService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.configService.token(); 
    if (!token) {
      console.warn("YOU ARE NOT LOGGED IN!");
      this.router.navigate(['relogin']);
      return false;
    }else{
        return true;
    }
  } 
}