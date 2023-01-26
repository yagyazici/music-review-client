import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { Review } from 'src/app/models/review';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';
import { ReviewService } from 'src/app/services/review.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { DeleteReviewComponent } from './delete-review/delete-review.component';
import { EditReviewComponent } from './edit-review/edit-review.component';

@Component({
    selector: 'app-profile-reviews',
    templateUrl: './profile-reviews.component.html',
    styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent implements OnInit {

    userId: string;
    userAlbumReviews: Review[];
    currentUser: UserDTO;
    reviewId: string = "";

    constructor(
        private reviewService: ReviewService,
        private data: DataService,
        public dialog: MatDialog,
        private signalRService: SignalRService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.authService.refreshToken()
        this.activatedRoute.parent?.paramMap.subscribe(params => {
            this.userId = params.get("user-id") || "";
        });
        await this.getUserAlbumReviews(this.userId);
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.signalRService.on(HubUrls.MusicRateHub, ReceiveFunctions.MusicReviewUpdatedMessageReceiveFunction, message => {
            var check = this.userAlbumReviews.filter(review => review.Id == message);
            if (check) {
                this.getUserAlbumReviews(this.userId);
            }
        });
        this.signalRService.on(HubUrls.MusicRateHub, ReceiveFunctions.MusicReviewDeletedMessageReceiveFunction, message => {
            if (message == this.userId) {
                this.getUserAlbumReviews(this.userId);
            }
        });
        this.userAlbumReviews.sort((a, b) => new Date(a.EditedDate).getTime() - new Date(b.EditedDate).getTime())
    }

    async getUserAlbumReviews(userId: string) {
        await firstValueFrom(this.reviewService.getUserAlbumReviews(userId)).then(data => {
            this.userAlbumReviews = data;
        });
    }

    editDialog(id: string): void {
        const dialogRef = this.dialog.open(EditReviewComponent, {
            data: { reviewId: id },
            autoFocus: false,
            width: "auto",
            maxHeight: "750px",
            panelClass: "edit-dialog"
            
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reviewId = result;
        });
    }

    deleteDialog(id: string): void {
        const dialogRef = this.dialog.open(DeleteReviewComponent, {
            data: { reviewId: id },
            autoFocus: false,
            width: "450px",
            maxHeight: "750px",
            panelClass: "delete-dialog"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reviewId = result;
        });
    }
}
