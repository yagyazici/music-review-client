import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album';
import { SpotifyserviceService } from 'src/app/services/Spotify/spotifyservice.service';

@Component({
    selector: 'app-artist-singles',
    templateUrl: './artist-singles.component.html',
    styleUrls: ['./artist-singles.component.css']
})
export class ArtistSinglesComponent implements OnInit {

    artistId: string;
    albums: Album[];
    panelOpenState = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private spotifyService: SpotifyserviceService,
    ) { }

    async ngOnInit() {
        this.activatedRoute.parent?.paramMap.subscribe(params => {
            this.artistId = params.get("artist-id") || "";
        });
        this.getArtistAlbums(this.artistId, "single");
        
    }

    getArtistAlbums(artistId: string, type: string) {
        this.spotifyService.getArtistAlbums(artistId, type).subscribe({
            next: next => {
                var parsed = <Album[]>JSON.parse(next).items;
                this.albums = parsed;
                this.albums.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
                this.albums = this.reduceAlbums(this.albums);
            },
            error: error => {}
        })
    }

    reduceAlbums(arr : Album[]): Album[] {
        return arr.reduce((albums: Album[], first) => {
            if(!albums.some(second => second.name === first.name)) albums.push(first)
            return albums;
        },[]);
    }
}
