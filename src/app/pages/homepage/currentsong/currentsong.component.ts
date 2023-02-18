import { Component, Input, OnInit } from '@angular/core';
import { SpotifyserviceService } from 'src/app/services/Spotify/spotifyservice.service';


@Component({
    selector: 'app-currentsong',
    templateUrl: './currentsong.component.html',
    styleUrls: ['./currentsong.component.css']
})
export class CurrentsongComponent implements OnInit {

    constructor(
        private spotify: SpotifyserviceService
    ) { }
    currentlyPlaying: any;
    @Input() toCurrentSong: boolean;
    loaded: boolean = false;
    
    async ngOnInit(){
        await this.spotify.getToken()
        this.currentSong()
    }
    
    currentSong(){
        this.spotify.currentSong().subscribe({
            next: (data: any) => {
                if (data) {
                    this.loaded = true;
                }
                var parsed = JSON.parse(data);
                this.currentlyPlaying = parsed;
            },
            error: error => {
                console.log(error);
            }
        })
    }
}

