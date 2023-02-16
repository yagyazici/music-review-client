import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { NotificationComponent } from '../notification/notification.component';
import { MusicHubService } from 'src/app/services/music.hub.service';
import { UserHubService } from 'src/app/services/user.hub.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [
        trigger('rotatedState', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(-180deg)' })),
            transition('rotated => default', animate('200ms ease-out')),
            transition('default => rotated', animate('200ms ease-in'))
        ])
    ]
})
export class HeaderComponent implements OnInit {

    isAuthenticated: boolean;
    currentUser: UserDTO;
    userInfo: UserDTO;
    state: string = 'default';
    notificationsCount: number;

    constructor(
        private router: Router,
        private data: DataService,
        private authService: AuthService,
        public dialog: MatDialog,
        private musicHub: MusicHubService,
        private userHub: UserHubService
    ) {

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    async ngOnInit() {
        this.data.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
        if (this.isAuthenticated) {
            this.getUserNotificationsCount();
            this.musicHub.start();
            console.log("music açıldı");
            this.userHub.start();
            console.log("user açıldı");
            this.userHub.on(ReceiveFunctions.UserSendNotificitionMessage, message => {
                if (message == this.currentUser.Id){
                    this.getUserNotificationsCount();
                }
            })
        }
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    }

    logout() {
        this.authService.logout();
    }

    onClose() {
        this.state = "default";
    }

    onOpen() {
        this.state = "rotated";
    }

    getUserNotificationsCount() {
        this.authService.getUserNotificationsCount().subscribe({
            next: (next: any) => {
                this.notificationsCount = next;
            },
            error: error => {
                console.log(error);
            }
        })
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }

    notificationDialog() {
        var dialog = this.dialog.open(NotificationComponent, {
            autoFocus: false,
            panelClass: "notification-panel"
        });
        dialog.afterClosed().subscribe(_ => {
            this.notificationsCount = 0;
        })
    }
}
