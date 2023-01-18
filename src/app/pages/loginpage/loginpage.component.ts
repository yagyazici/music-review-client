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

    constructor(
        private authService: AuthService, 
        private router: Router, 
        private data: DataService
    ) {}

    ngOnInit(): void {
        this.reactiveForm = new FormGroup({
            email: new FormControl(""),
            password: new FormControl(""),
        });
        this.data.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
        if (this.isAuthenticated){
            this.router.navigate(["/"]);
        }
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        if (localStorage.hasOwnProperty("currentlyPlaying")){
            localStorage.removeItem("currentlyPlaying")
        }
    }

    login() {
        this.user.Email = this.reactiveForm.value.email;
        this.user.Password = this.reactiveForm.value.password;
        this.authService.login(this.user).subscribe({
            next: (data: any) => {
                var parsed = JSON.parse(data)
                localStorage.setItem('authToken', parsed.authToken.jwt);
                localStorage.setItem("tokenExpires", parsed.authToken.expires)
                localStorage.setItem("refreshToken", parsed.refreshToken.Token)
                this.data.changeIsAuthenticated(true);
                this.authService.GetMe().subscribe(data => {
                    var jsonObject = JSON.parse(data);
                    var user: UserDTO = <UserDTO>jsonObject;
                    localStorage.setItem("user", JSON.stringify(user));
                    this.data.changeCurrentUser(user);
                });
                this.router.navigate(["/"]);
            },
            error: error => {
                this.error = error.error;
            }
        });
    }
}