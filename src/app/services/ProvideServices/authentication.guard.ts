import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }
    canActivate() {
        let isAuth = localStorage.getItem("authToken") !== null
        if (!isAuth) {
            this.router.navigate(["/login"]);
            return false;
        }
        return isAuth
    }
}
