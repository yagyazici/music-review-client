import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { CommonService } from 'src/app/services/CommonServices/common.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

    @Input() type: string;
    @Input() userId: string;
    followers: UserDTO[];

    constructor(
        public dialogRef: MatDialogRef<FollowersComponent>,
        private authService: AuthService,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        await this.getUserFollowers(this.userId);
    }

    closeDialog = () => this.dialogRef.close();

    async getUserFollowers(userId: string) {
        if (this.type === "followers") {
            await firstValueFrom(this.authService.getUserFollowers(userId)).then(data => {
                this.followers = data;
            })
            return;
        }
        await firstValueFrom(this.authService.getUserFollowings(userId)).then(data => {
            this.followers = data;
        })
    }

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);
}
