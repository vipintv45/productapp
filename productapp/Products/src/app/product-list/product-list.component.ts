import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String = "Product List";
  //product is model class for a product item
  products: ProductModel[];
  //image properties
  imageWidth : number =50;
  imageMargin : number =2;

  showImage: boolean= false;
  constructor(private productService:ProductService, private router: Router) { }
 
  toggleImage(): void{
    this.showImage = !this.showImage;
  }

  edit(product){
   this.productService.setter(product);
    console.log('function called')
    this.router.navigate(['/edit'])
  }

  delete(product){
    this.productService.delete(product)
    location.reload();
    // this.router.navigate(['/add'])
  } 

  ngOnInit(): void {
    //calling getProducts() and loading the products to products array
    this.productService.getProducts()
    .subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data))
    },
    (err)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status==500){this.router.navigate(['/login'])}
       }
    }
    
    )
  }

}
