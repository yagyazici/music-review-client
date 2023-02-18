import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

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
