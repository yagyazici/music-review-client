import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-profilepage',
    templateUrl: './profilepage.component.html',
    styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

    constructor(
        private authService: AuthService
    ) { }

    async ngOnInit() {
        this.authService.refreshToken()
    }    
}
