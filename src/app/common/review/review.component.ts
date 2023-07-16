import { Component, Input } from '@angular/core';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { EditReviewComponent } from '../edit-review/edit-review.component';
import { DeleteReviewComponent } from '../delete-review/delete-review.component';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { InnerReviewDialog } from '../inner-review-dialog/inner-review-dialog.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/CommonServices/common.service';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent {

    @Input() review: Review;
    @Input() currentUser: UserDTO;
    @Input() userId: string;
    liked = "full-heart";

    constructor(
        private reviewService: ReviewService,
        private router: Router,
        public dialog: MatDialog,
        private commonService: CommonService
    ) { }

    likeReview(event: any, review: Review) {
        let reviewId = review.Id;
        this.reviewService.likeReview(reviewId).subscribe({
            next: next => this.review = this.commonService.toggleLike(this.review, this.currentUser),
            error: error => { }
        })
        event.target.classList.toggle(this.liked);
    }

    editDialog(reviewId: string): void {
        const dialogRef = this.dialog.open(EditReviewComponent, {
            autoFocus: false,
            panelClass: "edit-panel"
        });
        let instance = dialogRef.componentInstance;
        instance.reviewId = reviewId;
    }

    deleteDialog(reviewId: string): void {
        const dialogRef = this.dialog.open(DeleteReviewComponent, {
            autoFocus: false,
            width: "450px",
            maxHeight: "750px",
            panelClass: "delete-dialog"
        });
        let instance = dialogRef.componentInstance;
        instance.reviewId = reviewId;
    }

    replyDialog() {
        var dialogRef = this.dialog.open(InnerReviewDialog, {
            autoFocus: false,
            panelClass: "inner-review-dialog"
        });
        var instance = dialogRef.componentInstance;
        instance.review = this.review;
    }

    likeText = (likeTotal: number): string => this.commonService.likeText(likeTotal);

    editedText = (review: Review): string => this.commonService.editedText(review);

    checkLiked = (likes: string[], userId: string): string => this.commonService.checkLiked(likes, userId);

    horizontalButtons = (): boolean => this.router.url.includes("profile") && this.currentUser.Id == this.userId;

    replyText = (replyTotal: number): string => this.commonService.replyText(replyTotal);

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);
}
