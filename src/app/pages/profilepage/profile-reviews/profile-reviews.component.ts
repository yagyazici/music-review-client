import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { MusicHubService } from 'src/app/services/SignalR/music.hub.service';

@Component({
    selector: 'app-profile-reviews',
    templateUrl: './profile-reviews.component.html',
    styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent implements OnInit {

    userId: string;
    userAlbumReviews: Review[];
    currentUser: UserDTO;
    reviewId: string;
    liked = "full-heart";
    loading = true;

    constructor(
        private reviewService: ReviewService,
        private data: DataService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private musicHub: MusicHubService
    ) { }

    async ngOnInit() {
        this.activatedRoute.parent?.paramMap.subscribe(params => {
            this.userId = params.get("user-id") || "";
        });
        await this.getUserAlbumReviews(this.userId);
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.musicHub.on(ReceiveFunctions.MusicReviewUpdatedMessageReceiveFunction, message => {
            var check = this.userAlbumReviews.filter(review => review.Id == message);
            if (check) {
                this.getUserAlbumReviews(this.userId);
            }
        });
        this.musicHub.on(ReceiveFunctions.MusicReviewDeletedMessageReceiveFunction, message => {
            if (message == this.userId) {
                this.getUserAlbumReviews(this.userId);
            }
        });
    }

    async getUserAlbumReviews(userId: string) {
        await firstValueFrom(this.reviewService.getUserAlbumReviews(userId)).then(data => {
            if (data){
                this.loader();
            }
            this.userAlbumReviews = data.reverse();
        });
    }

    async loader(){
        this.loading = false;
    }
}
