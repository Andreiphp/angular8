import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { animatePreview, animateOverlay } from 'src/app/animations/preview-product-animation';
import { CartServicesService } from 'src/app/services/cart-services.service';

@Component({
  selector: 'app-preview-prod-block',
  templateUrl: './preview-prod-block.component.html',
  styleUrls: ['./preview-prod-block.component.sass'],
  animations: [animatePreview, animateOverlay]
})
export class PreviewProdBlockComponent implements OnInit, OnDestroy {
  public product: Product;
  public count = 0;
  public state = 'void';
  get newPrice() {
    return Math.round(+this.product.price - ((+this.product.price / 100) * +this.product.sale));
  }
  constructor(
    private prodSrv: ProductsService,
    private cartServ: CartServicesService

  ) {
  }

  deleteComponent() {
    this.state = 'hide';
    setTimeout(() => {
      this.prodSrv.emitclearPreview.next();
    }, 500);
  }
  dec() {
    this.count = this.count <= 0 ? this.count = 0 : --this.count;
  }
  inc() {
    this.count = this.count >= 10 ? this.count = 10 : ++this.count;
  }
  addToCart(product: Product, count?: number) {
    this.cartServ.addToCart(product, count);
  }
  ngOnInit() {
    this.state = 'initial';
  }
  ngOnDestroy() {

  }

}
