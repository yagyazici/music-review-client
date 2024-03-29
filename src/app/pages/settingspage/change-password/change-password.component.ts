import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { CommonService } from 'src/app/services/CommonServices/common.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    
    currentUser: UserDTO;
    reactiveForm: FormGroup;
    currentHide = true;
    newHide1 = true;
    newHide2 = true;
    matchError: string;
    errorText: string;

    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private commonService: CommonService
    ){}
    
    ngOnInit(): void {
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.reactiveForm = new FormGroup({
            currentPassword: new FormControl(""),
            newPassword1: new FormControl(""),
            newPassword2: new FormControl(""),
        });
    }

    updatePassword(){
        this.matchError = "";
        var currentPassword = this.reactiveForm.value.currentPassword || "";
        var newPassword1 = this.reactiveForm.value.newPassword1 || " ";
        var newPassword2 = this.reactiveForm.value.newPassword2 || " ";
        if (newPassword1 != newPassword2 ){
            this.matchError = "Passwords do not match.";
            return;
        }
        this.matchError = "";
        if ([newPassword1, newPassword2].includes(null))
        {
            this.errorText = "Passwords cant be null";
            return;
        }
        this.matchError = "";
        this.authService.updatePassword(currentPassword, newPassword1).subscribe(response => {
            if (response.status){
                this.authService.logout();
                return;
            }
            this.errorText =  response.response;
        });
    }

    reloadPage = () => this.commonService.reloadPage();
}
