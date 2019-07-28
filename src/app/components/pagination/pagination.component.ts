import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginationServices } from '../../services/pagination.services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnDestroy {
  public pages = [];
  public curentPage: number;
  public category: string;
  private UNSUBSCRIBE = new Subject<any>();
  constructor(
    public pagSrv: PaginationServices
  ) {
    this.pagSrv.subscribePagination.pipe(takeUntil(this.UNSUBSCRIBE)).subscribe(() => {
      this.setPages();
    });
   }

  ngOnInit() {
    this.curentPage = this.pagSrv.curentPage;
    this.category = this.pagSrv.category;
    console.log(this.pagSrv.curentPage);
    console.log(this.pagSrv.totalRecords);
    console.log(this.pagSrv.visibleCountItems);
    this.setPages();
  }

  setPages() {
    this.pages = [];
    this.curentPage = this.pagSrv.curentPage;
    this.category = this.pagSrv.category;
    if (this.pagSrv.totalPages) {
      for (let i = 1; i <= this.pagSrv.totalPages; i++) {
          this.pages.push(i);
      }
    }
  }
  ngOnDestroy() {
    this.UNSUBSCRIBE.next();
    this.UNSUBSCRIBE.complete();
  }




}
