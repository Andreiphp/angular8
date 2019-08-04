import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PaginationServices {
  curentPage: number;
  totalRecords: number;
  visibleCountItems: number;
  totalPages: number;
  category: string;
  public subscribePagination = new Subject<any>();
  constructor() {
    this.visibleCountItems = localStorage.getItem('visibleCount') ? +localStorage.getItem('visibleCount') : 3;
  }

  setConfig(curent, totalR, category) {
    this.curentPage = curent,
    this.totalRecords = totalR;
    this.category = category;
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
