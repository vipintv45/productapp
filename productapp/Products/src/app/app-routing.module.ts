import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent }  from './new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { from } from 'rxjs';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthGuard } from './auth.guard'
const routes: Routes =
 [
   {path:'',component:ProductListComponent,canActivate:[AuthGuard]},
   {path:'add',component:NewProductComponent,canActivate:[AuthGuard]},
   {path:'edit',component:EditProductComponent,canActivate:[AuthGuard]},
   {path:'login',component:LoginComponent},
   {path:'register',component:RegisterComponent}
                     
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
