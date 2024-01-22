import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-frm',
  templateUrl: './product-frm.component.html',
  styleUrl: './product-frm.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ProductFrmComponent {
  title   = "-: Add Product :-"
  types   = ["Fruit", "Vegetable", "Fast Food"];
  selectedType = "Vegetable";

  onSubmit(frm:NgForm){
    console.log('-: hello :-');
    console.log(frm.form.value['product_name']);
    console.log(frm.form.value);
  }
}
