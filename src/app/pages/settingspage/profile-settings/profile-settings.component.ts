import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { formatDate } from '@angular/common';
import { DataService } from 'src/app/services/dataservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { UserDTO } from 'src/app/models/Auth/userDTO';

export class Options {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

    loggedUser: UserDTO;
    reactiveForm: FormGroup;
    message: string;
    progress: number;
    loggedUserId: string;
    errors: string[] = [];
    days: Options[];
    selectedDay: string;
    months: Options[];
    selectedMonth: string;
    years: Options[];
    selectedYear: string;

    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private router: Router,
    ) {}

    async ngOnInit() {
        await this.authService.refreshToken();
        this.dataService.currentUser.subscribe(currentUser => this.loggedUser = currentUser);
        await this.getUser();
        this.createDays();
        this.createMonths();
        this.createYears();
        this.reactiveForm = new FormGroup({
            username: new FormControl(this.loggedUser.Username),
            bio: new FormControl(this.loggedUser.Bio),
            email: new FormControl(this.loggedUser.Email),
            day: new FormControl(this.selectedDay),
            month: new FormControl(this.selectedMonth),
            year: new FormControl(this.selectedYear),
        });
    }

    async getUser() {
        await firstValueFrom(this.authService.GetUser(this.loggedUser.Id)).then(data => {
            this.dataService.changeCurrentUser(data)
        });
    }

    updateProfile() {
        var username = this.reactiveForm.get("username")?.value;
        var bio = this.reactiveForm.get("bio")?.value;
        var birthDate = this.createNewBirthDate(
            this.reactiveForm.get("day")?.value,
            this.reactiveForm.get("month")?.value,
            this.reactiveForm.get("year")?.value,
        )
        var email = this.reactiveForm.get("email")?.value;
        if (this.reactiveForm.valid) {
            this.authService.updateProfile(username, bio, birthDate, email).subscribe({
                next: next => {
                    const currentUrl = this.router.url;
                    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
                        this.router.navigate([currentUrl]);
                    });
                },
                error: error => {
                    var parsed = JSON.parse(error.error);
                    this.errors = parsed;
                }
            })
        }
        else {
            return;
        }
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`; 
    }

    range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

    createDays(){
        let numOfDays = this.range(1,31);
        this.days = numOfDays.map(number => {
            var day: Options = {
                value: `${number}`,
                viewValue: `${number}`
            };
            return day;
        })
        this.selectedDay = new Date(this.loggedUser.BirthDate).getDate().toString();
        this.selectedDay = `${this.selectedDay}`;
    }

    createMonths(){
        let months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        this.months = months.map(m => {
            var month: Options = {
                value: `${m}`,
                viewValue: m
            }
            return month;
        })
        let month = new Date(this.loggedUser.BirthDate).getMonth();
        this.selectedMonth = `${months[month]}`;
    }

    createYears(){
        let currentYear = new Date().getFullYear();
        let numOfYears = this.range(currentYear-100, currentYear);
        this.years = numOfYears.map(y => {
            var year: Options = {
                value: `${y}`,
                viewValue: `${y}`
            }
            return year;
        }).reverse()
        this.selectedYear = new Date(this.loggedUser.BirthDate).getFullYear().toString();
        this.selectedYear = `${this.selectedYear}`;
    }

    createNewBirthDate(day: string, month: string, year: string){
        let months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let birthDay = new Date();
        birthDay.setHours(10);
        birthDay.setDate(Number(day));
        birthDay.setMonth(months.indexOf(month));
        birthDay.setFullYear(Number(year));
        return formatDate(birthDay, "dd-MM-yyyy", "en_US");
    }

    cancel(){
        const currentUrl = this.router.url;
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }
}
