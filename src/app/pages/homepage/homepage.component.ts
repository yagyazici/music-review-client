import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';

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
    ) {}
    
    ngOnInit() {
        this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser)
    }
}
