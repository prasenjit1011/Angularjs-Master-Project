import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  title = "-: Product Details :-";
  id    = 0;
  name  = 'NA'
  constructor(private route:ActivatedRoute){

  }

  ngOnInit(){
    this.id   = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'];

    this.route.params.subscribe(
      (params : Params) => {
        this.id   = params['id'];
        this.name = params['name'];
      }
    );
  }
}
