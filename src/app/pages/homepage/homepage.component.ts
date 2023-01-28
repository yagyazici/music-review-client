import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    isAuthenticated: boolean;
    currentUser: UserDTO;
    constructor(
        private data: DataService, 
        private router: Router,
        private authService: AuthService,
    ) {}
    
    ngOnInit(): void {
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser)
        this.authService.refreshToken();
    }
}
