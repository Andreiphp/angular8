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
  private confiSearch;
  private _unsubscribe: Subject<any> = new Subject();
  constructor(
    private prodSrv: ProductsService,
    private router: ActivatedRoute,
    private _pagSrv: PaginationServices,
    private _sortSrv: SortService,
  ) {
    this.prodSrv.emitSearch.pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      const confSearch = this.prodSrv.searchData;
      this.showSearchProducts(confSearch, this.page, this._pagSrv.visibleCountItems,
        this._sortSrv.sort,
        this._sortSrv.toSort);
    });
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.page = params.page;
      if (this.prodSrv.searchData) {
        this.confiSearch = this.prodSrv.searchData;
      } else {
        this.confiSearch = this.defoltSearch();
      }
      this.showSearchProducts(this.confiSearch, this.page, this._pagSrv.visibleCountItems,
        this._sortSrv.sort,
        this._sortSrv.toSort);

    });
  }
  showSearchProducts(config, page, countPage, sort, toSort) {
    this.prodSrv.getProductsByFilter(arguments).pipe(takeUntil(this._unsubscribe)).subscribe(products => {
      this.fillProducts(products);
      this._pagSrv.subscribePagination.next();
    });
  }

  defoltSearch() {
    return {
      priseto: 200,
      priceFrom: 0,
      brand: new Set(),
    };
  }
  appSort() {
    this.showSearchProducts(this.confiSearch, this.page, this._pagSrv.visibleCountItems, this._sortSrv.sort, this._sortSrv.toSort);
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

  fillProducts({ count: c, res: data }) {
    this.products = [];
    if (data && data.length) {
      this._pagSrv.setConfig(this.page, c[0].count, data.length);
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

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();

  }
}
