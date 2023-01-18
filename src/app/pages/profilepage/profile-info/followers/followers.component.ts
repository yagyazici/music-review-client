import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData {
    userId: string;
}

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

    followers: UserDTO[];
    constructor(
        public dialogRef: MatDialogRef<FollowersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private authService: AuthService
    ) { }

    async ngOnInit() {
        await this.getUserFollowers(this.data.userId);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7161/${serverPath}`; 
    }

    async getUserFollowers(userId: string){
        await firstValueFrom(this.authService.getUserFollowers(userId)).then(data => {
            var parsed = <UserDTO[]>JSON.parse(data);
            this.followers = parsed;
        })
    }
}
