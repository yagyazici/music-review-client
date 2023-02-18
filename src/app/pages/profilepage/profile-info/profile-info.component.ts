import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

    userId: string;
    message: string;
    progress: number;
    userInfo: UserDTO;
    currentUser: UserDTO;
    profilePicture: string;
    currentUrl: string;
    followed: boolean = false;
    followers: number;
    followings: number;
    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
    ) { }

    async ngOnInit() {
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.activatedRoute.paramMap.subscribe(params => {
            this.userId = params.get("user-id") || "";
        });
        await this.getUser(this.userId);
        if (this.currentUser.Id != this.userId) {
            this.checkUserFollowed(this.userId);
        }
        this.getUserFollingers(this.userId);
        this.currentUrl = this.router.url;
    }

    async getUser(userId: string) {
        await firstValueFrom(this.authService.GetUser(userId)).then(data => {
            this.userInfo = data;
        });
    }


    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }

    followButton(followUser: UserDTO) {
        this.followed = !this.followed;
        this.authService.followUser(followUser).subscribe(data => {
            data.responseText === "followed" ? this.followers += 1 : this.followers -= 1;
        });
    }

    async checkUserFollowed(userId: string) {
        await firstValueFrom(this.authService.checkUserFollowed(userId)).then((data) => {
            this.followed = data;
        })
    }

    getUserFollingers(userId: string) {
        this.authService.getUserFollingers(userId).subscribe(data => {
            this.followers = data.followers;
            this.followings = data.followings
        })
    }

    followingDialog(): void {
        const dialogRef = this.dialog.open(FollowingComponent, {
            data: { userId: this.userId },
            autoFocus: false,
            panelClass: "follow-panel"
        });
    }

    followersDialog(): void {
        const dialogRef = this.dialog.open(FollowersComponent, {
            data: { userId: this.userId },
            autoFocus: false,
            panelClass: "follow-panel"
        });
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg";
    }

    followedText(followed: boolean): string {
        return !followed ? "Follow" : "Unfollow";
    }

    followedButtonClass(followed: boolean): string {
        return !followed ? "btn btn-dark btn-sm" : "btn btn-secondary btn-sm"
    }
}
