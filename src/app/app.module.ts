import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeadsComponent } from './leads/leads.component';
import { LoginComponent } from './login/login.component';
import { PagesNotFoundComponent } from './pages-not-found/pages-not-found.component';
import { HomeComponent } from './home/home.component';
import { AppBottomMenuComponent } from './global/app-bottom-menu/app-bottom-menu.component';
import { LeadsDetailComponent } from './leads/leads-detail/leads-detail.component';
import { SearchPipe } from './pipe/search.pipe';
import { PriceListComponent } from './price-list/price-list.component';
import { CompanyComponent } from './company/company.component';
import { PriceListModalComponent } from './price-list/price-list-modal/price-list-modal.component';
import { ContactComponent } from './contact/contact.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactNewComponent } from './contact/contact-new/contact-new.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { OpportunityDetailComponent } from './opportunity/opportunity-detail/opportunity-detail.component';
import { OpportunityNewComponent } from './opportunity/opportunity-new/opportunity-new.component';
import { ActivityComponent } from './activity/activity.component';
import { WidgetActivityComponent } from './activity/widget-activity/widget-activity.component';
import { DashboardLeadComponent } from './dashboard/dashboard-lead/dashboard-lead.component';
import { ErrorConnectionComponent } from './global/error-connection/error-connection.component';
import { DashboardSalesComponent } from './dashboard/dashboard-sales/dashboard-sales.component';
import { CheckInComponent } from './activity/check-in/check-in.component';
import { CheckOutComponent } from './activity/check-out/check-out.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PriceListDetailComponent } from './price-list/price-list-detail/price-list-detail.component';
import { ReportComponent } from './report/report.component';
import { ConvertedComponent } from './leads/converted/converted.component';
import { LeadConvertedComponent } from './leads/lead-converted/lead-converted.component';
import { LostComponent } from './lost/lost.component';
import { LostDetailComponent } from './lost/lost-detail/lost-detail.component';
import { ModalOpportunityComponent } from './opportunity/modal-opportunity/modal-opportunity.component';
import { QuoteComponent } from './quote/quote.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 0,
  prefix: "Rp ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [
    AppComponent,
    LeadsComponent,
    LoginComponent,
    PagesNotFoundComponent,
    HomeComponent,
    AppBottomMenuComponent,
    LeadsDetailComponent,
    SearchPipe,
    PriceListComponent,
    CompanyComponent,
    PriceListModalComponent,
    ContactComponent,
    CompanyDetailComponent,
    ContactDetailComponent,
    ContactNewComponent,
    OpportunityComponent,
    OpportunityDetailComponent,
    OpportunityNewComponent,
    ActivityComponent,
    WidgetActivityComponent,
    DashboardLeadComponent,
    ErrorConnectionComponent,
    DashboardSalesComponent,
    CheckInComponent,
    CheckOutComponent,
    DashboardComponent,
    PriceListDetailComponent,
    ReportComponent,
    ConvertedComponent,
    LeadConvertedComponent,
    LostComponent,
    LostDetailComponent,
    ModalOpportunityComponent,
    QuoteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CurrencyMaskModule,
    ChartsModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
