import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LandInBainObaidComponent } from './Lujain/land-in-bain-obaid/land-in-bain-obaid.component';
import { TendersComponent } from './Dima/tenders/tenders.component';
import { TenderDetailsComponent } from './Dima/tender-details/tender-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    LandInBainObaidComponent,
    TendersComponent,
    TenderDetailsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'landBaniObaid', component: LandInBainObaidComponent },
      { path: 'Tenders', component: TendersComponent },
      { path: "tenderdetail/:id", component: TenderDetailsComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
