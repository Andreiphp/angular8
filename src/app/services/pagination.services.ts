import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PaginationServices {
  curentPage: number;
  totalRecords: number;
  visibleCountItems: number;
  totalPages: number;
  category: string;
  productsLength: number;
  public subscribePagination = new Subject<any>();
  constructor() {
    this.visibleCountItems = localStorage.getItem('visibleCount') ? +localStorage.getItem('visibleCount') : 6;
    this.productsLength  = this.productsLength ? this.productsLength : 0;
  }

  setConfig(curent, totalR, category, productsLength) {
    this.curentPage = curent,
    this.totalRecords = totalR;
    this.category = category;
    this.productsLength = productsLength;
    this.setTotalPages();
  }

  setTotalPages() {
    if (this.totalRecords > this.visibleCountItems) {
      this.totalPages = Math.ceil(this.totalRecords / this.visibleCountItems);
    } else {
      this.totalPages = 0;
    }
  }
}
