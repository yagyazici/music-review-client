import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyserviceService } from 'src/app/services/spotifyservice.service';
import { UserDTO } from 'src/app/models/userDTO';
import { DataService } from 'src/app/services/dataservice.service';
import { Album } from 'src/app/models/album';
import { AuthService } from 'src/app/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';

@Component({
    selector: 'app-albumpage',
    templateUrl: './albumpage.component.html',
    styleUrls: ['./albumpage.component.css']
})
export class AlbumpageComponent implements OnInit {

    albumId: string;
    album: Album;
    error: any;
    currentUser: UserDTO;
    isAuthenticated: boolean;
    liked: boolean;
    likeCount: number;
    albumDivHeight: Number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private spotifyService: SpotifyserviceService,
        private dataService: DataService,
        private authService: AuthService,
        private reviewService: ReviewService
    ) { }

    async ngOnInit() {
        await this.spotifyService.getToken();

        this.authService.refreshToken();

        this.dataService.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

        this.activatedRoute.paramMap.subscribe(params => {
            this.albumId = params.get("album-id") || "";
        });

        this.getAlbum(this.albumId);

        this.checkUserLikedAlbum(this.albumId)

        this.getAlbumLikedCount(this.albumId);

        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    }

    getAlbum(id: any) {
        this.spotifyService.getAlbum(id).subscribe({
            next: (data: any) => {
                var parsed = <Album>JSON.parse(data)
                this.album = parsed;
            },
            error: error => {
                this.error = error;
                console.log(error);
            }
        })
    }

    likeButton() {
        this.liked = !this.liked
        this.authService.likeAlbum(this.album).subscribe({
            next: (data: any) => {
                this.liked ? this.likeCount += 1 : this.likeCount -= 1;
            },
            error: error => {
                console.log(error);
            }
        })
    }

    async checkUserLikedAlbum(albumId: string) {
        await firstValueFrom(this.authService.checkUserLikedAlbum(albumId)).then(data => {
            this.liked = data;
        });
    }

    getAlbumLikedCount(albumId: string) {
        this.reviewService.getAlbumLikedCount(albumId).subscribe(data => {
            this.likeCount = data;
        })
    }

    likedClass(liked: boolean): string {
        return liked ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart";
    }
}
