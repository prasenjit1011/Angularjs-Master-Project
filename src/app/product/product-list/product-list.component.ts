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
  apiHost = 'https://gh4csx-3000.csb.app/';

  constructor(private http: HttpClient){
    let apiUrl = 'https://gh4csx-3000.csb.app/api/hotels/list/';
    this.http
        .get(apiUrl)
        .subscribe(data=>(
          console.log(data),
          this.products = data
        ));

        let apiUrl2 = 'http://localhost:3100/api/alldata'
        this.http
            .get(apiUrl2)
            .subscribe(data=>(
              console.log(data)
              //this.products = data
            ));

  }
}
