import { Injectable } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls';
import { GenericSignalrService } from './generic.signalr.service';

@Injectable({
    providedIn: 'root'
})
export class UserHubService extends GenericSignalrService {

    constructor() {
        super(HubUrls.UserHub, "UserHub")
    }
}
