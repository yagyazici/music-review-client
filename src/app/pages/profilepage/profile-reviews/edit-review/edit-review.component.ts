import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { HoverRatingChangeEvent } from 'angular-star-rating/lib/interfaces/hover-rating-change-event.interface';
import { firstValueFrom } from 'rxjs';
import { Review } from 'src/app/models/review';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ReviewService } from 'src/app/services/ModelServices/review.service';

export interface DialogData {
    reviewId: string;
}

@Component({
    selector: 'app-edit-review',
    templateUrl: './edit-review.component.html',
    styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit{

    reactiveForm: FormGroup;
    rating: any;
    albumReview: Review;

    constructor(
        public dialogRef: MatDialogRef<EditReviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private reviewService: ReviewService,
        private snackBar: MatSnackBar,
    ) {}

    async ngOnInit() {
        await this.getAlbumReview(this.data.reviewId);
        this.rating = this.albumReview.AlbumRate;
        this.reactiveForm = new FormGroup({
            albumRate: new FormControl(this.albumReview.AlbumRate),
            albumThoughts: new FormControl(this.albumReview.AlbumThoughts, Validators.required),
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(){
        var newRate = this.reactiveForm.get("albumRate")?.value;
        var newThoughts = this.reactiveForm.get("albumThoughts")?.value;
        this.reviewService.UpdateAlbumReview(this.data.reviewId, newRate, newThoughts).subscribe();
        this.dialogRef.close();
        this.openSnackBar();
    }

    async getAlbumReview(id: string) {
        await firstValueFrom(this.reviewService.getAlbumReview(id)).then(data => {
            this.albumReview = data;
        });
    }

    onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
        if ($event && $event.hoverRating != 0) {
            this.rating = $event.hoverRating;
        }
        else {
            this.rating = this.reactiveForm.get("albumRate")?.value;
        }
    };

    openSnackBar() {
        this.snackBar.open('Review edited successfully!', 'Close');
    }
}
