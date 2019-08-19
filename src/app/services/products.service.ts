import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(category, offset, count, sort, toSort): Observable<any> {
    const params = new HttpParams().set('offset', offset).set('count', count).set('category', category)
    .set('sort', sort).set('toSort', toSort);
    return this.http.get('http://localhost:8080/router/getAllProducts', {params});
  }
  getAllBrandsByFilter() {
    return this.http.get('http://localhost:8080/router/getBrands');
  }

}
