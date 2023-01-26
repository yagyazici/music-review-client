import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubUrls } from 'src/app/constants/hub-urls';
import { Review } from 'src/app/models/review';

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
        private signalRService: SignalRService
    ) { }

    ngOnInit(){
        this.getParams();
        this.signalRService.on(HubUrls.MusicRateHub, ReceiveFunctions.MusicReviewAddedMessageReceiveFunction, message => {
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
}
