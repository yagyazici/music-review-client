import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Album } from 'src/app/models/Music/album';
import { AuthToken } from 'src/app/models/Auth/auth-token';
import { LoginRespose } from 'src/app/models/Responses/login.respose';
import { DataService } from '../ProvideServices/dataservice.service';
import { MusicHubService } from '../SignalR/music.hub.service';
import { UserHubService } from '../SignalR/user.hub.service';
import { CustomResponse } from 'src/app/models/Responses/custom-response';
import { User } from 'src/app/models/Auth/user';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { Notification } from 'src/app/models/Auth/notification';
import { Follingers } from 'src/app/models/Auth/follingers';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	baseUrl = "https://localhost:7172/UserAuth/"
	constructor(
		private http: HttpClient,
		private router: Router,
		private data: DataService,
		private musicHub: MusicHubService,
		private userHub: UserHubService
	) {
	}

	register = (user: User): Observable<CustomResponse<User & string[]>> =>
		this.http.post<CustomResponse<User & string[]>>(`${this.baseUrl}Register`, user);

	login = (user: User): Observable<CustomResponse<LoginRespose & string>> =>
		this.http.post<CustomResponse<LoginRespose & string>>(`${this.baseUrl}Login`, user);

	public logout() {
		localStorage.clear();
		this.router.navigate(["login"]);
		this.data.changeIsAuthenticated(false);
		this.userHub.off();
		this.musicHub.off();
	}

	GetMeUser = (): Observable<UserDTO> =>
		this.http.get<UserDTO>(`${this.baseUrl}GetMeUser`);

	public GetUser(userId: string): Observable<UserDTO> {
		const params = new HttpParams().set("userId", userId)
		return this.http.get<UserDTO>(`${this.baseUrl}GetUserProfile`, { params: params });
	}

	public uploadFile(files: any): Observable<any> | undefined {
		if (files.length === 0) return;
		let fileToUpload = <File>files;
		const formData = new FormData();
		formData.append("file", fileToUpload, fileToUpload.name);
		return this.http.put(`${this.baseUrl}UploadProfileImage`, formData, { reportProgress: true, observe: "events" })
	}

	public updateProfile(username: string, bio: string, birthDate: string, email: string): Observable<CustomResponse<boolean & string[]>> {
		const params = new HttpParams().set("username", username).set("bio", bio).set("birthDate", birthDate).set("email", email)
		return this.http.put<CustomResponse<boolean & string[]>>(`${this.baseUrl}UpdateUser`, null, {params: params});
	}

	public updatePassword(oldPassword: string, newPassword: string): Observable<CustomResponse<string>> {
		const params = new HttpParams().set("currentPassword", oldPassword).set("newPassword", newPassword);
		return this.http.put<CustomResponse<string>>(`${this.baseUrl}UpdatePassword`, null, {params: params});
	}

	public SearchUser(username: string): Observable<UserDTO[]> {
		const params = new HttpParams().set("username", username)
		return this.http.get<UserDTO[]>(`${this.baseUrl}SearchUserProfile`, {params: params});
	}

	getCurrentUserFavoriteAlbums = (): Observable<Album[]> => 
		this.http.get<Album[]>(`${this.baseUrl}GetCurrentUserFavoriteAlbums`);

	public getUserFavoriteAlbums(userId: string): Observable<Album[]> {
		const params = new HttpParams().set("userId", userId)
		return this.http.get<Album[]>(`${this.baseUrl}GetUsersFavoriteAlbums`, {params: params});
	}

	updateUserFavoriteAlbums = (favoriteAlbums: Album[]): Observable<CustomResponse<boolean>> => 
		this.http.post<CustomResponse<boolean>>(`${this.baseUrl}AddUserFavoriteAlbums`, favoriteAlbums);

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
			firstValueFrom(this.http.post<CustomResponse<AuthToken & boolean>>(`${this.baseUrl}RefreshToken`, null, {
				params: params
			})).then(data => {
				localStorage.setItem('authToken', data.response.Token);
				localStorage.setItem("tokenExpires", data.response.Expires.toString())
			})
		}
		else return;
	}

	likeAlbum = (likeAlbum: Album): Observable<CustomResponse<boolean>> =>
		this.http.post<CustomResponse<boolean>>(`${this.baseUrl}ToggleUserLikedAlbum`, likeAlbum)

	public checkUserLikedAlbum(albumId: string): Observable<boolean> {
		const params = new HttpParams().set("albumId", albumId)
		return this.http.get<boolean>(`${this.baseUrl}CheckUserAlbumLiked`, {params: params});
	}

	public getUserLikedAlbums(userId: string): Observable<Album[]> {
		const params = new HttpParams().set("userId", userId)
		return this.http.get<Album[]>(`${this.baseUrl}GetUserLikedAlbums`, {params: params});
	}

	followUser = (followedUser: UserDTO): Observable<CustomResponse<boolean>> =>
		this.http.post<CustomResponse<boolean>>(`${this.baseUrl}ToggleUserFollowedUser`, followedUser);

	public checkUserFollowed(userId: string): Observable<boolean> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<boolean>(`${this.baseUrl}CheckUserFollowed`, { params: params });
	}

	public getUserFollingers(userId: string): Observable<Follingers> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<Follingers>(`${this.baseUrl}GetUserFollingers`, { params: params })
	}

	public getUserFollowings(userId: string): Observable<UserDTO[]> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<UserDTO[]>(`${this.baseUrl}GetUserFollowings`, { params: params });
	}

	public getUserFollowers(userId: string): Observable<UserDTO[]> {
		const params = new HttpParams().set("userId", userId);
		return this.http.get<UserDTO[]>(`${this.baseUrl}GetUserFollowers`, { params: params });
	}

	getUserNotifications = (): Observable<Notification[]> => 
		this.http.get<Notification[]>(`${this.baseUrl}GetUserNotifications`);

	getUserNotificationsCount = (): Observable<number> => 
		this.http.get<number>(`${this.baseUrl}GetUserNotificationCount`);

	getImage = (): Observable<Blob> =>
		this.http.get("https://localhost:7172/Recourses/Images/63c824cca81836c19713059b.jpeg", { responseType: "blob" })

	deleteImage = (): Observable<CustomResponse<string>> => 
		this.http.delete<CustomResponse<string>>(`${this.baseUrl}DeleteProfileImage`)

	deleteNotification = (notification: Notification): Observable<CustomResponse<Notification[]>> => 
		this.http.delete<CustomResponse<Notification[]>>(`${this.baseUrl}DeleteNotification`, {body: notification});

	deleteAllNotifications = (): Observable<CustomResponse<Notification[]>> => 
		this.http.delete<CustomResponse<Notification[]>>(`${this.baseUrl}DeleteAllNotifications`);
}

