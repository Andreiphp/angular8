import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterseptorService implements HttpInterceptor {
    constructor(private router: Router, private actRoute: ActivatedRoute) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const obs = next.handle(request).subscribe(res => {
        }, error => {
         //   const url: string = this.actRoute['_routerState'].snapshot.url;
            if (!request.url.includes('/admin')) {
                if (error.status === 401) {
                    this.router.navigate(['/login']);
                    localStorage.removeItem('isAdmin');
                }
            }

        });

        return next.handle(request);
    }
}