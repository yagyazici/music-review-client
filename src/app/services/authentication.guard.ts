import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    
    constructor (private authService: AuthService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): 
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | 
        UrlTree {
            if (!this.authService.isLoggedIn()){
                this.router.navigate(["/login"]);
                return false;
            }
            else{
                this.router.navigate(["/"]);
                return true;
            }
        }
}
