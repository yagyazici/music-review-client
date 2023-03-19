import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog'; 
import { Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { IReviewData } from 'src/app/interfaces/IReviewData';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';

@Component({
    selector: 'app-inner-review',
    templateUrl: './inner-review-dialog.component.html',
    styleUrls: ['./inner-review-dialog.component.css']
})
export class InnerReviewDialog implements OnInit {

    review: Review;
    liked = "full-heart";
    currentUser: UserDTO;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IReviewData,
        public dialogRef: MatDialogRef<InnerReviewDialog>,
        private router: Router,
        private dataService: DataService,
        private reviewService: ReviewService,
    ) {}

    async ngOnInit() {
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        await this.getAlbumReview(this.data.reviewId);
        console.log(this.review);
        
    }

    reply(comment: string){
        this.reviewService.Reply(comment, this.data.reviewId).subscribe(data => {
            console.log(data.status);
        });
    }

    async getAlbumReview(id: string) {
        await firstValueFrom(this.reviewService.getAlbumReview(id)).then(data => {
            this.review = data;
        });
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

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg"; 
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

    closeDialog() {
        this.dialogRef.close();
    }
}
