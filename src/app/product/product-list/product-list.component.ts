import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ProductListComponent {
  title     = '-: Product Listing :-'
  products  = undefined;

  constructor(private http: HttpClient){
    let apiUrl = 'https://gh4csx-3000.csb.app/api/hotels/list/';
    this.http
        .get(apiUrl)
        .subscribe(data=>(
          console.log(this.title),
          this.products = data
        ));
  }
}
