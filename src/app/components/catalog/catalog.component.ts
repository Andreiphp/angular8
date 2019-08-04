import { Component, OnInit, OnDestroy } from '@angular/core';
import { divTrigger } from './catalog-animations';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../interfaces/product.interfaces';
import { PaginationServices } from 'src/app/services/pagination.services';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
  animations: [
    divTrigger
  ]
})
export class CatalogComponent implements OnInit, OnDestroy {
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
  ) {
    this._ROUTER.children[0].params.subscribe(data => {
      const params = this._ROUTER.snapshot.children[0].params;
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

  ngOnInit() {

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

  appSort($event) {
    console.log($event);
    this.sort = $event.sort;
    this.toSort = $event.tosort;
    this.showProducts(this.category, this.page, this._PAGSRV.visibleCountItems, this.sort, this.toSort);
  }
  ngOnDestroy() {
    this._UNSEBSCRIBE.next();
    this._UNSEBSCRIBE.complete();
  }

}
