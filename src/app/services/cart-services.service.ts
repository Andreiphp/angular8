import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interfaces';
interface Cart {
  count: number;
  product: Product;
}
@Injectable({
  providedIn: 'root'
})
export class CartServicesService {
  basket: Map<number, Cart> = new Map();

  constructor() { }

  addToCart(product: Product) {
    if (this.basket.has(product.id)) {
      if (this.basket.get(product.id).count >= 10) {
        alert('Стор');
      } else {
        this.basket.get(product.id).count++;
      }
    } else {
      this.basket.set(product.id, { count: 1, product });
    }
  }
}
