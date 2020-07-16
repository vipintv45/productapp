import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private _auth:AuthService,private _router:Router)
    {

    }
    canActivate():boolean{
      if(this._auth.loggedIn())
      {
        console.log('true');
        return true

      }
      else
      {
        
        this._router.navigate(['/login']);
        return false
      }
    }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
}
