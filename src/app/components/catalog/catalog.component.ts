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
      this._PRODSRV.getAllProducts(this.category, this.page, this._PAGSRV.visibleCountItems)
        .pipe(takeUntil(this._UNSEBSCRIBE)).toPromise()
        .then(products => {
          this.fillProducts(products);
          this._PAGSRV.subscribePagination.next();
        }).catch(error => {
          console.log(error);
        });
    });
  }

  ngOnInit() {

  }
  fillProducts({ count: c, res: data }) {
    this.products = [];
    if (data.length) {
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
  ngOnDestroy() {
    this._UNSEBSCRIBE.next();
    this._UNSEBSCRIBE.complete();
  }

}
