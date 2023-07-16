import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { NotificationComponent } from '../../common/notification/notification.component';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { MusicHubService } from 'src/app/services/SignalR/music.hub.service';
import { UserHubService } from 'src/app/services/SignalR/user.hub.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

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
    ],
    
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
        private userHub: UserHubService,
        private spotifyService: SpotifyService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    async ngOnInit() {
        this.data.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
        if (this.isAuthenticated) {
            this.getUserNotificationsCount();
            this.authService.refreshToken();
            await this.spotifyService.updateRefreshToken();
            this.musicHub.start();
            this.userHub.start();
            this.userHub.on(ReceiveFunctions.UserSendNotificitionMessage, message => {
                if (message == this.currentUser.Id) {
                    this.getUserNotificationsCount();
                }
            })
        }
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    }

    getUserNotificationsCount() {
        this.authService.getUserNotificationsCount().subscribe({
            next: (next: number) => this.notificationsCount = next,
            error: error => { }
        })
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

    logout = () => this.authService.logout();

    onClose = () => this.state = "default";

    onOpen = () => this.state = "rotated";
}
