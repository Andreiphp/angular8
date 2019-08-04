import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {
  public brands;
  public filterstate = {};
  constructor(private proSrv: ProductsService) { }

  ngOnInit() {
    this.proSrv.getAllBrandsByFilter().subscribe((data) => {
      this.brands = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }
  filterSet($event, brand): void {
    if (this.filterstate.hasOwnProperty(brand.title)) {
      delete this.filterstate[brand.title];
    } else {
      this.filterstate[brand.title] = brand.title;
    }
    console.log( this.filterstate);
    
  }

}
