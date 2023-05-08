import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { FollowersComponent } from '../../../common/followers/followers.component';
import { CommonService } from 'src/app/services/CommonServices/common.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

    userId: string;
    userInfo: UserDTO;
    currentUser: UserDTO;
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
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.activatedRoute.params.subscribe(params => {
            this.userId = params["user-id"];
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

    followersDialog(type: string) {
        const dialogRef = this.dialog.open(FollowersComponent, {
            autoFocus: false,
            panelClass: "follow-panel"
        });
        let instance = dialogRef.componentInstance;
        instance.type = type;
        instance.userId = this.userId;
    }

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);

    followedText(followed: boolean): string {
        return !followed ? "Follow" : "Unfollow";
    }

    followedButtonClass(followed: boolean): string {
        return !followed ? "btn btn-dark btn-sm" : "btn btn-secondary btn-sm"
    }
}
