import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import{ AuthService } from '../auth.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 registeredUser={email:"",password :"" };
  constructor(private _router:Router,private _auth:AuthService) { } 
 registerUser()
 {
   this._auth.registerUser(this.registeredUser)
   .subscribe(
     res=>{
      localStorage.setItem('token',res["token"]) 
      console.log(res)
    this._router.navigate(['/'])
    },
     err=>console.log(err)
   )
 
 }
  ngOnInit(): void {
  }

}
