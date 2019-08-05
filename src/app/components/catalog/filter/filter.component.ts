import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {
  public brands;
  public filterstate = {};
  public start = 0;
  public end = 200;
  public step = 10;
  public widht;
  constructor(private proSrv: ProductsService) { }
  @ViewChild('rangeS', { static: false }) rangeS;
  ngOnInit() {
    this.proSrv.getAllBrandsByFilter().subscribe((data) => {
      this.brands = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    setTimeout(() => {
      this.getCoord();
    });
  }
  getCoord() {
    this.widht = this.rangeS.nativeElement.getBoundingClientRect().widht;
    console.log();

  }
  filterSet($event, brand): void {
    if (this.filterstate.hasOwnProperty(brand.title)) {
      delete this.filterstate[brand.title];
    } else {
      this.filterstate[brand.title] = brand.title;
    }
  }

}
