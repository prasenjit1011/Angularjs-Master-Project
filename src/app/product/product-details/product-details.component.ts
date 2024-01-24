import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  title = "-: Product Details Page :-";
  id    = 0;
  name  = 'NA'
  products  = undefined;
  apiHost = 'https://gh4csx-3000.csb.app/';

  constructor(private route:ActivatedRoute, private http: HttpClient){
    let apiUrl  = 'https://gh4csx-3000.csb.app/api/hotels/details/'+this.route.snapshot.params['id'];
    this.http
        .get(apiUrl)
        .subscribe(data=>(
          console.log(data),
          this.products = data
        ));
  }

  ngOnInit(){
    /*this.id   = this.route.snapshot.params['id'];
    //this.name = this.route.snapshot.params['name'];

    /*
    this.route.params.subscribe(
      (params : Params) => {
        this.id   = params['id'];
        //this.name = params['name'];
      }
    );*/
  }
}
