import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'src/app/models/artist';
import { SpotifyserviceService } from 'src/app/services/Spotify/spotifyservice.service';

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
        private spotifyService: SpotifyserviceService,
        private router: Router,
    ) { }

    async ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.artistId = params.get("artist-id") || "";
        });

        await this.spotifyService.getToken();

        this.getArtist(this.artistId);

        this.currentUrl = this.router.url;
        
    }

    getArtist(artistId: string){
        this.spotifyService.getArtist(artistId).subscribe({
            next: next => {
                var parsed = <Artist>JSON.parse(next);
                this.artist = parsed;
            },
            error: error => {
                this.error = error;
            }
        })
    }
}
