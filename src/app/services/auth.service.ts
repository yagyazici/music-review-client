import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Album } from '../models/album';
import { CustomResponse } from '../models/custom-response';
import { Follingers } from '../models/follingers';
import { Notification } from '../models/notification';
import { User } from '../models/user';
import { UserDTO } from '../models/userDTO';
import { DataService } from './dataservice.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	baseUrl = "https://localhost:7172/UserAuth/"
	headers: HttpHeaders;
	constructor(
		private http: HttpClient,
		private router: Router,
		private data: DataService,
	) {
		var token = localStorage.getItem("authToken");
		this.headers = new HttpHeaders({
			"Authorization": `bearer ${token}`
		});
	}

	public register(user: User): Observable<CustomResponse> {
		return this.http.post<CustomResponse>(`${this.baseUrl}Register`, user);
	}

	public login(user: User): Observable<CustomResponse> {
		return this.http.post<CustomResponse>(`${this.baseUrl}Login`, user);
	}

	public logout() {
		localStorage.removeItem("authToken");
		localStorage.removeItem("user");
		localStorage.removeItem("tokenExpires");
		localStorage.removeItem("refreshToken");
		if (localStorage.hasOwnProperty("currentlyPlaying")) {
			localStorage.removeItem("currentlyPlaying");
		}
		this.router.navigate(["login"]);
		this.data.changeIsAuthenticated(false);
	}

	public GetUser(userId: string): Observable<UserDTO> {
		const params = new HttpParams().set("userId", userId)
		return this.http.get<UserDTO>(`${this.baseUrl}GetUserProfile`, { params: params });
	}

	public uploadFile(files: any): Observable<any> | undefined {
		if (files.length === 0) {
			return;
		}
		let fileToUpload = <File>files;
		const formData = new FormData();
		formData.append("file", fileToUpload, fileToUpload.name);
		return this.http.put(`${this.baseUrl}UploadProfileImage`, formData, { headers: this.headers, reportProgress: true, observe: "events" })
	}

	public updateProfile(username: string, bio: string, birthDate: string, email: string): Observable<CustomResponse> {
		const params = new HttpParams()
			.set("username", username)
			.set("bio", bio)
			.set("birthDate", birthDate)
			.set("email", email)
		return this.http.put<CustomResponse>(`${this.baseUrl}UpdateUser`, null, {
			headers: this.headers,
			params: params
		});
	}

	public updatePassword(oldPassword: string, newPassword: string): Observable<CustomResponse> {
		const params = new HttpParams()
			.set("currentPassword", oldPassword)
			.set("newPassword", newPassword);
		return this.http.put<CustomResponse>(`${this.baseUrl}UpdatePassword`, null, {
			headers: this.headers,
			params: params
		});
	}

	public SearchUser(username: string): Observable<UserDTO[]> {
		const params = new HttpParams().set("username", username)
		return this.http.get<UserDTO[]>(
			`${this.baseUrl}SearchUserProfile`,
			{
				params: params
			}
		);
	}

	public getCurrentUserFavoriteAlbums(): Observable<Album[]> {
		return this.http.get<Album[]>(`${this.baseUrl}GetCurrentUserFavoriteAlbums`, {
			headers: this.headers
		});
	}

	public getUserFavoriteAlbums(userId: string): Observable<Album[]> {
		const params = new HttpParams().set("userId", userId)
		return this.http.get<Album[]>(`${this.baseUrl}GetUsersFavoriteAlbums`, {
			params: params,
			headers: this.headers
		});
	}

	public updateUserFavoriteAlbums(favoriteAlbums: Album[]): Observable<CustomResponse> {
		return this.http.post<CustomResponse>(`${this.baseUrl}AddUserFavoriteAlbums`, favoriteAlbums, {
			headers: this.headers
		});
	}

	public refreshToken() {
		var refreshToken = localStorage.getItem("refreshToken");
		var currentUser = localStorage.getItem("user");
		var tokenExpires = localStorage.getItem("tokenExpires");
		var tokenExpireDate = new Date(tokenExpires || "")
		var now = new Date()
		var parsed = <UserDTO>JSON.parse(currentUser || "");
		var userId = parsed.Id
		if (now > tokenExpireDate) {
			const params = new HttpParams()
				.set("userId", userId)
				.set("refreshToken", refreshToken || "")
			firstValueFrom(this.http.post<CustomResponse>(`${this.baseUrl}RefreshToken`, null, {
				params: params
			})).then(data => {
				console.log(data.response);
				localStorage.setItem('authToken', data.response.jwt);
				localStorage.setItem("tokenExpires", data.response.expires)
			})
		}
		else return;
	}

	public likeAlbum(likeAlbum: Album): Observable<CustomResponse> {
		return this.http.post<CustomResponse>(`${this.baseUrl}ToggleUserLikedAlbum`, likeAlbum, {
			headers: this.headers
		})
	}

	public checkUserLikedAlbum(albumId: string): Observable<boolean> {
		const params = new HttpParams()
			.set("albumId", albumId)
		return this.http.get<boolean>(`${this.baseUrl}CheckUserAlbumLiked`, {
			headers: this.headers,
			params: params
		})
	}

	public getUserLikedAlbums(userId: string): Observable<Album[]> {
		const params = new HttpParams()
			.set("userId", userId)
		return this.http.get<Album[]>(`${this.baseUrl}GetUserLikedAlbums`, {
			headers: this.headers,
			params: params
		})
	}

	public followUser(followedUser: UserDTO): Observable<CustomResponse> {
		return this.http.post<CustomResponse>(`${this.baseUrl}ToggleUserFollowedUser`, followedUser, { headers: this.headers });
	}

	public checkUserFollowed(userId: string): Observable<boolean> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<boolean>(`${this.baseUrl}CheckUserFollowed`, { headers: this.headers, params: params });
	}

	public getUserFollingers(userId: string): Observable<Follingers> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<Follingers>(`${this.baseUrl}GetUserFollingers`, { headers: this.headers, params: params })
	}

	public getUserFollowings(userId: string): Observable<UserDTO[]> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<UserDTO[]>(`${this.baseUrl}GetUserFollowings`, { headers: this.headers, params: params });
	}

	public getUserFollowers(userId: string): Observable<UserDTO[]> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<UserDTO[]>(`${this.baseUrl}GetUserFollowers`, { headers: this.headers, params: params });
	}

	public getUserNotifications(): Observable<Notification[]> {
		return this.http.get<Notification[]>(`${this.baseUrl}GetUserNotifications`, { headers: this.headers });
	}

	public getUserNotificationsCount(): Observable<number> {
		return this.http.get<number>(`${this.baseUrl}GetUserNotificationCount`, { headers: this.headers });
	}

	public getImage(): Observable<Blob> {
		return this.http.get("https://localhost:7172/Recourses/Images/63c824cca81836c19713059b.jpeg", { responseType: "blob" })
	}

	public deleteImage(): Observable<CustomResponse> {
		return this.http.delete<CustomResponse>(`${this.baseUrl}DeleteProfileImage`, { headers: this.headers })
	}
}

