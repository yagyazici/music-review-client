import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { UserDTO } from 'src/app/models/userDTO';
import { Notification } from 'src/app/models/notification';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';
import { SignalRService } from 'src/app/services/signalr.service';

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
    notifications: Notification [];
    notificationsCount: number;

    constructor(
        private router: Router, 
        private data: DataService,
        private signalRService: SignalRService,
        private authService: AuthService
    ) { 
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    
    async ngOnInit() {
        this.data.currentIsAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
        if (this.isAuthenticated){
            this.getUserNotificationsCount();
        }
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        this.signalRService.on(HubUrls.UserHub, ReceiveFunctions.UserSendNotificitionMessage, message => {
            if (message == this.currentUser.Id){
                this.getUserNotificationsCount();
            }
        });
    }

    logout(){
        this.authService.logout();
    }

    onClose(){
        this.state = "default";
    }

    onOpen(){
        this.state = "rotated";
    }

    notifMenuOpened(){
        this.getUserNotifications();
        this.notificationsCount = 0;
    }

    getUserNotifications(){
        this.authService.getUserNotifications().subscribe(data => {
            this.notifications = data.reverse();
        })
    }

    getUserNotificationsCount(){
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
}
