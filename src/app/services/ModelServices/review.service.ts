import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/Music/review';
import { CustomResponse } from 'src/app/models/Responses/custom-response';


@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    baseUrl = "https://localhost:7172/MusicReview/";
    constructor(private http: HttpClient) { }

    //#region PostRequests
    public postReview(review: Review): Observable<CustomResponse<string>> {
        return this.http.post<CustomResponse<string>>(`${this.baseUrl}Post`, review);
    }
    
    public likeReview(reviewId: string): Observable<CustomResponse<string>>{
        const params = new HttpParams().set("reviewId", reviewId)
        return this.http.post<CustomResponse<string>>(`${this.baseUrl}ToggleLikedReview`, null, {params: params});
    }
    //#endregion
    
    //#region GetRequests
    public getAlbumReviews(albumId: string): Observable<Review[]>{
        const params = new HttpParams().set("albumId", albumId)
        return this.http.get<Review[]>(`${this.baseUrl}GetAlbumReviews`,{params: params});
    }

    public getUserAlbumReviews(userId: string): Observable<Review[]>{
        const params = new HttpParams().set("userId", userId)
        return this.http.get<Review[]>(`${this.baseUrl}GetUserAlbumReviews`,{params: params});
    }

    public getAlbumReview(id: string): Observable<Review>{
        const params = new HttpParams().set("id", id)
        return this.http.get<Review>(`${this.baseUrl}Get`,{params: params});
    }

    public albumReviewCheck(albumId: string): Observable<boolean>{
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<boolean>(`${this.baseUrl}AlbumReviewCheck`,{params: params});
    }
    
    public getAlbumLikedCount(albumId: string): Observable<number>{
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<number>(`${this.baseUrl}GetAlbumLikedCount`,{params: params});
    }

    public getUserFeed(): Observable<Review[]>{
        return this.http.get<Review[]>(`${this.baseUrl}GetUserFeed`);
    }
    //#endregion

    //#region PutRequests
    public UpdateAlbumReview(id: string, newRate: string, newThoughts: string): Observable<CustomResponse<string | boolean>>{
        const params = new HttpParams().set("id", id).set("newRate", newRate).set("newThoughts", newThoughts);
        return this.http.put<CustomResponse<string | boolean>>(`${this.baseUrl}Put`, null, {params: params});
    }
    //#endregion

    //#region DeleteRequests
    public DeleteAlbumReview(id: string): Observable<CustomResponse<string>>{
        const params = new HttpParams().set("id", id);
        return this.http.delete<CustomResponse <string>>(`${this.baseUrl}Delete`, {params: params});
    }
    //#endregion
}
