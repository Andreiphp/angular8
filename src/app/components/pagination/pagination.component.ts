import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PaginationServices} from '../../services/pagination.services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  constructor(
    private pagSrv: PaginationServices
  ) { }

  ngOnInit() {
    this.pagSrv.getCountAllPages().subscribe(data => {
      console.log(data);
    });
  }

}
