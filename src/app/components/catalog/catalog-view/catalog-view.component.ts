import { Component, OnInit, OnDestroy } from '@angular/core';
// import { divTrigger } from './catalog-animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../interfaces/product.interfaces';
import { PaginationServices } from 'src/app/services/pagination.services';
import { SortService } from 'src/app/services/sort.service';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.sass']
})
export class CatalogViewComponent implements OnInit {
  public isVisible = false;
  public products: Product[] = [];
  public countPages: number;
  private category: number;
  private page: number;
  private sort: string;
  private toSort: boolean;
  private _unsubscribe: Subject<any> = new Subject();
  constructor(
    private _ROUTER: ActivatedRoute,
    private prodSrv: ProductsService,
    private _PAGSRV: PaginationServices,
    private sortSrv: SortService,
    private route: Router) { }

  ngOnInit() {
    this._ROUTER.params.subscribe(data => {
      const params = this._ROUTER.snapshot.params;
      this.category = params.category;
      this.page = params.page;
      this.initSort();
      this.clearSearch();
      this.showProducts(this.category, this.page, this._PAGSRV.visibleCountItems, this.sort, this.toSort);
    });
  }
  initSort() {
    if (!this.sort || this.toSort === undefined) {
      this.sort = 'title';
      this.toSort = true;
    }
  }
  showProducts(category, page, visibleCountItems, sort, toSort) {
    this.prodSrv.getAllProducts(category, page, visibleCountItems, sort, toSort)
      .pipe(takeUntil(this._unsubscribe)).toPromise()
      .then(products => {
        this.fillProducts(products);
        this._PAGSRV.subscribePagination.next();
      }).catch(error => {
        console.log(error);
      });
  }
  fillProducts({ count: c, res: data }) {
    this.products = [];
    if (data && data.length) {
      this._PAGSRV.setConfig(this.page, c.count, data.length, this.category);
      data.forEach((product: Product) => {
        this.products.push({
          id: product.id,
          title: product.title,
          price: product.price,
          state: 'all',
          img: product.img,
          minidescription: product.minidescription
        });
      });
    }
  }

  appSort() {
    this.showProducts(this.category, this.page, this._PAGSRV.visibleCountItems, this.sortSrv.sort, this.sortSrv.toSort);
  }
  chengeProductsState(state: string) {
    if (state === 'list') {
      this.prodSrv.stateView = false;
      this.prodSrv.stateList = true;
    } else {
      this.prodSrv.stateView = true;
      this.prodSrv.stateList = false;
    }
  }

  clearSearch() {
    this.prodSrv.clearSearch.next();
  }
}
