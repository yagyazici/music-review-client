import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/Auth/notification';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

export interface DialogData {
    reviewId: string;
}

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

    notifications: Notification[];

    constructor(
        public dialogRef: MatDialogRef<NotificationComponent>,
        public authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getNotifications();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getNotifications() {
        this.authService.getUserNotifications().subscribe(data => {
            this.notifications = data.reverse();
        })
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }

    navigateProfile(userId: string) {
        const currentUrl = this.router.url;
        this.router.navigateByUrl(`/profile/${userId}`, { skipLocationChange: true }).then(_ => {
            this.dialogRef.close();
        });
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg"; 
    }

    deleteAllNotifications() {
        this.authService.deleteAllNotifications().subscribe(data => {
            this.notifications = [];
        })
    }

    deleteNotification(notification: Notification) {
        this.authService.deleteNotification(notification).subscribe(data => {
            this.notifications = data.response;
        })
    }
}
