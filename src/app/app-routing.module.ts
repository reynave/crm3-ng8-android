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
import { DashboardLeadComponent } from './dashboard/dashboard-lead/dashboard-lead.component';
import { ActivityComponent } from './activity/activity.component';
import { ErrorConnectionComponent } from './global/error-connection/error-connection.component';
import { DashboardSalesComponent } from './dashboard/dashboard-sales/dashboard-sales.component';
import { CheckInComponent } from './activity/check-in/check-in.component';
import { CheckOutComponent } from './activity/check-out/check-out.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { ConvertedComponent } from './leads/converted/converted.component';
import { LeadConvertedComponent } from './leads/lead-converted/lead-converted.component';
import { LostComponent } from './lost/lost.component';
import { LostDetailComponent } from './lost/lost-detail/lost-detail.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { OpportunityDetailComponent } from './opportunity/opportunity-detail/opportunity-detail.component';
import { OpportunityNewComponent } from './opportunity/opportunity-new/opportunity-new.component';
import { ActiveGuardGuard } from './guard/active-guard.guard';
import { ReloginComponent } from './login/relogin/relogin.component';

const routes: Routes = [
  
  { path: '', component: LoginComponent }, 
  { path: 'relogin', component: ReloginComponent }, 
 
  { path: 'home', component: HomeComponent , canActivate: [ActiveGuardGuard]},  
  
  { path: 'dash', component: DashboardComponent , canActivate: [ActiveGuardGuard]}, 

  { path: 'dashLead', component: DashboardLeadComponent , canActivate: [ActiveGuardGuard]},
  { path: 'dashLead/:period', component: DashboardLeadComponent , canActivate: [ActiveGuardGuard]},

  { path: 'dashSales', component: DashboardSalesComponent , canActivate: [ActiveGuardGuard]}, 
  { path: 'dashSales/:period', component: DashboardSalesComponent , canActivate: [ActiveGuardGuard]}, 
 

  { path: 'activity', component: ActivityComponent , canActivate: [ActiveGuardGuard]},
  { path: 'activity/:filter', component: ActivityComponent , canActivate: [ActiveGuardGuard]},
  
  { path: 'checkIn', component: CheckInComponent , canActivate: [ActiveGuardGuard]},
  { path: 'checkOut', component: CheckOutComponent , canActivate: [ActiveGuardGuard]},
  
  { path: 'lead', component: LeadsComponent , canActivate: [ActiveGuardGuard]},
  { path: 'lead/converted', component : ConvertedComponent , canActivate: [ActiveGuardGuard]},
  { path: 'lead/converted/:id', component: LeadConvertedComponent , canActivate: [ActiveGuardGuard]},
  { path: 'lead/:id', component: LeadsDetailComponent , canActivate: [ActiveGuardGuard]},

  { path: 'lost', component: LostComponent , canActivate: [ActiveGuardGuard]},
  { path: 'lost/:id', component: LostDetailComponent , canActivate: [ActiveGuardGuard]},

  { path: 'contact', component: ContactComponent , canActivate: [ActiveGuardGuard]},
  { path: 'contact/:id', component: ContactDetailComponent , canActivate: [ActiveGuardGuard]},

  { path: 'company', component: CompanyComponent , canActivate: [ActiveGuardGuard]},
  { path: 'company/:id', component: CompanyDetailComponent , canActivate: [ActiveGuardGuard]},

  { path : 'opportunity', component: OpportunityComponent , canActivate: [ActiveGuardGuard]},
  { path : 'opportunity/:id', component: OpportunityDetailComponent , canActivate: [ActiveGuardGuard]},
  { path : 'opportunity/new/:id_company/:id_contact', component: OpportunityNewComponent , canActivate: [ActiveGuardGuard]}, 
  

  { path: 'report', component: ReportComponent , canActivate: [ActiveGuardGuard]},
 

  { path: 'priceList', component: PriceListComponent , canActivate: [ActiveGuardGuard]},  
  
  { path: 'error/connection', component: ErrorConnectionComponent }, 


  { path: '**', component: PagesNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
