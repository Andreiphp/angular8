import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  compareProducts: Map<number, Product> = new Map();
  constructor() { }
  addCompare(product: Product) {
    if (!this.compareProducts.has(product.id)) {
      this.compareProducts.set(product.id, product);
    }
  }
  deleteFromCompare(product: Product) {
    if (!this.compareProducts.has(product.id)) {
      this.compareProducts.delete(product.id);
    }
  }
  hasCompare(product: Product) {
    if (this.compareProducts.has(product.id)) {
      return true;
    }
    return false;
  }
}
