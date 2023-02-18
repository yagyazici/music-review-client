import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Album } from 'src/app/models/Music/album';
import { SpotifyserviceService } from 'src/app/services/Spotify/spotifyservice.service';

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
    albums: Album[];
    albumsError: any;

    constructor(
        public dialogRef: MatDialogRef<SearchFavoriteAlbumComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private spotify: SpotifyserviceService,
    ) { }

    async ngOnInit() {
        this.reactiveForm = new FormGroup({
            query: new FormControl("")
        });
        await this.spotify.getToken()
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
        this.spotify.searchAlbum(query).subscribe({
            next: (data: any) => {
                var items = <Album[]>JSON.parse(data).albums.items
                this.albums = this.reduceAlbums(items);
            },
            error: (error: any) => {
                this.albumsError = error;
            }
        });
    }

    getAlbumId(album: Album): Album{
        return album;
    }

    removeAlbum(): Album{
        return new Album();
    }

    reduceAlbums(arr : Album[]): Album[] {
        return arr.reduce((albums: Album[], first) => {
            if(!albums.some(second => second.name === first.name)) albums.push(first)
            return albums;
        },[]);
    }
}
