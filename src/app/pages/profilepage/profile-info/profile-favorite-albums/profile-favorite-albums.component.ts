import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Album } from 'src/app/models/Music/album';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

@Component({
    selector: 'app-profile-favorite-albums',
    templateUrl: './profile-favorite-albums.component.html',
    styleUrls: ['./profile-favorite-albums.component.css']
})
export class ProfileFavoriteAlbumsComponent implements OnInit {

    @Input() userId: string;
    @Input() userInfo: UserDTO;
    @Input() currentUser: UserDTO;
    userFavoriteAlbums: Album[];
    
    constructor(
        private authService: AuthService
    ) { }

    async ngOnInit() {
        this.getUserFavoriteAlbums(this.userId);
    }

    getUserFavoriteAlbums(userId: string){
        this.authService.getUserFavoriteAlbums(userId).subscribe(data => {
            this.userFavoriteAlbums = data;
        })
    }

    favoriteBtnText(album: Album[]): string {
        return album.length > 0 ? "Edit" : "Add your favorite albums";
    }
}
