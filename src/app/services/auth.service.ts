import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable} from 'rxjs';
import { Album } from '../models/album';
import { User } from '../models/user';
import { UserDTO } from '../models/userDTO';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	constructor(
		private http: HttpClient
	) { }
	
	public register(user: User): Observable<any> {
		return this.http.post("https://localhost:7161/UserAuth/register", user, { 
			responseType: "text"
		});
	}
	
	public login(user: User): Observable<any> {
		return this.http.post("https://localhost:7161/UserAuth/login", user, {
			responseType: "text"
		});
	}

	public GetMe(): Observable<string> {
		var token = localStorage.getItem("authToken");
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.get("https://localhost:7161/UserAuth/get-me", {headers,responseType: "text"});
	}

	public GetUser(userId: string): Observable<any> {
        const params = new HttpParams().set("userId", userId)
        return this.http.get("https://localhost:7161/UserAuth/get-user",{params: params, responseType: "text"});
	}

	public isLoggedIn(){
		return localStorage.hasOwnProperty("user");
	}

	public uploadFile(files: any): Observable<any> | undefined{
		var token = localStorage.getItem("authToken")
		if (files.length === 0){
			return ;
		}
		let fileToUpload = <File>files;
		
		const formData = new FormData();
		formData.append("file", fileToUpload, fileToUpload.name);
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.put("https://localhost:7161/UserAuth/upload-image", formData, { headers:headers ,reportProgress: true, observe: "events" })
	}

	public updateProfile(username: string, bio: string, birthDate: string, email: string): Observable<any>{
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		var params = new HttpParams()
		.set("username", username)
		.set("bio", bio)
		.set("birthDate", birthDate)
		.set("email", email)
        return this.http.put("https://localhost:7161/UserAuth/update-user", null, {
			headers: headers,
			params: params,
			responseType: "text"
		})
	}

	public SearchUser(username: string): Observable<any>{
		const params = new HttpParams().set("username", username)
		return this.http.get(
			"https://localhost:7161/UserAuth/search-profile", 
			{
				params: params,
				responseType: "text"
			}
		);
	}

	public getCurrentUserFavoriteAlbums(): Observable<any>{
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.get("https://localhost:7161/UserAuth/get-current-user-favorite-albums", {
			headers: headers,
			responseType: "text"
		});
	}

	public getUserFavoriteAlbums(userId: string): Observable<any> {
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		const params = new HttpParams().set("userId", userId)
		return this.http.get("https://localhost:7161/UserAuth/get-user-favorite-albums", {
			params: params,
			headers: headers,
			responseType: "text"
		});
	}

	public updateUserFavoriteAlbums(favoriteAlbums: Album[]): Observable<any> {
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.post("https://localhost:7161/UserAuth/add-favorite-album", favoriteAlbums, {
			headers: headers,
			responseType: "text"
		});
	}

	public refreshToken(){
		var refreshToken = localStorage.getItem("refreshToken");
		var currentUser = localStorage.getItem("user");
		var tokenExpires = localStorage.getItem("tokenExpires");
		var tokenExpireDate = new Date(tokenExpires || "")
		var now = new Date()
		var parsed = JSON.parse(currentUser || "");
		var userId = parsed.Id
		if (now > tokenExpireDate){
			const params = new HttpParams()
			.set("userId", userId)
			.set("refreshToken",refreshToken || "")
			firstValueFrom(this.http.post("https://localhost:7161/UserAuth/refresh-token", null, {
				params: params
			})).then((data: any) => {
				localStorage.setItem('authToken', data.jwt);
				localStorage.setItem("tokenExpires", data.expires)
			})
		}
		else{
			return
		}
	}

	public likeAlbum(likeAlbum: Album): Observable<any>{
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.post("https://localhost:7161/UserAuth/like-album", likeAlbum, {
			headers: headers,
			responseType: "text"
		})
	}

	public checkUserLikedAlbum(albumId: string): Observable<any>{
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		const params = new HttpParams()
		.set("albumId", albumId)
		return this.http.get("https://localhost:7161/UserAuth/check-liked-album", {
			headers: headers,
			params: params,
			responseType: "text"
		})
	}

	public getUserLikedAlbums(userId: string): Observable<any>{
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		const params = new HttpParams()
		.set("userId", userId)
		return this.http.get("https://localhost:7161/UserAuth/user-liked-albums", {
			headers: headers,
			params: params,
			responseType: "text"
		})
	}

	public followUser(followedUser: UserDTO): Observable<any> {
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.post("https://localhost:7161/UserAuth/follow-user", followedUser, {
			headers: headers,
			responseType: "text"
		});
	}

	public checkUserFollowed(userId: string): Observable<any> {
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		const params = new HttpParams()
		.set("userId", userId)
		return this.http.get("https://localhost:7161/UserAuth/check-user-follow", {
			headers: headers,
			params: params,
			responseType: "text"
		})
	}

	public getUserFollingers(userId: string){
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		const params = new HttpParams()
		.set("userId", userId)
		return this.http.get("https://localhost:7161/UserAuth/user-follinger-counts", {
			headers: headers,
			params: params,
			responseType: "text"
		})
	}

	public getUserFollowings(userId: string){
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		const params = new HttpParams()
		.set("userId", userId)
		return this.http.get("https://localhost:7161/UserAuth/get-user-followings", {
			headers: headers,
			params: params,
			responseType: "text"
		})
	}

	public getUserFollowers(userId: string){
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		const params = new HttpParams()
		.set("userId", userId)
		return this.http.get("https://localhost:7161/UserAuth/get-user-followers", {
			headers: headers,
			params: params,
			responseType: "text"
		})
	}

	public getUserNotifications(){
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.get("https://localhost:7161/UserAuth/get-user-notifications", {
			headers: headers,
			responseType: "text"
		})
	}

	public getUserNotificationsCount(){
		var token = localStorage.getItem("authToken")
		const headers = new HttpHeaders({
            "Authorization": `bearer ${token}`
        });
		return this.http.get("https://localhost:7161/UserAuth/get-user-notifications-count", {
			headers: headers,
			responseType: "text"
		})
	}
}

