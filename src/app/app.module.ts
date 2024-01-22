import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductFrmComponent } from './product/product-frm/product-frm.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//const myRoute: Route = [];


const appRoute = [
  {path : '', component:ProductListComponent},
  {path : 'product-details/:id/:name', component:ProductDetailsComponent},
  {path : 'product-add', component:ProductFrmComponent}
];
/* */

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductFrmComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
