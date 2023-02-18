import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpotifyrefreshService {
    
    constructor(private http: HttpClient) { }
    refresh_token = "AQDNqJAShOmvB07sVS3yTM6qQXEgEdL47OxoATXJYqJRgycJ-b6ouZAYKwJkOO1_WIaETXTHps3btWaBjGRWN07-nwJvp7dM8h_CO5-SkC-DctGYGZ5UfIJhK4-zA9VVB9I";
    base_64 = "MjFkM2JhN2Q2NzZjNDEzNWJmNjVlYTM2MjAyMjRhNDY6MTdiZDY1OWFmOWE2NGNiYmIzZTM3ZGNjZTljYmFmNGU=";

    refresh(): Observable<any>{
        const query = "https://accounts.spotify.com/api/token";
        const body = `grant_type=refresh_token&refresh_token=${this.refresh_token}`

        const headers = new HttpHeaders({
            "Authorization": `Basic ${this.base_64}`,
            "Content-Type": "application/x-www-form-urlencoded"
        });
        
        return this.http.post(query, body, {headers: headers, responseType: "text"});
    }
}
