import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PaginationServices } from '../../services/pagination.services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnDestroy {
  public pages = [];
  public curentPage: number;
  public category: string;
  private unsubscribe = new Subject<any>();
  @Input() flagVisible;
  constructor(
    public pagSrv: PaginationServices,
    private router: Router
  ) {
    this.pagSrv.subscribePagination.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.setPages();
    });
  }
  get fromVisiblePages() {
    if (this.curentPage === 1) {
      return 1;
    } else {
      return (this.curentPage - 1) * this.pagSrv.visibleCountItems;
    }
  }
  get toVisiblePages() {
    if (this.curentPage === 1) {
      return this.fromVisiblePages + this.pagSrv.productsLength - 1;
    } else {
      return this.fromVisiblePages + this.pagSrv.productsLength;
    }
  }

  ngOnInit() {
    this.curentPage = this.pagSrv.curentPage;
    this.category = this.pagSrv.category;
    this.setPages();
  }
  goPrev() {
    let page;
    if (this.curentPage !== 1) {
      page = --this.curentPage;
    } else {
      page = this.curentPage;
    }
    this.router.navigate([`/view/catalog/${this.category}/${page}`]);
  }
  goNext() {
    let page;
    if (this.curentPage !== this.pagSrv.totalPages) {
      page = ++this.curentPage;
    } else {
      page = this.curentPage;
    }
    this.router.navigate([`/catalog/view/${this.category}/${page}`]);
  }

  setPages() {
    this.pages = [];
    this.curentPage = +this.pagSrv.curentPage;
    this.category = this.pagSrv.category;
    if (this.pagSrv.totalPages && this.pagSrv.totalPages > 5) {
      this.pages.push(1);
      for (let i = 1; i <= this.pagSrv.totalPages; i++) {
        if (this.curentPage === 2) {
          if (i - 1 === this.curentPage || i - 2 === this.curentPage || i === this.curentPage) {
            this.pages.push(i);
          }
        } else if (this.curentPage === this.pagSrv.totalPages - 1) {
          if (i + 1 === this.curentPage || i + 2 === this.curentPage || i === this.curentPage) {
            this.pages.push(i);
          }
        } else if (this.curentPage !== 1 && this.curentPage !== this.pagSrv.totalPages) {
          if (i + 1 === this.curentPage || i - 1 === this.curentPage || i === this.curentPage) {
            this.pages.push(i);
          }
        } else {
          if (this.curentPage === 1) {
            if (i >= 2 && i <= 4) {
              this.pages.push(i);
            }
          } else {
            if (i >= this.pagSrv.totalPages - 3 && i <= this.pagSrv.totalPages - 1) {
              this.pages.push(i);
            }
          }
        }
      }
      this.pages.push(this.pagSrv.totalPages);
    } else {
      for (let i = 1; i <= this.pagSrv.totalPages; i++) {
        this.pages.push(i);
      }
    }
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }




}
