import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product.interfaces';
import { CartServicesService } from 'src/app/services/cart-services.service';

@Component({
  selector: 'app-preview-list',
  templateUrl: './app-preview-list.component.html',
  styleUrls: ['./app-preview-list.component.sass']
})
export class AppPreviewListComponent implements OnInit {

  @Input() product;
  constructor(
    private prodSrv: ProductsService,
    private cartSrt: CartServicesService,

  ) { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.cartSrt.addToCart(product);
  }
  openViewProduct(product: Product): void {
    this.prodSrv.emitPreviewProductBlock.next(product);
  }

}
