import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HoverRatingChangeEvent } from 'angular-star-rating/lib/interfaces/hover-rating-change-event.interface';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Album } from 'src/app/models/Music/album';
import { Review } from 'src/app/models/Music/review';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { MusicHubService } from 'src/app/services/SignalR/music.hub.service';


@Component({
    selector: 'app-review-form-component',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

    @Input() album: Album;
    @Input() currentFormUser: UserDTO;
    @Input() albumId: string;
    reactiveForm: FormGroup;
    rating: number;
    reviewExists: boolean;
    likes: string[];

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
        });
        this.albumReviewCheck(this.albumId);
    }

    onSubmit(): void {
        var review: Review = {
            Id: "",
            Author: this.currentFormUser,
            ArtistName: this.album.artists[0].name,
            ArtistId: this.album.artists[0].id,
            AlbumId: this.album.id,
            AlbumName: this.album.name,
            AlbumImage: this.album.images[0].url,
            AlbumRate: this.reactiveForm.get("albumReview")?.value,
            AlbumThoughts: this.reactiveForm.get("albumThoughts")?.value,
            PublishedDate: new Date(),
            Edited: false,
            EditedDate: new Date(),
            Likes: this.likes,
            Replies: []
        }
        if (this.reactiveForm.valid) {
            this.reviewService.postReview(review).subscribe();
            this.reviewExists = true;
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
