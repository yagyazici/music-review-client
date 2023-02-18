import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomInterceptorService implements HttpInterceptor{

    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith("https://localhost:7172")){
            var token = localStorage.getItem("authToken");
            let authReq = req.clone({
                setHeaders: {
                    "Authorization": `bearer ${token}` 
                }
            })
            return next.handle(authReq);
        }
        return next.handle(req)
    }
}