import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { CartServicesService } from 'src/app/services/cart-services.service';
import { CompareService } from 'src/app/services/compare.service';


@Component({
  selector: 'app-pre-view-product',
  templateUrl: './pre-view-product.component.html',
  styleUrls: ['./pre-view-product.component.sass']
})
export class PreViewProductComponent implements OnInit {
  @Input() product;

  constructor(
    private prodSrv: ProductsService,
    private cartSrv: CartServicesService,
    private comparSrv: CompareService,
  ) { }
  get newPrice() {
    return Math.round(+this.product.price - ((+this.product.price / 100) * +this.product.sale));
  }

  ngOnInit() {
  }
  hasCart(product: Product) {
    return this.cartSrv.hasCart(product);
  }

  hasCompare(product: Product) {
    return this.comparSrv.hasCompare(product);
  }
  openViewProduct(product: Product): void {
    this.prodSrv.emitPreviewProductBlock.next(product);
  }
  addToCart(product: Product) {
    this.cartSrv.addToCart(product);
  }
  addToCompare(product: Product) {
    this.comparSrv.addCompare(product);
  }

}
