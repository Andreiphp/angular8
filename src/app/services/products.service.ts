import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public searchData;
  public stateView: boolean;
  public stateList: boolean;
  public emitSearch = new Subject<any>();
  public clearSearch = new Subject<any>();
  public emitPreviewProductBlock = new Subject<any>();
  public emitclearPreview = new Subject<any>();
  constructor(private http: HttpClient) {
    this.stateView = true;
    this.stateList = false;
  }

  getAllProducts(category, offset, count, sort, toSort): Observable<any> {
    const params = new HttpParams().set('offset', offset).set('count', count).set('category', category)
      .set('sort', sort).set('toSort', toSort);
    return this.http.get('http://localhost:8080/router/getAllProducts', { params });
  }
  getAllBrandsByFilter() {
    return this.http.get('http://localhost:8080/router/getBrands');
  }
  getProductsByFilter(config: IArguments): Observable<any> {
    const params = new HttpParams()
      .set('brands', this.getParamsBrand(config[0].brand))
      .set('priceTo', config[0].priseto)
      .set('priceFrom', config[0].priceFrom)
      .set('offset', config[1])
      .set('count', config[2])
      .set('sort', config[3])
      .set('toSort', config[4]);
    return this.http.get('http://localhost:8080/router/getProductsByFilter', { params });
  }
  getParamsBrand(brand: Set<string>) {
    if (brand) {
      return Array.from(brand).join(',');
    } else {
      return null;
    }
  }

}
