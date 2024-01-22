import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ProductListComponent {
  title     = '-: Product Listing :-'
  products  = [
                {name:'Apple', price:100}, 
                {name:'Banna', price : 5}, 
                {name:'Orange', price:12}
              ];
}
