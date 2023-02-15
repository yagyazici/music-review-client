import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';
import { SignalRService } from 'src/app/services/signalr.service';
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
        private signalRService: SignalRService,
        public dialog: MatDialog,
    ) { }

    async ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.userId = params.get("user-id") || "";
        });
        await this.getUser(this.userId);
        this.checkUserFollowed(this.userId);
        this.signalRService.on(HubUrls.UserHub, ReceiveFunctions.UserFollowedUserMessage, message => {
            if (message.followedUserId == this.userId || message.currentUserId == this.userId) {
                this.getUserFollingers(this.userId);
            }
        });
        this.getImageFromService();
        this.getUserFollingers(this.userId);
        this.currentUrl = this.router.url;
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    }

    async getUser(userId: string) {
        await firstValueFrom(this.authService.GetUser(userId)).then(data => {
            this.userInfo = data;
        });
    }

    getImageFromService() {
        this.authService.getImage().subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }


    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }

    followButton(followUser: UserDTO) {
        this.followed = !this.followed;
        this.authService.followUser(followUser).subscribe();
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
}
