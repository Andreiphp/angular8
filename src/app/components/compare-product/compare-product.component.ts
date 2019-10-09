import { Component, OnInit } from '@angular/core';
import { CompareService } from 'src/app/services/compare.service';
import { Product } from 'src/app/interfaces/product.interfaces';
import { CartServicesService } from 'src/app/services/cart-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrls: ['./compare-product.component.sass']
})
export class CompareProductComponent implements OnInit {
  public products: Product[] = [];
  get productsCompare() {
    return this.products = Array.from(this.compareSrv.compareProducts).map((value) => {
      return value[1];
    });
  }
  constructor(
    private compareSrv: CompareService,
    private cartSev: CartServicesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {
    this.activateRoute.params.subscribe(() => {
      if (this.compareSrv.compareProducts.size === 0) {
        this.router.navigate(['catalog/view/1/1']);
      }
    });
  }
  deleteCompare(product: Product) {
    this.compareSrv.deleteFromCompare(product);
    if (this.compareSrv.compareProducts.size === 0) {
      this.router.navigate(['catalog/view/1/1']);
    }
  }
  addToCart(product: Product) {
    this.cartSev.addToCart(product);
  }
  hasCart(product: Product): boolean {
    return this.cartSev.hasCart(product);
  }
}
