import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeadsComponent } from './leads/leads.component';
import { PagesNotFoundComponent } from './pages-not-found/pages-not-found.component';
import { HomeComponent } from './home/home.component';
import { LeadsDetailComponent } from './leads/leads-detail/leads-detail.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ContactComponent } from './contact/contact.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';


const routes: Routes = [
  
  { path: '', component: LoginComponent },  
  { path: 'home', component: HomeComponent },  
  
  { path: 'lead', component: LeadsComponent },
  { path: 'lead/:id', component: LeadsDetailComponent },

  { path: 'contact', component: ContactComponent },
  { path: 'contact/:id', component: ContactDetailComponent },

  { path: 'company', component: CompanyComponent },
  { path: 'company/:id', component: CompanyDetailComponent },



  { path: 'priceList', component: PriceListComponent },  
  

  { path: '**', component: PagesNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
