import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interfaces';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-pre-view-product',
  templateUrl: './pre-view-product.component.html',
  styleUrls: ['./pre-view-product.component.sass']
})
export class PreViewProductComponent implements OnInit {
  @Input() product;

  constructor(private prodSrv: ProductsService) { }

  ngOnInit() {
  }

  openViewProduct(product: Product): void {
    this.prodSrv.emitPreviewProductBlock.next(product);
  }

}
