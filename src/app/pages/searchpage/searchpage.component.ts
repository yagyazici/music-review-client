import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';
import { CommonService } from 'src/app/services/CommonServices/common.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
    selector: 'app-searchpage',
    templateUrl: './searchpage.component.html',
    styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

    reactiveForm: FormGroup;
    query: string
    albums: ArtistAlbumsItem[];
    users: UserDTO[];
    albumsError: any;
    usersError: string;
    loading = true

    constructor(
        private spotifyService: SpotifyService,
        private authService: AuthService,
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
            if (query) {
                this.albumSearchUpdate(query);
                this.userSearchUpdate(query);
            }
            else {
                this.albums = [];
                this.users = [];
                this.albumsError = "";
                this.usersError = "";
            }
        })
    }

    albumSearchUpdate(query: string) {
        this.spotifyService.searchAlbum(query).subscribe(data => {
            this.albums = this.commonService.reduceAlbums(data);
        })
    }

    userSearchUpdate(query: string) {
        this.authService.SearchUser(query).subscribe(data => {
            this.users = data;
        })
    }

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);

    loader = () => this.loading = false;
}
