import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {

    constructor() { }

    start(hubUrl: string) {

        const builder: HubConnectionBuilder = new HubConnectionBuilder();

        const hubConnection: HubConnection = builder.withUrl(hubUrl, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
            }).withAutomaticReconnect().build();

        hubConnection.start()
            .then(() => console.log("Connected"))
            .catch(error => setTimeout(() => this.start(hubUrl), 2000));

        hubConnection.onreconnected(connectionId => console.log("Reconnected"));
        hubConnection.onreconnecting(error => console.log("Reconnecting"));
        hubConnection.onclose(error => console.log("Close reconnection"));
        return hubConnection;
    }

    invoke(
        hubUrl: string, 
        procedureName: string, message: any, 
        successCallBack?: (value: any) => void, 
        errorCallBack?: (error:any) => void)
        {
        this.start(hubUrl).invoke(procedureName, message)
            .then(successCallBack)
            .catch(errorCallBack);
    }

    on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) {
        this.start(hubUrl).on(procedureName, callBack);
    }
}
