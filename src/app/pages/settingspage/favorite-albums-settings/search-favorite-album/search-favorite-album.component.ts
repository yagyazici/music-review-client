import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Album } from 'src/app/models/Music/album';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

export interface DialogData {
    albumName: string;
    idx: number;
    favoriteAlbum: Album;
}

@Component({
    selector: 'app-search-favorite-album',
    templateUrl: './search-favorite-album.component.html',
    styleUrls: ['./search-favorite-album.component.css']
})
export class SearchFavoriteAlbumComponent implements OnInit {

    reactiveForm: FormGroup;
    albums: ArtistAlbumsItem[];
    albumsError: any;

    constructor(
        public dialogRef: MatDialogRef<SearchFavoriteAlbumComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private spotifyService: SpotifyService,
    ) { }

    async ngOnInit() {
        this.reactiveForm = new FormGroup({
            query: new FormControl("")
        });
        
        this.reactiveForm.get("query")?.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(query => {
            if (query) {
                this.albumSearchUpdate(query);
            }
            else{
                this.albums = [];
                this.albumsError = "";
            }
        });
    }

    albumSearchUpdate(query: string){
        this.spotifyService.searchAlbum(query).subscribe(data => {
            this.albums = this.reduceAlbums(data);
        });
    }

    getAlbumId(album: ArtistAlbumsItem): ArtistAlbumsItem{
        return album;
    }

    removeAlbum(): ArtistAlbumsItem{
        return new ArtistAlbumsItem();
    }

    reduceAlbums(arr : ArtistAlbumsItem[]): ArtistAlbumsItem[] {
        return arr.reduce((albums: ArtistAlbumsItem[], first) => {
            if(!albums.some(second => second.name === first.name)) albums.push(first)
            return albums;
        },[]);
    }
}
