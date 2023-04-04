import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Album } from 'src/app/models/Music/album';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';
import { CommonService } from 'src/app/services/CommonServices/common.service';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
    selector: 'app-search-favorite-album',
    templateUrl: './search-favorite-album.component.html',
    styleUrls: ['./search-favorite-album.component.css']
})
export class SearchFavoriteAlbumComponent implements OnInit {

    reactiveForm: FormGroup;
    albums: ArtistAlbumsItem[];
    @Input() albumName: string;
    @Input() idx: number;
    @Input() favoriteAlbum: Album;

    constructor(
        public dialogRef: MatDialogRef<SearchFavoriteAlbumComponent>,
        private spotifyService: SpotifyService,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        this.reactiveForm = new FormGroup({
            query: new FormControl("")
        });
        
        this.reactiveForm.get("query")?.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(query => {
            if (query) this.albumSearchUpdate(query)
            else this.albums = []
        });
    }

    albumSearchUpdate(query: string){
        this.spotifyService.searchAlbum(query).subscribe(data => {
            this.albums = this.commonService.reduceAlbums(data);
        });
    }

    removeAlbum = (): ArtistAlbumsItem => new ArtistAlbumsItem();
}
