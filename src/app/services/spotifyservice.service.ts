import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { SpotifyrefreshService } from './spotifyrefresh.service';

@Injectable({
    providedIn: 'root'
})
export class SpotifyserviceService {

    tokenSubject = new BehaviorSubject<string>("");
    headers: HttpHeaders;
    constructor(
        private http: HttpClient, 
        private refresh_service: SpotifyrefreshService
    ) {}

    async getToken(){
        await firstValueFrom(this.refresh_service.refresh()).then((data) => {
            var access_token = JSON.parse(data);
            this.tokenSubject.next(access_token.access_token)
        });
        var token = this.tokenSubject.value;
        this.headers = new HttpHeaders({
            "Authorization": `Bearer ${token}`
        });
    }
    
    currentSong(): Observable<any>{
        const params = new HttpParams().set("market", "gb")
        return this.http.get(
            "https://api.spotify.com/v1/me/player/currently-playing", 
            {
                headers: this.headers,
                params: params,
                responseType: "text"
            }
        ); 
    }

    searchAlbum(query: string): Observable<any>{
        const params = new HttpParams().set("q", query).set("type", "album").set("market", "gb")
        return this.http.get(
            "https://api.spotify.com/v1/search",
            {
                headers: this.headers,
                params: params,
                responseType: "text"
            }
        );
    }

    getAlbum(albumId: string){
        const params = new HttpParams().set("market", "gb")
        return this.http.get(
            `https://api.spotify.com/v1/albums/${albumId}`, 
            {
                headers: this.headers,
                params: params, 
                responseType: "text"
            }
        );
    }

    getArtist(artistId: string){
        const params = new HttpParams().set("market", "gb")
        return this.http.get(
            `https://api.spotify.com/v1/artists/${artistId}`, 
            {
                headers: this.headers,
                params: params, 
                responseType: "text"
            }
        );
    }

    getArtistAlbums(artistId: string, type: string){
        const params = new HttpParams().set("market", "gb").set("include_groups", type)
        // "album,single"
        return this.http.get(
            `https://api.spotify.com/v1/artists/${artistId}/albums`,
            {
                headers: this.headers,
                params: params,
                responseType: "text"
            }
        )
    }
}
