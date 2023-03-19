import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { IUserData } from 'src/app/interfaces/IUserData';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

    followers: UserDTO[];
    constructor(
        public dialogRef: MatDialogRef<FollowersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IUserData,
        private authService: AuthService
    ) { }

    async ngOnInit() {
        await this.getUserFollowers(this.data.userId);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`; 
    }

    async getUserFollowers(userId: string){
        await firstValueFrom(this.authService.getUserFollowers(userId)).then(data => {
            this.followers = data;
        })
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg"; 
    }
}
