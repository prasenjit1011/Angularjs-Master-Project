import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataTablesModule } from "angular-datatables";

import { AppComponent } from './app.component';
import { TickerTapeComponent } from './components/ticker-tape/ticker-tape.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoute = [
  {path : '', component:TickerTapeComponent},
  {path : 'dashboard', component:DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TickerTapeComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
