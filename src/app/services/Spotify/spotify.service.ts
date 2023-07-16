import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Album } from 'src/app/models/Music/album';
import { Artist } from 'src/app/models/Music/artist';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';
import { SpotifyCurrentSong } from 'src/app/models/Spotify/CurrentSong/SpotifyCurrentSong';
import { RefreshToken } from 'src/app/models/Spotify/RefreshToken/RefreshToken';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    baseUrl = "https://localhost:7172/Spotify/";
    constructor(private http: HttpClient) { }

    currentSong = (): Observable<SpotifyCurrentSong> => this.http.get<SpotifyCurrentSong>(`${this.baseUrl}CurrentSong`);

    searchAlbum(query: string): Observable<ArtistAlbumsItem[]> {
        const params = new HttpParams().set("query", query);
        return this.http.get<ArtistAlbumsItem[]>(`${this.baseUrl}SearchAlbum`, { params: params });
    }

    getNewReleases = (): Observable<ArtistAlbumsItem[]> => this.http.get<ArtistAlbumsItem[]>(`${this.baseUrl}GetNewReleases`)

    getAlbum(albumId: string): Observable<Album> {
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<Album>(`${this.baseUrl}GetAlbum`, { params: params })
    }

    getArtist(artistId: string): Observable<Artist> {
        const params = new HttpParams().set("artistId", artistId);
        return this.http.get<Artist>(`${this.baseUrl}GetArtist`, { params: params })
    }

    getArtistAlbums(artistId: string, type: string): Observable<ArtistAlbumsItem[]> {
        const params = new HttpParams().set("artistId", artistId).set("type", type);
        return this.http.get<ArtistAlbumsItem[]>(`${this.baseUrl}GetArtistAlbums`, { params: params })
    }

    async updateRefreshToken() {
        var now = new Date();
        var expiresIn = localStorage.getItem("expiresIn")
        var expirationDate = new Date(expiresIn || "");
        if (now > expirationDate) {
            await firstValueFrom(this.refreshToken()).then(data => {
                var accessToken = data.access_token
                var expiresIn = data.expires_in
                now.setSeconds(now.getSeconds() + expiresIn);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("expiresIn", now.toString());
            });
            return;
        }
        return;
    }

    async createRefreshToken() {
        var now = new Date();
        await firstValueFrom(this.refreshToken()).then(data => {
            var accessToken = data.access_token
            var expiresIn = data.expires_in
            now.setSeconds(now.getSeconds() + expiresIn);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresIn", now.toString());
        });
    }

    deneme() {
        
    }

    refreshToken = (): Observable<RefreshToken> => this.http.get<RefreshToken>(`${this.baseUrl}RefreshToken`);
}
