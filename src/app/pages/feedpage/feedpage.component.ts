import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
    selector: 'app-feedpage',
    templateUrl: './feedpage.component.html',
    styleUrls: ['./feedpage.component.css']
})
export class FeedpageComponent implements OnInit {

    currentUser: UserDTO;
    isAuthenticated: boolean;
    reviews: Review[];
    liked = "fa-solid fa-heart text-danger m-0 p-0";
    notLiked = "fa-regular fa-heart m-0 p-0"

    constructor(
        private authService: AuthService,
        private reviewService: ReviewService,
        private dataService: DataService,
    ) { }

    ngOnInit(): void {
        this.authService.refreshToken();
        this.dataService.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.getUserFeed();
    }

    getUserFeed(){
        this.reviewService.getUserFeed().subscribe({
            next: next => {
                this.reviews = <Review[]>JSON.parse(next);
            },
            error: error => {
                console.log(error);
            }
        })
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7161/${serverPath}`; 
    }

    likeButton(reviewId: string){
        
        this.reviewService.likeReview(reviewId).subscribe({
            next: next => {
                console.log(next);
            },
            error: error => {

            }
        })
    }

    updateLike(reviewId: string){
        var userId = this.currentUser.Id
        var review = this.reviews.find(review => review.Id == reviewId);
        var check = review?.Likes.includes(userId);
        return check;
    }
}
