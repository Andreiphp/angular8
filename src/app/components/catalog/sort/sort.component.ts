import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SortService } from 'src/app/services/sort.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.sass']
})
export class SortComponent implements OnInit {
  @Output() appSort: EventEmitter<any> = new EventEmitter();
  public sort;
  public ascDesc: boolean;
  constructor(private sortSrv: SortService) { }

  ngOnInit() {
    this.ascDesc = true;
    this.sort = 'title';
  }
  setTosort() {
    this.ascDesc = !this.ascDesc;
    this.sortSrv.sort = this.sort;
    this.sortSrv.toSort = this.ascDesc;
    this.appSort.emit();
  }
  setSort() {
    this.sortSrv.sort = this.sort;
    this.appSort.emit();
  }


}
