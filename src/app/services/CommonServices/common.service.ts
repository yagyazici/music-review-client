import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Review } from 'src/app/models/Music/review';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    liked = "full-heart";

    constructor(
        private router: Router,
    ) { }

    editedText = (review: Review): string =>
        review.Edited ? `${moment(review.EditedDate).fromNow()} [edited]` : `${moment(review.PublishedDate).fromNow()}`

    likeText = (likeTotal: number): string => likeTotal > 0 ? `${likeTotal}` : ""

    getImage = (profilePicture: string): string =>
        profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg";

    checkLiked = (likes: string[], userId: string): string => likes.includes(userId) ? this.liked : '';

    replyText = (replyTotal: number): string => replyTotal > 0 ? `${replyTotal}` : ""

    toggleLike = (review: Review, currentUser: UserDTO): Review => {
        if (review.Likes.includes(currentUser.Id)) {
            review.Likes = review.Likes.filter(likeId => likeId !== currentUser.Id);
        }
        else review.Likes.push(currentUser.Id)
        return review;
    }

    reduceAlbums = (arr: ArtistAlbumsItem[]): ArtistAlbumsItem[] => {
        return arr.reduce((albums: ArtistAlbumsItem[], first) => {
            if (!albums.some(second => second.name === first.name)) albums.push(first)
            return albums;
        }, []);
    }

    reloadPage = () => {
        const currentUrl = this.router.url;
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }
    
    private createImgPath = (serverPath: string) => `https://localhost:7172/${serverPath}`;
}
