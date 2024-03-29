import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/Auth/notification';
import { CommonService } from 'src/app/services/CommonServices/common.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

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
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.getNotifications();
    }

    getNotifications() {
        this.authService.getUserNotifications().subscribe(data => {
            this.notifications = data.reverse();
        })
    }

    navigateProfile(userId: string) {
        const currentUrl = this.router.url;
        this.router.navigateByUrl(`/profile/${userId}`, { skipLocationChange: true }).then(_ => {
            this.closeDialog();
        });
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

    closeDialog = () => this.dialogRef.close();

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);
}
