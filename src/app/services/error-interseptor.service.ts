import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterseptorService implements HttpInterceptor {
    constructor(private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const obs = next.handle(request).subscribe(res => {
        }, error1 => {
            if (error1.status === 401) {
                this.router.navigate(['/login']);
                localStorage.removeItem('isAdmin');
            }
        });

        return next.handle(request);
    }
}