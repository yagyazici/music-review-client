import { Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export abstract class GenericSignalrService {

    constructor(
        protected hubUrl: string,
        protected name: string
    ) { }

    private _connection: HubConnection;
    get connection(): HubConnection {
        return this._connection;
    }

    start() {
        if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
            const builder: HubConnectionBuilder = new HubConnectionBuilder();

            const hubConnection: HubConnection = builder.withUrl(this.hubUrl)
                .withAutomaticReconnect()
                .configureLogging(LogLevel.None)
                .build();

            hubConnection.start()
                .then(() => console.log(`Connected to ${this.name}`))
                .catch(error => setTimeout(() => this.start(), 2000));

            this._connection = hubConnection;
        }

        this._connection.onreconnected(connectionId => console.log("Reconnected"));
        this._connection.onreconnecting(error => console.log("Reconnecting"));
        this._connection.onclose(error => console.log("Close connection"));
    }

    invoke(procedureName: string, message: any, successCallBack?: (value: any) => void, errorCallBack?: (error: any) => void) {
        this.connection.invoke(procedureName, message)
            .then(successCallBack)
            .catch(errorCallBack);
    }

    on(procedureName: string, callBack: (...message: any) => void) {
        this.connection.on(procedureName, callBack);
    }

    off() {
        this._connection.stop()
    }
}