import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.sass']
})
export class SortComponent implements OnInit {
  @Output() appSort: EventEmitter<any> = new EventEmitter();
  public sort;
  public ascDesc: boolean;
  constructor() { }

  ngOnInit() {
    this.ascDesc = true;
    this.sort = 'title';
  }
  setTosort() {
    this.ascDesc = !this.ascDesc;
    this.appSort.emit({sort: this.sort, tosort: this.ascDesc});
  }
  setSort() {
    this.appSort.emit({sort: this.sort, tosort: this.ascDesc});
  }


}
