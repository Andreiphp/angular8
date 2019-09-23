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
  hasCart(product) {
    if (this.basket.has(product.id)) {
      return true;
    }
    return false;
  }
  getSummCart() {
    return Array.from(this.basket).reduce((prev, curent, arr) => {
      return prev += curent[1].count * +curent[1].product.price;
    }, 0);
  }
  addToCart(product: Product, count?: number) {
    if (this.basket.has(product.id)) {
      if (this.basket.get(product.id).count >= 10) {
        alert('Стор');
      } else {
        if (count) {
          this.basket.get(product.id).count += count;
        } else {
          this.basket.get(product.id).count++;
        }
      }
    } else {
      if (count) {
        this.basket.set(product.id, { count, product });
      } else {
        this.basket.set(product.id, { count: 1, product });
      }
    }
  }
  deleteFromCart(product: Product) {
    if (this.basket.has(product.id)) {
      this.basket.delete(product.id);
    }
  }
}
