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
    following: number;
    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private signalRService: SignalRService,
        public dialog: MatDialog,
    ) {}

    async ngOnInit(){
        this.activatedRoute.paramMap.subscribe(params => {
            this.userId = params.get("user-id") || "";
        });
        await this.getUser(this.userId);
        this.checkUserFollowed(this.userId);
        this.signalRService.on(HubUrls.UserHub, ReceiveFunctions.UserFollowedUserMessage, message => {
            if (message.followedUserId == this.userId || message.currentUserId == this.userId){
                this.getUserFollingers(this.userId);
            }
        });
        this.getUserFollingers(this.userId);
        this.currentUrl = this.router.url;
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    }

    async getUser(userId: string){
        await firstValueFrom(this.authService.GetUser(userId)).then((data) => {
            var parsed = JSON.parse(data);
            this.userInfo = <UserDTO>parsed;
        });
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7161/${serverPath}`; 
    }

    followButton(followUser: UserDTO){
        this.followed = !this.followed;
        this.authService.followUser(followUser).subscribe({
            next: (data: any) => {},
            error: error => {
                console.log(error);
            }
        })
    }

    async checkUserFollowed(userId: string){
        await firstValueFrom(this.authService.checkUserFollowed(userId)).then((data) => {
            this.followed = data === "true";
        })
    }

    getUserFollingers(userId: string){
        this.authService.getUserFollingers(userId).subscribe({
            next: (data: any) => {
                var parsed = JSON.parse(data);
                this.followers = parsed.userFollowers;
                this.following = parsed.userFollowings;
            },
            error: error => {
                console.log(error);
            }
        })
    }

    followingDialog(): void {
        const dialogRef = this.dialog.open(FollowingComponent, {
            data: { userId: this.userId },
            autoFocus: false,
            width: "500px",
            maxHeight: "750px"
        });
    }

    followersDialog(): void {
        const dialogRef = this.dialog.open(FollowersComponent, {
            data: { userId: this.userId },
            autoFocus: false,
            width: "500px",
            maxHeight: "750px"
        });
    }
}
