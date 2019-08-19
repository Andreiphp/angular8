import { Component, OnInit, OnDestroy } from '@angular/core';
import { divTrigger } from './catalog-animations';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: Router
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
    console.log($event);
    this.route.navigate(['/catalog/search']);
  }

  appSort($event) {
    console.log($event);
    this.sort = $event.sort;
    this.toSort = $event.tosort;
   // this.showProducts(this.category, this.page, this._PAGSRV.visibleCountItems, this.sort, this.toSort);
  }
  ngOnDestroy() {
    this._UNSEBSCRIBE.next();
    this._UNSEBSCRIBE.complete();
  }

}
