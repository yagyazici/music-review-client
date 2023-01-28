import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';
import { UserDTO } from 'src/app/models/userDTO';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-loginpage',
    templateUrl: './loginpage.component.html',
    styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

    user = new User();
    reactiveForm: FormGroup;
    isAuthenticated: boolean;
    error: string;
    currentUser: UserDTO;
    hide = true;
    isLoading: boolean;
    errorText: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private data: DataService
    ) { }

    ngOnInit(): void {
        this.reactiveForm = new FormGroup({
            username: new FormControl(""),
            password: new FormControl(""),
        });
        this.data.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
        if (this.isAuthenticated) {
            this.router.navigate(["/"]);
        }
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        if (localStorage.hasOwnProperty("currentlyPlaying")) {
            localStorage.removeItem("currentlyPlaying")
        }
    }

    login() {
        this.user.Username = this.reactiveForm.value.username;
        this.user.Password = this.reactiveForm.value.password;
        this.authService.login(this.user).subscribe(response => {
            if (response.status) {
                this.isLoading = false;
                localStorage.setItem('authToken', response.response.authToken.jwt);
                localStorage.setItem("tokenExpires", response.response.authToken.expires);
                localStorage.setItem("refreshToken", response.response.refreshToken.Token);
                var user = <UserDTO>response.response.currentUser;
                localStorage.setItem("user", JSON.stringify(user));
                this.data.changeCurrentUser(user);
                console.log(response);
                this.data.changeIsAuthenticated(true);
                this.router.navigate(["/"]);
            }
            else {
                this.errorText = response.response;
            }
        });
    }
}