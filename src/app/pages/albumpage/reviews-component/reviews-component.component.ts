import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import * as moment from 'moment';
import { MusicHubService } from 'src/app/services/SignalR/music.hub.service';
import { Review } from 'src/app/models/Music/review';
import { CommonService } from 'src/app/services/CommonServices/common.service';

@Component({
    selector: 'app-reviews-component',
    templateUrl: './reviews-component.component.html',
    styleUrls: ['./reviews-component.component.css']
})
export class ReviewsComponentComponent implements OnInit {

    albumReviews: Review[];
    albumId: string;
    constructor(
        private activated_route: ActivatedRoute,
        private reviewService: ReviewService,
        private musicHub: MusicHubService,
        private commonService: CommonService
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
            this.albumReviews = data.reverse();
        })
    }

    getParams(){
        this.activated_route.paramMap.subscribe(params => {
            this.albumId = params.get("album-id") || "";
        });
    }

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);

    editedText = (review: Review): string => this.commonService.editedText(review);
}
