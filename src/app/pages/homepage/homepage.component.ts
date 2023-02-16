import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/dataservice.service';
import { GenericSignalrService } from 'src/app/services/generic.signalr.service';
import { MusicHubService } from 'src/app/services/music.hub.service';
import { UserHubService } from 'src/app/services/user.hub.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    isAuthenticated: boolean;
    currentUser: UserDTO;
    constructor(
        private data: DataService, 
        private authService: AuthService
    ) {}
    
    ngOnInit() {
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser)
        this.authService.refreshToken();
    }
}
