import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
    selector: 'app-registerpage',
    templateUrl: './registerpage.component.html',
    styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {
    
    user = new User();
    errors: any;
    isAuthenticated: boolean;
    reactiveForm: FormGroup;
    hide = true;
    constructor(private authService: AuthService, private router: Router, private data: DataService) { }

    ngOnInit(): void {
        this.reactiveForm = new FormGroup({
            username: new FormControl(""),
            email: new FormControl(""),
            password: new FormControl(""),
        });
        this.data.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
        if (localStorage.hasOwnProperty("currentlyPlaying")){
            localStorage.removeItem("currentlyPlaying")
        }
        if (this.isAuthenticated){
            this.router.navigate(["/"]);
        }
        else{
            return;
        }
    }

    register(){
        this.user.Username = this.reactiveForm.value.username;
        this.user.Email = this.reactiveForm.value.email;
        this.user.Password = this.reactiveForm.value.password;
        this.authService.register(this.user).subscribe({
            next: () => {
                this.router.navigate(["login"])
            },
            error: error => {
                var parsed = JSON.parse(error.error);
                this.errors = parsed;
            }
        });
    }
}