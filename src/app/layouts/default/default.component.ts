import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
    
    currentRoute: any;

    constructor(private router: Router) {
        this.currentRoute = router
    }

    ngOnInit(): void {
    }
    
    title = 'MusicRate';
}