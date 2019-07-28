import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, Subject, of, fromEvent, merge } from 'rxjs/index';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    subject: Subject<any> = new Subject();
    obser = new Observable();

    constructor(public http: HttpClient) {


    }


    checkI(user) {
        this.subject.next(user);

    }


    getAdmin(login: string, password: string): Observable<any> {
        return this.http.post('http://localhost:8080/router/authenticate', {
            login: login,
            password: password
        });
    }

    checkToken() {
        return this.http.get('http://localhost:8080/router/checkToken');
    }
    get_categories(): Observable<any> {
      return  this.http.get('http://localhost:8080/router/get_categories');
    }

    // concatObserv() {
    //     merge(this.get_one_user(), this.getFriends()).subscribe(res => {
    //         console.log(res);
    //     });
    // }
}


