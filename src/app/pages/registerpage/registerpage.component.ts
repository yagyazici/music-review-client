import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/Auth/user';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

@Component({
    selector: 'app-registerpage',
    templateUrl: './registerpage.component.html',
    styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

    user = new User();
    isAuthenticated: boolean;
    reactiveForm: FormGroup;
    hide = true;
    loading = false;
    errorText: string[];
    
    constructor(
        private authService: AuthService, 
        private router: Router, 
        private data: DataService
    ) { }

    ngOnInit(): void {
        this.reactiveForm = new FormGroup({
            username: new FormControl(""),
            email: new FormControl(""),
            password: new FormControl(""),
        });
        this.data.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
        if (this.isAuthenticated) {
            this.router.navigate(["/"]);
        }
        else return;
    }

    register() {
        this.user.Username = this.reactiveForm.value.username;
        this.user.Email = this.reactiveForm.value.email;
        this.user.Password = this.reactiveForm.value.password;
        this.loading = true
        this.authService.register(this.user).subscribe(response => {
            if (response.status){
                this.router.navigate(["login"]);
            }
            else{
                this.errorText = response.response;
            }
            this.loader();
        });
    }

    loader = () => this.loading = false
}