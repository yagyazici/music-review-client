import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomInterceptorService implements HttpInterceptor{
    urlList: string[] = ["UserAuth", "MusicReview"];
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var url = new URL(req.url);
        var path = this.getPath(url.pathname);
        var token = localStorage.getItem("authToken");
        if (this.urlList.includes(path)){
            let authReq = req.clone({
                setHeaders: {
                    "Authorization": `bearer ${token}` 
                }
            })
            return next.handle(authReq);
        }
        if (url.pathname.includes("RefreshToken")){
            let authReq = req.clone({
                setHeaders: {
                    "Authorization": `bearer ${token}` 
                }
            })
            return next.handle(authReq);
        }
        else {
            var accessToken = localStorage.getItem("accessToken");
            let spotifyRequest = req.clone({
                setHeaders: {
                    "Authorization": `bearer ${token}`,
                    "accessToken": `${accessToken}` 
                }
            });
            return next.handle(spotifyRequest)
        }
    }

    private getPath = (url: string): string => url.split("/")[1];
}