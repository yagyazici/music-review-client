import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { CommonService } from 'src/app/services/CommonServices/common.service';

@Component({
    selector: 'app-feedpage',
    templateUrl: './feedpage.component.html',
    styleUrls: ['./feedpage.component.css']
})
export class FeedpageComponent implements OnInit {

    currentUser: UserDTO;
    isAuthenticated: boolean;
    reviews: Review[];
    loading = true;

    constructor(
        private reviewService: ReviewService,
        public dialog: MatDialog,
        private router: Router,
        private dataService: DataService,
        private commonService: CommonService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.dataService.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.getUserFeed();
    }

    getUserFeed() {
        this.reviewService.getUserFeed().subscribe(data => {
            if (data) this.loader();
            this.reviews = data.reverse();
        })
    }

    loader = () => this.loading = false;
}
