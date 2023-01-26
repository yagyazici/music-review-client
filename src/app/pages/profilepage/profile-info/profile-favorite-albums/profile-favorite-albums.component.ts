import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-profile-favorite-albums',
    templateUrl: './profile-favorite-albums.component.html',
    styleUrls: ['./profile-favorite-albums.component.css']
})
export class ProfileFavoriteAlbumsComponent implements OnInit {

    @Input() userId: string;
    userFavoriteAlbums: Album[];
    @Input() userInfo: UserDTO;
    @Input() currentUser: UserDTO;
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
}
