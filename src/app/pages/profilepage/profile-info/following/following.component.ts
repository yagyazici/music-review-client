import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData {
    userId: string;
}

@Component({
    selector: 'app-following',
    templateUrl: './following.component.html',
    styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

    followings: UserDTO[];
    constructor(
        public dialogRef: MatDialogRef<FollowingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private authService: AuthService
    ) { }

    async ngOnInit() {
        await this.getUserFollowings();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`; 
    }

    async getUserFollowings(){
        await firstValueFrom(this.authService.getUserFollowings(this.data.userId)).then(data => {
            this.followings = data;
        })
    }
    
    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg"; 
    }
}
