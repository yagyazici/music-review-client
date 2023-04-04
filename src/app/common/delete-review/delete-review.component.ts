import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Review } from 'src/app/models/Music/review';

@Component({
    selector: 'app-delete-review',
    templateUrl: './delete-review.component.html',
    styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent implements OnInit {

    @Input() reviewId: string;
    albumReview: Review;

    constructor(
        public dialogRef: MatDialogRef<DeleteReviewComponent>,
        private reviewService: ReviewService,
        private snackBar: MatSnackBar
    ) {}

    async ngOnInit() {
        await this.getAlbumReview(this.reviewId);
    }

    async getAlbumReview(id: string) {
        await firstValueFrom(this.reviewService.getAlbumReview(id)).then(data => {
            this.albumReview = data;
        });
    }

    closeDialog = () => this.dialogRef.close();

    onSubmit(){
        this.reviewService.DeleteAlbumReview(this.reviewId).subscribe();
        this.closeDialog();
        this.openSnackBar();
    }

    openSnackBar() {
        this.snackBar.open('Review deleted successfully!', 'Close');
    }
}
