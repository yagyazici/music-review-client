import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/Music/album';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

@Component({
    selector: 'app-profile-likes',
    templateUrl: './profile-likes.component.html',
    styleUrls: ['./profile-likes.component.css']
})
export class ProfileLikesComponent implements OnInit {

    userId: string;
    userLikedAlbums: Album[];
    
    constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.parent?.paramMap.subscribe(params => {
            this.userId = params.get("user-id") || "";
        });
        this.getUserLikedAlbums(this.userId);
    }

    getUserLikedAlbums(userId: string){
        this.authService.getUserLikedAlbums(userId).subscribe(data => {
            this.userLikedAlbums = data.reverse();
        })
    }
}
