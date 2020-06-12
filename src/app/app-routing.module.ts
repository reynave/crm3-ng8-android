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


const routes: Routes = [
  
  { path: '', component: LoginComponent },  
  { path: 'home', component: HomeComponent },  
  
  { path: 'dash', component: DashboardComponent }, 

  { path: 'dashLead', component: DashboardLeadComponent },
  { path: 'dashLead/:period', component: DashboardLeadComponent },

  { path: 'dashSales', component: DashboardSalesComponent }, 
  { path: 'dashSales/:period', component: DashboardSalesComponent }, 
 

  { path: 'activity', component: ActivityComponent },
  { path: 'activity/:filter', component: ActivityComponent },
  
  { path: 'checkIn', component: CheckInComponent },
  { path: 'checkOut', component: CheckOutComponent },
  
  { path: 'lead', component: LeadsComponent },
  { path: 'lead/converted', component : ConvertedComponent },
  { path: 'lead/converted/:id', component: LeadConvertedComponent },
  { path: 'lead/:id', component: LeadsDetailComponent },

  { path: 'lost', component: LostComponent },
  { path: 'lost/:id', component: LostDetailComponent },

  { path: 'contact', component: ContactComponent },
  { path: 'contact/:id', component: ContactDetailComponent },

  { path: 'company', component: CompanyComponent },
  { path: 'company/:id', component: CompanyDetailComponent },

  { path : 'opportunity', component: OpportunityComponent},
  { path : 'opportunity/:id', component: OpportunityDetailComponent},
  { path : 'opportunity/new/:id_company/:id_contact', component: OpportunityNewComponent}, 
  

  { path: 'report', component: ReportComponent },
 

  { path: 'priceList', component: PriceListComponent },  
  
  { path: 'error/connection', component: ErrorConnectionComponent },


  { path: '**', component: PagesNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
