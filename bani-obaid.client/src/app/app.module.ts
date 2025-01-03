import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ComplainComponent } from './Lujain/complain/complain.component';
import { TeamComponent } from './Lujain/team/team.component';
import { PollsComponent } from './Hosam/polls/polls.component';
import { PollDetailsComponent } from './Hosam/poll-details/poll-details.component';
import { LoginComponent } from './Admin/login/login.component';
import { ProfileComponent } from './Admin/profile/profile.component';
import { AddPollComponent } from './Admin/add-poll/add-poll.component';
import { GetPollsComponent } from './Admin/get-polls/get-polls.component';
import { AboutMunicipalityComponent } from './Ahmad/about-municipality/about-municipality.component';
import { PresidentComponent } from './Ahmad/president/president.component';
import { MunicipalityMemberComponent } from './Ahmad/municipality-member/municipality-member.component';
import { OrganizationStructureComponent } from './Ahmad/organization-structure/organization-structure.component';
import { GetTendersComponent } from './Admin/get-tenders/get-tenders.component';
import { AddTendersComponent } from './Admin/add-tenders/add-tenders.component';
import { UpdateTendersComponent } from './Admin/update-tenders/update-tenders.component';
import { EventDetailsComponent } from './Mohammad/event-details/event-details.component';
import { EventManagementComponent } from './Mohammad/event-management/event-management.component';
import { EventFormComponent } from './Mohammad/event-form/event-form.component';
import { RegistrationManagementComponent } from './Mohammad/registration-management/registration-management.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ImageHomePageComponent } from './Ahmad/image-home-page/image-home-page.component';
import { HomePresidentComponent } from './Ahmad/home-president/home-president.component';
import { StatisticsComponent } from './Ahmad/statistics/statistics.component';
import { PartnerComponent } from './Ahmad/partner/partner.component';
import { GetSuggestionComponent } from './Admin/get-suggestion/get-suggestion.component';
import { SuggestionDetailComponent } from './Admin/suggestion-detail/suggestion-detail.component';
import { InvestmentComponent } from './Admin/investment/investment.component';
import { AddInvestmentComponent } from './Admin/add-investment/add-investment.component';
import { UpdateInvestmentComponent } from './Admin/update-investment/update-investment.component';
import { ProjectsAdminComponent } from './Admin/projects-admin/projects-admin.component';
import { AddProjectComponent } from './Admin/add-project/add-project.component';
import { UpdateProjectComponent } from './Admin/update-project/update-project.component';
import { AddBaniObaidTComponent } from './Admin/add-bani-obaid-t/add-bani-obaid-t.component';
import { AddBaniObaidGeneralComponent } from './Admin/add-bani-obaid-general/add-bani-obaid-general.component';
import { LandManagmentComponent } from './Admin/land-managment/land-managment.component';
import { UpdateLandMarkComponent } from './Admin/update-land-mark/update-land-mark.component';
import { ShowImgagesLandOneComponent } from './Admin/show-imgages-land-one/show-imgages-land-one.component';
import { FeatureComponent } from './Ahmad/feature/feature.component';
import { HomeEventComponent } from './Ahmad/home-event/home-event.component';
import { AdminPresidentComponent } from './Admin/admin-president/admin-president.component';
import { EditPresidentComponent } from './Admin/edit-president/edit-president.component';
import { GetComplainsComponent } from './Admin/get-complains/get-complains.component';
import { NorthManagmentComponent } from './Admin/north-managment/north-managment.component';
import { UpdatNorthComponent } from './Admin/updat-north/updat-north.component';
import { AddNewNorthComponent } from './Admin/add-new-north/add-new-north.component';
import { ShowImageForNorthComponent } from './Admin/show-image-for-north/show-image-for-north.component';
import { AdminAboutMunicipalityComponent } from './Admin/admin-about-municipality/admin-about-municipality.component';
import { EditAboutMunicipalityComponent } from './Admin/edit-about-municipality/edit-about-municipality.component';
import { AdminorganizationStructureComponent } from './Admin/adminorganization-structure/adminorganization-structure.component';
import { EditStructureComponent } from './Admin/edit-structure/edit-structure.component';
import { AdminMunicipalityMemberComponent } from './Admin/admin-municipality-member/admin-municipality-member.component';
import { EditMemberComponent } from './Admin/edit-member/edit-member.component';
import { AddMemberComponent } from './Admin/add-member/add-member.component';
import { OwnershipTransferManagementComponent } from './Mohammad/ownership-transfer-management/ownership-transfer-management.component';
import { AdminPollDetailsComponent } from './Admin/admin-poll-details/admin-poll-details.component';
import { MunicipalitiesComponent } from './Mohammad/municipalities/municipalities.component';
import { AdminPartnersComponent } from './Admin/admin-partners/admin-partners.component';
import { AddPartnerComponent } from './Admin/add-partner/add-partner.component';
import { EditPartnersComponent } from './Admin/edit-partners/edit-partners.component';
import { AdminImageHomePageComponent } from './Admin/admin-image-home-page/admin-image-home-page.component';
import { AddImageHomePageComponent } from './Admin/add-image-home-page/add-image-home-page.component';
import { EditImageHomePageComponent } from './Admin/edit-image-home-page/edit-image-home-page.component';
import { AdminGuard } from './Hosam/Services/admin.guard';
import { AreaDetailsComponent } from './Mohammad/area-details/area-details.component';

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
    GeneralLandDetailsComponent,
    AdminDashboardComponent,
    ComplainComponent,
    TeamComponent,
    PollsComponent,
    PollDetailsComponent,
    LoginComponent,
    ProfileComponent,
    AddPollComponent,
    GetPollsComponent,
    AboutMunicipalityComponent,
    PresidentComponent,
    MunicipalityMemberComponent,
    OrganizationStructureComponent,
    GetTendersComponent,
    AddTendersComponent,
    OrganizationStructureComponent,
    EventDetailsComponent,
    EventManagementComponent,
    EventFormComponent,
    RegistrationManagementComponent,
    DashboardComponent,
    RegistrationManagementComponent,
    UpdateTendersComponent,
    GetSuggestionComponent,
    SuggestionDetailComponent,
    AddBaniObaidTComponent,
    AddBaniObaidGeneralComponent,
    LandManagmentComponent,
    UpdateLandMarkComponent,
    ShowImgagesLandOneComponent,


    RegistrationManagementComponent,
    ImageHomePageComponent, 
    HomePresidentComponent, 
    StatisticsComponent,
    PartnerComponent,
    InvestmentComponent,
    AddInvestmentComponent,
    UpdateInvestmentComponent,
    ProjectsAdminComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    FeatureComponent,
    HomeEventComponent,
    AdminPresidentComponent,
    EditPresidentComponent,
    GetComplainsComponent,
    NorthManagmentComponent,
    UpdatNorthComponent,
    AddNewNorthComponent,
    ShowImageForNorthComponent,
    AdminAboutMunicipalityComponent,
    EditAboutMunicipalityComponent,
    AdminorganizationStructureComponent,
    EditStructureComponent,
    AdminMunicipalityMemberComponent,
    EditMemberComponent,
    AddMemberComponent,
    OwnershipTransferManagementComponent,
    AdminPollDetailsComponent,
    MunicipalitiesComponent,
    AdminPartnersComponent,
    AddPartnerComponent,
    EditPartnersComponent,
    AdminImageHomePageComponent,
    AddImageHomePageComponent,
    EditImageHomePageComponent,
    AreaDetailsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'landBaniObaid', component: LandInBainObaidComponent },
      { path: "landmark/:id", component: LandMarkDetailsComponent },
      { path: 'north', component: GeneralLandComponent },
      { path: "north/:id", component: GeneralLandDetailsComponent },
      { path: 'complain', component: ComplainComponent },
      { path: 'team', component: TeamComponent },
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
      { path: "Polls", component: PollsComponent },
      { path: "AboutMunicipality", component: AboutMunicipalityComponent },
      { path: "President", component: PresidentComponent },
      { path: "MunicipalityMember", component: MunicipalityMemberComponent },
      { path: "OrganizationStructure", component: OrganizationStructureComponent },
      { path: "Poll/:id", component: PollDetailsComponent },
      { path: "eventdetail/:id", component: EventDetailsComponent },
      { path: "eventManagement", component: EventManagementComponent },
      { path: 'event-form', component: EventFormComponent },
      { path: 'event-form/:id', component: EventFormComponent },
      { path: 'RegistrationManagement', component: RegistrationManagementComponent },
      { path: 'Municipalities', component: MunicipalitiesComponent },
      { path: 'area-details/:id', component: AreaDetailsComponent },

      { path: "admin", component: LoginComponent },

      {
        path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AdminGuard], children: [
          { path: 'home', component: DashboardComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'polls', component: GetPollsComponent },
          { path: 'poll/:id', component: AdminPollDetailsComponent },
          { path: 'addPoll', component: AddPollComponent },
          { path: 'tenders', component: GetTendersComponent },
          { path: 'AddTenders', component: AddTendersComponent },
          { path: "updatetenders/:id", component: UpdateTendersComponent },
          { path: 'projectAdmin', component: ProjectsAdminComponent },
          { path: 'AddProject', component: AddProjectComponent },
          { path: "updateproject/:id", component: UpdateProjectComponent },
          { path: 'suggestions', component: GetSuggestionComponent },
          { path: "suggestiondetail/:id", component: SuggestionDetailComponent },
          { path: 'invesments', component: InvestmentComponent },
          { path: 'AddInvestment', component: AddInvestmentComponent },
          { path: "updateinvestments/:id", component: UpdateInvestmentComponent },
          { path: "Tourism", component: LandManagmentComponent },
          { path: "Tourism/:id", component: UpdateLandMarkComponent },
          { path: "landmark-form", component: AddBaniObaidTComponent },
          { path: "AddLink/:id", component: ShowImgagesLandOneComponent },
          { path: "TourismInNorth", component: NorthManagmentComponent },
          { path: "updateNorth/:id", component: UpdatNorthComponent },
          { path: "AddNewPlace", component: AddNewNorthComponent },
          { path: "showAllImages/:id", component: ShowImageForNorthComponent },
          { path: "ShowComplains", component: GetComplainsComponent },
          { path: "RegistrationManagement", component: RegistrationManagementComponent },
          { path: "eventManagement", component: EventManagementComponent },
          { path: 'event-form', component: EventFormComponent },
          { path: 'event-form/:id', component: EventFormComponent },
          { path: 'JobsManagement', component: JobManagementComponent },
          { path: 'addJob', component: AddJobComponent },
          { path: 'editJob/:id', component: EditJobComponent },
          { path: "AdminPresident", component: AdminPresidentComponent },
          { path: 'EditPresident/:id', component: EditPresidentComponent },
          { path: "AboutMunicipality", component: AdminAboutMunicipalityComponent },
          { path: 'EditAboutMunicipality/:id', component: EditAboutMunicipalityComponent },
          { path: "OrganizationStructure", component: AdminorganizationStructureComponent },
          { path: 'EditStructure/:id', component: EditStructureComponent },
          { path: "AdminMunicipalityMember", component: AdminMunicipalityMemberComponent },
          { path: 'EditMember/:id', component: EditMemberComponent },
          { path: 'AddMember', component: AddMemberComponent },
          { path: 'OwnershipTransfer', component: OwnershipTransferManagementComponent },
          { path: "AdminPartners", component: AdminPartnersComponent },
          { path: 'AddPartner', component: AddPartnerComponent },
          { path: 'EditPartners/:id', component: EditPartnersComponent },
          { path: "AdminImageHomePage", component: AdminImageHomePageComponent },
          { path: 'AddImageHomePage', component: AddImageHomePageComponent },
          { path: 'EditImageHomePage/:id', component: EditImageHomePageComponent },





        ]

      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
