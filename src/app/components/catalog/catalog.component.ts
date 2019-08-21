import { Component, OnInit, OnDestroy } from '@angular/core';
import { divTrigger } from './catalog-animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../interfaces/product.interfaces';
// import { PaginationServices } from 'src/app/services/pagination.services';
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
  private _unsebsscribe: Subject<any> = new Subject();
  constructor(
    private route: Router,
    private prodSrv: ProductsService
  ) {
  }

  initSort() {
    if (!this.sort || this.toSort === undefined) {
      this.sort = 'title';
      this.toSort = true;
    }
  }

  ngOnInit() {

  }

  startSearch($event) {
    this.prodSrv.searchData = $event;
    const path = this.route.parseUrl(this.route.url).root.children.primary.segments[2].path === '1';
    if ((/search/g).test(this.route.url) && path) {
        this.prodSrv.emitSearch.next($event);
    } else {
      this.route.navigate(['/catalog/search/1']);
    }
  }

  appSort($event) {
    console.log($event);
    this.sort = $event.sort;
    this.toSort = $event.tosort;
   // this.showProducts(this.category, this.page, this._PAGSRV.visibleCountItems, this.sort, this.toSort);
  }
  ngOnDestroy() {
    this._unsebsscribe.next();
    this._unsebsscribe.complete();
  }

}
