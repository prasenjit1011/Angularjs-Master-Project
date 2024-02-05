import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { TickerTapeComponent } from './components/ticker-tape/ticker-tape.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoute = [
  {path : '', component:TickerTapeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TickerTapeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
