import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../../models/Auth/userDTO';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor() { }

    isAuthenticated = localStorage.hasOwnProperty("authToken")
    private is_AuthenticatedSource = new BehaviorSubject<boolean>(this.isAuthenticated);
    currentIsAuthenticated = this.is_AuthenticatedSource.asObservable();

    changeIsAuthenticated(isAuthenticated: boolean) {
        this.is_AuthenticatedSource.next(isAuthenticated)
    }

    get_user = JSON.parse(localStorage.getItem("user") || "{}");
    final_user: UserDTO = <UserDTO>this.get_user;
    private user = new BehaviorSubject<UserDTO>(this.final_user);
    currentUser = this.user.asObservable();

    changeCurrentUser(user: UserDTO){
        this.user.next(user);
    }
}