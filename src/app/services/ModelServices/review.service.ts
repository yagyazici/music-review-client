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
    constructor(private http: HttpClient) { 
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
    }

    //#region PostRequests
    public postReview(review: Review): Observable<CustomResponse<string>> {
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        return this.http.post<CustomResponse<string>>(`${this.baseUrl}Post`, review,{headers: headers});
    }
    
    public likeReview(reviewId: string): Observable<CustomResponse<string>>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("reviewId", reviewId)
        return this.http.post<CustomResponse<string>>(`${this.baseUrl}ToggleLikedReview`, null, {headers: headers, params: params});
    }
    //#endregion
    
    //#region GetRequests
    public getAlbumReviews(albumId: string): Observable<Review[]>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId)
        return this.http.get<Review[]>(`${this.baseUrl}GetAlbumReviews`,{headers: headers, params: params});
    }

    public getUserAlbumReviews(userId: string): Observable<Review[]>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("userId", userId)
        return this.http.get<Review[]>(`${this.baseUrl}GetUserAlbumReviews`,{headers: headers, params: params});
    }

    public getAlbumReview(id: string): Observable<Review>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("id", id)
        return this.http.get<Review>(`${this.baseUrl}Get`,{headers: headers, params: params});
    }

    public albumReviewCheck(albumId: string): Observable<boolean>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<boolean>(`${this.baseUrl}AlbumReviewCheck`,{headers: headers, params: params});
    }
    
    public getAlbumLikedCount(albumId: string): Observable<number>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("albumId", albumId);
        return this.http.get<number>(`${this.baseUrl}GetAlbumLikedCount`,{headers: headers, params: params});
    }

    public getUserFeed(): Observable<Review[]>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        return this.http.get<Review[]>(`${this.baseUrl}GetUserFeed`,{headers: headers});
    }
    //#endregion

    //#region PutRequests
    public UpdateAlbumReview(id: string, newRate: string, newThoughts: string): Observable<CustomResponse<string | boolean>>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("id", id).set("newRate", newRate).set("newThoughts", newThoughts);
        return this.http.put<CustomResponse<string | boolean>>(`${this.baseUrl}Put`, null, {headers: headers, params: params});
    }
    //#endregion

    //#region DeleteRequests
    public DeleteAlbumReview(id: string): Observable<CustomResponse<string>>{
        var token = localStorage.getItem("authToken");
		var headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
        const params = new HttpParams().set("id", id);
        return this.http.delete<CustomResponse <string>>(`${this.baseUrl}Delete`, {headers: headers, params: params});
    }
    //#endregion
}
