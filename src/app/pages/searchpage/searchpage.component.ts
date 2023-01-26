import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Album } from 'src/app/models/album';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';
import { SpotifyserviceService } from 'src/app/services/spotifyservice.service';

@Component({
    selector: 'app-searchpage',
    templateUrl: './searchpage.component.html',
    styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

    reactiveForm: FormGroup;
    query: string
    albums: Album[];
    users: UserDTO [];
    albumsError: any;
    usersError: any;
    constructor(
        private spotify: SpotifyserviceService,
        private authService: AuthService
    ) { }

    async ngOnInit(){
        this.authService.refreshToken()
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
                this.userSearchUpdate(query);
            }
            else{
                this.albums = [];
                this.users = [];
                this.albumsError = "";
                this.usersError = "";
            }
        })
    }

    albumSearchUpdate(query: string){
        this.spotify.searchAlbum(query).subscribe({
            next: (data: any) => {
                var items = <Album[]>JSON.parse(data).albums.items
                this.albums = items;
            },
            error: (error: any) => {
                this.albumsError = error;
            }
        });
    }

    userSearchUpdate(query: string){
        this.authService.SearchUser(query).subscribe(data => {
            this.users = data;
        })
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`; 
    }
}
