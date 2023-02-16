import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { Review } from 'src/app/models/review';
import * as moment from 'moment';
import { MusicHubService } from 'src/app/services/music.hub.service';

@Component({
    selector: 'app-reviews-component',
    templateUrl: './reviews-component.component.html',
    styleUrls: ['./reviews-component.component.css']
})
export class ReviewsComponentComponent implements OnInit {

    albumReviews: Review [];
    albumId: string;
    constructor(
        private activated_route: ActivatedRoute,
        private reviewService: ReviewService,
        private musicHub: MusicHubService
    ) { }

    ngOnInit(){
        this.getParams();
        this.musicHub.on(ReceiveFunctions.MusicReviewAddedMessageReceiveFunction, message => {
            if (message.albumId == this.albumId) {
                this.getAlbumReviews(this.albumId);
            }
        });
        this.getAlbumReviews(this.albumId);
    }

    getAlbumReviews(albumId: string){
        this.reviewService.getAlbumReviews(albumId).subscribe(data => {
            this.albumReviews = data;
        })
    }

    getParams(){
        this.activated_route.paramMap.subscribe(params => {
            this.albumId = params.get("album-id") || "";
        });
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`; 
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg"; 
    }

    editedText(review: Review): string {
        if (review.Edited) {
            return `${moment(review.EditedDate).fromNow()} [edited]`
        }
        return `${moment(review.PublishedDate).fromNow()}`
    }
}
