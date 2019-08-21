import { Component, OnInit, OnDestroy } from '@angular/core';
// import { divTrigger } from './catalog-animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../interfaces/product.interfaces';
import { PaginationServices } from 'src/app/services/pagination.services';

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
  private _UNSEBSCRIBE: Subject<any> = new Subject();
  constructor(
    private _ROUTER: ActivatedRoute,
    private _PRODSRV: ProductsService,
    private _PAGSRV: PaginationServices,
    private route: Router) { }

  ngOnInit() {
    this._ROUTER.params.subscribe(data => {
      const params = this._ROUTER.snapshot.params;
      this.category = params.category;
      this.page = params.page;
      this.initSort();
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
    this._PRODSRV.getAllProducts(category, page, visibleCountItems, sort, toSort)
      .pipe(takeUntil(this._UNSEBSCRIBE)).toPromise()
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
      this._PAGSRV.setConfig(this.page, c.count, this.category);
      data.forEach((product: Product) => {
        this.products.push({
          id: product.id,
          title: product.title,
          price: product.price,
          state: 'all',
          img: product.img
        });
      });
    }
  }

}
