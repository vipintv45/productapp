import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductModel } from './product-list/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product:ProductModel;

  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }
  newProduct(item)
  {
    return this.http.post("http://localhost:3000/insert",{"product":item})
    .subscribe(data=>{console.log(data)})
  } 
  editProduct(item)
  {
    return this.http.post("http://localhost:3000/edit",{"product":item})
    .subscribe(data=>{console.log(data)})
  } 


 setter(product){
   console.log("settercalled") 
  
   this.product=product;
   console.log(product);
   
 }
 hi(){
   return this.product;
 }

 delete(product){
   console.log("delete clicked")
  return this.http.post("http://localhost:3000/delete",{"product":product}) 
  .subscribe(data=>{console.log(data)})
}
}
 