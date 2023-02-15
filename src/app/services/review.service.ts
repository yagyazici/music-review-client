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
	headers: HttpHeaders;
    constructor(private http: HttpClient) { 
        var token = localStorage.getItem("authToken");
		this.headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
    }

    //#region PostRequests
    public postReview(review: Review): Observable<CustomResponse> {
        return this.http.post<CustomResponse>(`${this.baseUrl}Post`, review,{headers: this.headers});
    }
    
    public likeReview(reviewId: string): Observable<CustomResponse>{
        const params = new HttpParams().set("reviewId", reviewId)
        return this.http.post<CustomResponse>(`${this.baseUrl}ToggleLikedReview`, null, {headers: this.headers, params: params});
    }
    //#endregion
    
    //#region GetRequests
    public getAlbumReviews(albumId: string): Observable<Review[]>{
        const params = new HttpParams().set("albumId", albumId)
        return this.http.get<Review[]>(`${this.baseUrl}GetAlbumReviews`,{headers: this.headers, params: params});
    }

    public getUserAlbumReviews(userId: string): Observable<Review[]>{
        const params = new HttpParams().set("userId", userId)
        return this.http.get<Review[]>(`${this.baseUrl}GetUserAlbumReviews`,{headers: this.headers, params: params});
    }

    public getAlbumReview(id: string): Observable<Review>{
        const params = new HttpParams().set("id", id)
        return this.http.get<Review>(`${this.baseUrl}Get`,{headers: this.headers, params: params});
    }

    public albumReviewCheck(albumId: string): Observable<boolean>{
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<boolean>(`${this.baseUrl}AlbumReviewCheck`,{headers: this.headers, params: params});
    }
    
    public getAlbumLikedCount(albumId: string): Observable<number>{
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<number>(`${this.baseUrl}GetAlbumLikedCount`,{headers: this.headers, params: params});
    }

    public getUserFeed(): Observable<Review[]>{
        return this.http.get<Review[]>(`${this.baseUrl}GetUserFeed`,{headers: this.headers});
    }
    //#endregion

    //#region PutRequests
    public UpdateAlbumReview(id: string, newRate: string, newThoughts: string): Observable<CustomResponse>{
        const params = new HttpParams().set("id", id).set("newRate", newRate).set("newThoughts", newThoughts);
        return this.http.put<CustomResponse>(`${this.baseUrl}Put`, null, {headers: this.headers, params: params});
    }
    //#endregion

    //#region DeleteRequests
    public DeleteAlbumReview(id: string): Observable<CustomResponse>{
        const params = new HttpParams().set("id", id);
        return this.http.delete<CustomResponse>(`${this.baseUrl}Delete`, {headers: this.headers, params: params});
    }
    //#endregion
}
