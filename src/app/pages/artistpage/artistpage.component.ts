import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'src/app/models/Music/artist';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
    selector: 'app-artistpage',
    templateUrl: './artistpage.component.html',
    styleUrls: ['./artistpage.component.css']
})
export class ArtistpageComponent implements OnInit {

    artistId: string;
    artist: Artist;
    error: any;
    currentUrl: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private spotifyService: SpotifyService,
        private router: Router,
    ) { }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.artistId = params["artist-id"];
        });

        this.getArtist(this.artistId);
        this.currentUrl = this.router.url;
    }

    getArtist(artistId: string){
        this.spotifyService.getArtist(artistId).subscribe(data => {
            this.artist = data;
        });
    }
}
