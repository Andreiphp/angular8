import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  public sort;
  public toSort;
  constructor() {
    this.sort = 'title';
    this.toSort = 'asc';
   }
}
