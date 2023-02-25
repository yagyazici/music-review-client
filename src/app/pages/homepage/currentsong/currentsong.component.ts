import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
    selector: 'app-currentsong',
    templateUrl: './currentsong.component.html',
    styleUrls: ['./currentsong.component.css']
})
export class CurrentsongComponent implements OnInit {

    constructor(
        private spotifyService: SpotifyService
    ) { }
    currentlyPlaying: any;
    @Input() toCurrentSong: boolean;
    loaded: boolean = false;
    
    async ngOnInit(){
        this.currentSong();
    }

    currentSong() {
        this.spotifyService.currentSong().subscribe({
            next: data => {
                if (data) {
                    this.loaded = true;
                }
                this.currentlyPlaying = data;
            },
            error: error => {
                console.log(error);
            }
        })
    }
}

