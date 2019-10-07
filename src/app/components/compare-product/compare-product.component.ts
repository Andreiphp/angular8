import { Component, OnInit } from '@angular/core';
import { CompareService } from 'src/app/services/compare.service';
import { Product } from 'src/app/interfaces/product.interfaces';

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrls: ['./compare-product.component.sass']
})
export class CompareProductComponent implements OnInit {
  public products: Product[] = [];
  constructor(
    private compareSrv: CompareService,
  ) { }

  ngOnInit() {
    this.products = Array.from(this.compareSrv.compareProducts).map((value) => {
      return value[1];
    });
    console.log(this.compareSrv);
  }

}
