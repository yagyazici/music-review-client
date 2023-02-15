import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings-navbar',
    templateUrl: './settings-navbar.component.html',
    styleUrls: ['./settings-navbar.component.css']
})
export class SettingsNavbarComponent implements OnInit {

    currentUrl: string;
    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        this.currentUrl = this.router.url;
        
    }

    navbarClass(route: string): string {
        return this.currentUrl == route ? "main-btn" : "empty-btn"
    }
}
