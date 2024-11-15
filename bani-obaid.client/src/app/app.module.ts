import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LandInBainObaidComponent } from './Lujain/land-in-bain-obaid/land-in-bain-obaid.component';
import { TendersComponent } from './Dima/tenders/tenders.component';
import { TenderDetailsComponent } from './Dima/tender-details/tender-details.component';
import { ProjectComponent } from './Dima/project/project.component';
import { TruncatePipe } from './Dima/truncate/truncate.pipe';
import { ProjectDetailComponent } from './Dima/project-detail/project-detail.component';
import { InvestmentsComponent } from './Dima/investments/investments.component';
import { InvestmentDetaialComponent } from './Dima/investment-detaial/investment-detaial.component';
import { LandMarkDetailsComponent } from './Lujain/land-mark-details/land-mark-details.component';
import { JobsComponent } from './Mohammad/jobs/jobs.component';
import { JobDetailsComponent } from './Mohammad/job-details/job-details.component';
import { JobManagementComponent } from './Mohammad/jobs-management/jobs-management.component';
import { AddJobComponent } from './Mohammad/add-job/add-job.component';
import { EditJobComponent } from './Mohammad/edit-job/edit-job.component';
import { EServiceComponent } from './Mohammad/e-service/e-service.component';
import { OwnershipTransferComponent } from './Mohammad/ownership-transfer/ownership-transfer.component';
import { EventsComponent } from './Mohammad/events/events.component';
import { SuggestionsComponent } from './Dima/suggestions/suggestions.component';
import { GeneralLandComponent } from './Lujain/general-land/general-land.component';
import { GeneralLandDetailsComponent } from './Lujain/general-land-details/general-land-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    LandInBainObaidComponent,
    TendersComponent,
    TenderDetailsComponent,
    ProjectComponent,
    TruncatePipe,
    ProjectDetailComponent,
    InvestmentsComponent,
    JobsComponent,
    JobDetailsComponent,
    JobManagementComponent,
    AddJobComponent,
    EditJobComponent,
    InvestmentDetaialComponent,
    LandMarkDetailsComponent,
    EServiceComponent,
    OwnershipTransferComponent,
    EventsComponent,
    SuggestionsComponent,
    GeneralLandComponent,
    GeneralLandDetailsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'landBaniObaid', component: LandInBainObaidComponent },
      { path: "landmark/:id", component: LandMarkDetailsComponent },
      { path: 'north', component: GeneralLandComponent },
      { path: 'Tenders', component: TendersComponent },
      { path: "tenderdetail/:id", component: TenderDetailsComponent },
      { path: 'Projects', component: ProjectComponent },
      { path: "showProject/:id", component: ProjectDetailComponent },
      { path: 'Investments', component: InvestmentsComponent },
      { path: "jobs/:id", component: JobsComponent },
      { path: "jobDetailes/:id", component: JobDetailsComponent },
      { path: 'JobsManagement', component: JobManagementComponent },
      { path: 'addJob', component: AddJobComponent },
      { path: 'editJob/:id', component: EditJobComponent },
      { path: "investmentdetail/:id", component: InvestmentDetaialComponent },
      { path: 'EService', component: EServiceComponent },
      { path: 'OwnershipTransfer', component: OwnershipTransferComponent },
      { path: 'Events', component: EventsComponent },
      { path: "AddSuggestions", component: SuggestionsComponent },


    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
