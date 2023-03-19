import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { InnerReviewDialog } from 'src/app/common/inner-review-dialog/inner-review-dialog.component';

@Component({
    selector: 'app-feedpage',
    templateUrl: './feedpage.component.html',
    styleUrls: ['./feedpage.component.css']
})
export class FeedpageComponent implements OnInit {

    currentUser: UserDTO;
    isAuthenticated: boolean;
    reviews: Review[];
    liked = "full-heart";

    constructor(
        private reviewService: ReviewService,
        public dialog: MatDialog,
        private router: Router,
        private dataService: DataService,
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
            this.reviews = data.reverse();
        })
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }

    likeButton(reviewId: string) {
        this.reviewService.likeReview(reviewId).subscribe(data => {
            console.log(data);
        })
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

    replyText(replyTotal: number): string {
        return replyTotal > 0 ? `${replyTotal}` : ""
    }

    editedText(review: Review): string {
        if (review.Edited) {
            return `${moment(review.EditedDate).fromNow()} [edited]`
        }
        return `${moment(review.PublishedDate).fromNow()}`
    }

    checkLiked(likes: string[], userId: string): string {
        return likes.includes(userId) ? this.liked : '';
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg";
    }

    replyDialog(reviewId: string) {
        var dialogRef = this.dialog.open(InnerReviewDialog, {
            data: { reviewId: reviewId },
            autoFocus: false,
            panelClass: "reply-dialog"
        });
    }
}
