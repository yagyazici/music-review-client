import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { CommonService } from 'src/app/services/CommonServices/common.service';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';

@Component({
    selector: 'app-inner-review',
    templateUrl: './inner-review-dialog.component.html',
    styleUrls: ['./inner-review-dialog.component.css']
})
export class InnerReviewDialog implements OnInit {

    @Input() review: Review;
    liked = "full-heart";
    currentUser: UserDTO;

    constructor(
        public dialogRef: MatDialogRef<InnerReviewDialog>,
        private dataService: DataService,
        private reviewService: ReviewService,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    }

    reply(comment: string) {
        this.reviewService.Reply(comment, this.review.Id).subscribe(data => {
            console.log(data.status);
        });
    }

    async getAlbumReview(id: string) {
        await firstValueFrom(this.reviewService.getAlbumReview(id)).then(data => {
            this.review = data;
        });
    }

    likeText = (likeTotal: number): string => this.commonService.likeText(likeTotal);

    editedText = (review: Review): string => this.commonService.editedText(review)

    checkLiked = (likes: string[], userId: string): string => this.commonService.checkLiked(likes, userId);

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);

    likeReview(event: any, review: Review) {
        this.reviewService.likeReview(this.review.Id).subscribe({
            next: next => this.review = this.commonService.toggleLike(this.review, this.currentUser),
            error: error => { }
        })
        event.target.classList.toggle(this.liked);
    }

    closeDialog = () => this.dialogRef.close();
}
