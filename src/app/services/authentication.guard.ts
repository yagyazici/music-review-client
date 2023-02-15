import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private authService: AuthService,
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
