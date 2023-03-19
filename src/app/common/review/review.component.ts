import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { EditReviewComponent } from '../edit-review/edit-review.component';
import { DeleteReviewComponent } from '../delete-review/delete-review.component';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import * as moment from 'moment';
import { InnerReviewDialog } from '../inner-review-dialog/inner-review-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

    @Input() review: Review;
    @Input() currentUser: UserDTO;
    @Input() userId: string;

    liked = "full-heart";

    constructor(
        private reviewService: ReviewService,
        private router: Router,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {}

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
        return likeTotal > 0 ? `${likeTotal}` : ""
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

    horizontalButtons(): boolean{
        return this.router.url.includes("profile") && this.currentUser.Id == this.userId;
    }

    editDialog(id: string): void {
        const dialogRef = this.dialog.open(EditReviewComponent, {
            data: { reviewId: id },
            autoFocus: false,
            panelClass: "edit-panel"
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
    }

    replyDialog(reviewId: string) {
        var dialogRef = this.dialog.open(InnerReviewDialog, {
            data: { reviewId: reviewId },
            autoFocus: false,
            panelClass: "reply-dialog"
        });
    }

    replyText(replyTotal: number): string {
        return replyTotal > 0 ? `${replyTotal}` : ""
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg";
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }
}
