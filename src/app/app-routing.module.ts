import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeadsComponent } from './leads/leads.component';
import { PagesNotFoundComponent } from './pages-not-found/pages-not-found.component';
import { HomeComponent } from './home/home.component';
import { LeadsDetailComponent } from './leads/leads-detail/leads-detail.component';


const routes: Routes = [
  
  { path: '', component: LoginComponent },  
  { path: 'home', component: HomeComponent },  
  
  { path: 'lead', component: LeadsComponent },
  { path: 'lead/:id', component: LeadsDetailComponent },

  { path: '**', component: PagesNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
