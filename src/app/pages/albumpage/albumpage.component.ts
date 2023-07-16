import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { Album } from 'src/app/models/Music/album';
import { firstValueFrom } from 'rxjs';
import { ReviewService } from 'src/app/services/ModelServices/review.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

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
        private spotifyService: SpotifyService,
        private dataService: DataService,
        private authService: AuthService,
        private reviewService: ReviewService
    ) { }

    async ngOnInit() {
        this.dataService.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

        this.activatedRoute.params.subscribe(params => {
            this.albumId = params["album-id"];
        });

        this.getAlbum(this.albumId);

        this.checkUserLikedAlbum(this.albumId)

        this.getAlbumLikedCount(this.albumId);

        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    }

    getAlbum(id: string) {
        this.spotifyService.getAlbum(id).subscribe(data => {
            this.album = data;
        });
    }

    likeButton() {
        this.liked = !this.liked
        this.authService.likeAlbum(this.album).subscribe(data => {
            if (data) this.liked ? this.likeCount += 1 : this.likeCount -= 1
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
