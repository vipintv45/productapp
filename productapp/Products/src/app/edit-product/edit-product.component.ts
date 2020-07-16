import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product-list/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'] 
})
export class EditProductComponent implements OnInit {
  product = new ProductModel(null,null,null,null,null,null,null,null);

  constructor(private productService:ProductService, private router: Router) { }
 ngOnInit(): void { 

   this.product= this.productService.hi(); // this.productService.setter(this.product);
   
  } 

  editProduct(){
    this.productService.editProduct(this.product)
    console.log("hi form editproduct and the corresponding product name is "+ this.product.productName);
    alert("edited")
    this.router.navigate(['/'])
  }

}
