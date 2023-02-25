import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
    selector: 'app-artist-singles',
    templateUrl: './artist-singles.component.html',
    styleUrls: ['./artist-singles.component.css']
})
export class ArtistSinglesComponent implements OnInit {

    artistId: string;
    albums: ArtistAlbumsItem[];
    panelOpenState = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private spotifyService: SpotifyService,
    ) { }

    async ngOnInit() {
        this.activatedRoute.parent?.paramMap.subscribe(params => {
            this.artistId = params.get("artist-id") || "";
        });
        this.getArtistAlbums(this.artistId, "single");
    }

    getArtistAlbums(artistId: string, type: string) {
        this.spotifyService.getArtistAlbums(artistId, type).subscribe(data => {
            this.albums = data;
            this.albums.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
            this.albums = this.reduceAlbums(this.albums);
        })
    }

    reduceAlbums(arr : ArtistAlbumsItem[]): ArtistAlbumsItem[] {
        return arr.reduce((albums: ArtistAlbumsItem[], first) => {
            if(!albums.some(second => second.name === first.name)) albums.push(first)
            return albums;
        },[]);
    }
}
