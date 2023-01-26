import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from '../models/custom-response';
import { Review } from '../models/review';


@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    baseUrl = "https://localhost:7172/MusicReview/";
    constructor(private http: HttpClient) { }

    //#region PostRequests
    public postReview(review: Review): Observable<CustomResponse> {
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        return this.http.post<CustomResponse>(`${this.baseUrl}Post`, review,{headers: headers});
    }
    
    public likeReview(rateId: string){
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("rateId", rateId)
        return this.http.post("{this.baseUrl}like-rate", null, {headers: headers, params: params});
    }
    //#endregion
    
    //#region GetRequests
    public getAlbumReviews(albumId: string): Observable<Review[]>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId)
        return this.http.get<Review[]>(`${this.baseUrl}GetAlbumReviews`,{headers: headers, params: params});
    }

    public getUserAlbumReviews(userId: string): Observable<Review[]>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("userId", userId)
        return this.http.get<Review[]>(`${this.baseUrl}GetUserAlbumReviews`,{headers: headers, params: params});
    }

    public getAlbumReview(id: string): Observable<Review>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("id", id)
        return this.http.get<Review>(`${this.baseUrl}Get`,{headers: headers, params: params,});
    }

    public albumReviewCheck(albumId: string): Observable<boolean>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<boolean>(`${this.baseUrl}AlbumReviewCheck`,{headers: headers,params: params});
    }
    
    public getAlbumLikedCount(albumId: string): Observable<number>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<number>(`${this.baseUrl}GetAlbumLikedCount`,{headers: headers, params: params});
    }

    public getUserFeed(): Observable<Review[]>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        return this.http.get<Review[]>(`${this.baseUrl}GetUserFeed`,{headers: headers});
    }
    //#endregion

    //#region PutRequests
    public UpdateAlbumReview(id: string, newRate: string, newThoughts: string): Observable<CustomResponse>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams()
        .set("id", id)
        .set("newRate", newRate)
        .set("newThoughts", newThoughts);
        return this.http.put<CustomResponse>(`${this.baseUrl}Put`, null, {headers: headers, params: params});
    }
    //#endregion

    //#region DeleteRequests
    public DeleteAlbumReview(id: string): Observable<CustomResponse>{
        var token = localStorage.getItem("authToken")
        const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("id", id);
        return this.http.delete<CustomResponse>(`${this.baseUrl}Delete`, {headers: headers, params: params});
    }
    //#endregion
}
