import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PaginationServices {
  constructor ( private http: HttpClient) {

  }
  getCountAllPages (): Observable<any> {
    return this.http.get('http://localhost:8080/router/count_pages');
  }
}
