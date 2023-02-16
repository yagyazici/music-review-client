import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HoverRatingChangeEvent } from 'angular-star-rating/lib/interfaces/hover-rating-change-event.interface';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { Review } from 'src/app/models/review';
import { UserDTO } from 'src/app/models/userDTO';
import { MusicHubService } from 'src/app/services/music.hub.service';
import { ReviewService } from 'src/app/services/review.service';


@Component({
    selector: 'app-review-form-component',
    templateUrl: './review-form-component.component.html',
    styleUrls: ['./review-form-component.component.css']
})
export class ReviewFormComponentComponent implements OnInit {

    @Input() albumForm: any;
    @Input() currentFormUser: UserDTO;
    @Input() albumId: string;
    reactiveForm: FormGroup;
    rating: any;
    currentUser: UserDTO;
    reviewExists: boolean;
    likes: string[];
    onHoverRatingChangeResult: HoverRatingChangeEvent;

    constructor(
        private reviewService: ReviewService,
        private musicHub: MusicHubService
    ) { }

    async ngOnInit() {
        this.reactiveForm = new FormGroup({
            albumReview: new FormControl("", Validators.required),
            albumThoughts: new FormControl("", Validators.required),
        });
        this.musicHub.on(ReceiveFunctions.MusicReviewAddedMessageReceiveFunction, message => {
            if (message.albumId == this.albumId && message.author.id == this.currentFormUser.Id) {
                this.albumReviewCheck(this.albumId);
            }
        })
        this.albumReviewCheck(this.albumId);
    }

    onSubmit(): void {
        var review: Review = {
            Id: "",
            Author: this.currentFormUser,
            ArtistName: this.albumForm.artists[0].name,
            ArtistId: this.albumForm.artists[0].id,
            AlbumId: this.albumForm.id,
            AlbumName: this.albumForm.name,
            AlbumImage: this.albumForm.images[0].url,
            AlbumRate: this.reactiveForm.get("albumReview")?.value,
            AlbumThoughts: this.reactiveForm.get("albumThoughts")?.value,
            PublishedDate: new Date(),
            Edited: false,
            EditedDate: new Date(),
            Likes: this.likes
        }
        if (this.reactiveForm.valid) {
            this.reviewService.postReview(review).subscribe();
        }
        else {
            return;
        }
    }

    onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
        if ($event && $event.hoverRating != 0) {
            this.rating = $event.hoverRating;
        }
        else {
            this.rating = this.reactiveForm.get("albumRate")?.value;
        }
    };

    albumReviewCheck(albumId: string) {
        this.reviewService.albumReviewCheck(albumId).subscribe(data => {
            this.reviewExists = data;
        })
    }
}
