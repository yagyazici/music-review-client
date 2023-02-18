import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { MusicHubService } from 'src/app/services/SignalR/music.hub.service';
import { DeleteReviewComponent } from './delete-review/delete-review.component';
import { EditReviewComponent } from './edit-review/edit-review.component';

@Component({
    selector: 'app-profile-reviews',
    templateUrl: './profile-reviews.component.html',
    styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent implements OnInit {

    userId: string;
    userAlbumReviews: Review[];
    currentUser: UserDTO;
    reviewId: string = "";
    liked = "full-heart";

    constructor(
        private reviewService: ReviewService,
        private data: DataService,
        public dialog: MatDialog,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private musicHub: MusicHubService
    ) { }

    async ngOnInit() {
        this.authService.refreshToken()
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
        this.userAlbumReviews.sort((a, b) => new Date(a.EditedDate).getTime() - new Date(b.EditedDate).getTime())
    }

    async getUserAlbumReviews(userId: string) {
        await firstValueFrom(this.reviewService.getUserAlbumReviews(userId)).then(data => {
            this.userAlbumReviews = data.reverse();
        });
    }

    editDialog(id: string): void {
        const dialogRef = this.dialog.open(EditReviewComponent, {
            data: { reviewId: id },
            autoFocus: false,
            panelClass: "edit-panel"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reviewId = result;
        });
    }

    deleteDialog(id: string): void {
        const dialogRef = this.dialog.open(DeleteReviewComponent, {
            data: { reviewId: id },
            autoFocus: false,
            width: "450px",
            maxHeight: "750px",
            panelClass: "delete-dialog"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reviewId = result;
        });
    }

    likeReview(event: any, review: Review) {
        let reviewId = review.Id;
        this.reviewService.likeReview(reviewId).subscribe({
            next: next => {
                next.responseText == "added" ? review.Likes.length += 1 : review.Likes.length -= 1;
            },
            error: error => {
            }
        })
        event.target.classList.toggle(this.liked);
    }

    likeText(likeTotal: number): string {
        return likeTotal > 0 ? `${likeTotal} likes` : "like"
    }

    editedText(review: Review): string {
        if (review.Edited)
        {
            return `${moment(review.EditedDate).fromNow()} [edited]`
        }
        return `${moment(review.PublishedDate).fromNow()}`
    }

    checkLiked(likes: string[], userId: string): string {
        return likes.includes(userId)  ? this.liked : '';
    }
}
