import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard  {

    constructor(
        private router: Router
    ) { }
    
    canActivate = (): boolean => {
        let isAuth = localStorage.getItem("authToken") !== null
        if (!isAuth) {
            this.router.navigate(["/login"]);
            return false;
        }
        return isAuth
    }
}
