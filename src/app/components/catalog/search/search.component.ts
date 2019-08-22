import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { /* Router, */ ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, pipe } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interfaces';
import { PaginationServices } from 'src/app/services/pagination.services';
import { SortService } from 'src/app/services/sort.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  private page: number;
  private sort: string;
  private toSort: boolean;
  private _unsubscribe: Subject<any> = new Subject();
  constructor(
    private prodSrv: ProductsService,
    private router: ActivatedRoute,
    private _pagSrv: PaginationServices,
    private _sortSrv: SortService,
  ) {
    this.prodSrv.emitSearch.pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      console.log(data);
      const confSearch = this.prodSrv.searchData;
      this.showSearchProducts(confSearch, this.page, this._pagSrv.visibleCountItems,
        this._sortSrv.sort,
        this._sortSrv.toSort);
    });
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.page = params.page;
      const confSearch = this.prodSrv.searchData;
      this.showSearchProducts(confSearch, this.page, this._pagSrv.visibleCountItems,
        this._sortSrv.sort,
        this._sortSrv.toSort);

    });
  }
  showSearchProducts(config, page, countPage, sort, toSort) {
    this.prodSrv.getProductsByFilter(arguments).subscribe(data => {
      console.log(data);
    });

    // .pipe(takeUntil(this._unsubscribe)).subscribe((data) => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });
  }

  appSort() {

  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();

  }
}
