import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import  firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(
      (reslove, reject)=>{
        firebase.auth().onAuthStateChanged(
            (user)=>{
              if(user){
                  reslove(true);
              }
              else{
                this.router.navigate(['/auth', 'signin'])
                reslove(false);
              }
            }
        );
      }
    );
  }
}
