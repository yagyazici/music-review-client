import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';


@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    constructor(private http: HttpClient) { }

    //#region PostRequests
    public postReview(review: Review): Observable<any> {
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        return this.http.post(
            "https://localhost:7161/MusicRates/post-rate",
            review,
            {
                headers: headers,
                responseType: "text"
            }
        );
    }
    
    public likeReview(rateId: string){
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("rateId", rateId)
        return this.http.post(
            "https://localhost:7161/MusicRates/like-rate",
            null,
            {
                headers: headers,
                params: params,
                responseType: "text"
            }
        );
    }
    //#endregion
    
    //#region GetRequests
    public getAlbumReviews(albumId: string): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId)
        return this.http.get(
            "https://localhost:7161/MusicRates/get-album-rates",
            {
                headers: headers,
                params: params,
                responseType: "text"
            }
        );
    }

    public getUserAlbumReviews(userId: string): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        
        const params = new HttpParams().set("userId", userId)
        return this.http.get(
            "https://localhost:7161/MusicRates/get-user-rates",
            {
                headers: headers,
                params: params,
                responseType: "text"
            }
        );
    }

    public getAlbumReview(id: string): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("id", id)
        return this.http.get(
            "https://localhost:7161/MusicRates/get-album-rate",
            {
                headers: headers,
                params: params,
                responseType: "text"
            }
        );
    }

    public albumReviewCheck(albumId: string): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get(
            "https://localhost:7161/MusicRates/album-rate-check",
            {
                headers: headers,
                params: params,
                responseType: "text"
            }
        );
    }
    
    public getAlbumLikedCount(albumId: string): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get(
            "https://localhost:7161/MusicRates/album-like-count",
            {
                headers: headers,
                params: params,
                responseType: "text"
            }
        );
    }

    public getUserFeed(): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        return this.http.get(
            "https://localhost:7161/MusicRates/get-user-feed",
            {
                headers: headers,
                responseType: "text"
            }
        );
    }
    //#endregion

    //#region PutRequests
    public UpdateAlbumReview(id: string, newRate: string, newThoughts: string): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams()
        .set("id", id)
        .set("newRate", newRate)
        .set("newThoughts", newThoughts);
        return this.http.put("https://localhost:7161/MusicRates/update-music-rate", null, {
                headers: headers,
                params: params,
                responseType: "text"
            }
        );
    }
    //#endregion

    //#region DeleteRequests
    public DeleteAlbumReview(id: string): Observable<any>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("id", id);
        return this.http.delete("https://localhost:7161/MusicRates/delete-music-rate", {
            headers: headers,
            params: params,
            responseType: "text"
        })
    }
    //#endregion
}
