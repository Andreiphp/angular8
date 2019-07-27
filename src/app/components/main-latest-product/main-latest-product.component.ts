import { Component, OnInit, Input } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { Unsubscribable } from 'rxjs';
@Component({
  selector: 'app-main-latest-product',
  templateUrl: './main-latest-product.component.html',
  styleUrls: ['./main-latest-product.component.sass']
})
export class MainLatestProductComponent implements OnInit {
  unsubscribe: Unsubscribable;
  @Input() title;
  @Input() message;
  products: any;
  constructor(public request: RequestsService) {
    this.products = [
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-10.jpg',
        state: 'all'
    },
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-10.jpg',
        state: 'all'
    },
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-10.jpg',
        state: 'all'
    },
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-11.jpg',
        state: 'all'
    },
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-11.jpg',
        state: 'all'
    },
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-11.jpg',
        state: 'all'
    },
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-11.jpg',
        state: 'all'
    },
      {
        id: '1',
        title: 'werty',
        price: 'image',
        image: 'product-11.jpg',
        state: 'all'
    },
    ];

  }

  ngOnInit() {
  }

}
