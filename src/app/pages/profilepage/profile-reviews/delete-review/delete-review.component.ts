import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

export interface DialogData {
    reviewId: string;
}

@Component({
    selector: 'app-delete-review',
    templateUrl: './delete-review.component.html',
    styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent implements OnInit {

    albumReview: Review;
    constructor(
        public dialogRef: MatDialogRef<DeleteReviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private reviewService: ReviewService,
        private snackBar: MatSnackBar
    ) {}

    async ngOnInit() {
        await this.getAlbumReview(this.data.reviewId);
    }

    async getAlbumReview(id: string) {
        await firstValueFrom(this.reviewService.getAlbumReview(id)).then(data => {
            this.albumReview = data;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(){
        this.reviewService.DeleteAlbumReview(this.data.reviewId).subscribe();
        this.dialogRef.close();
        this.openSnackBar();
    }

    openSnackBar() {
        this.snackBar.open('Review deleted successfully!', 'Close');
    }
}
