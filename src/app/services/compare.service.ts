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
      if (this.compareProducts.size >= 4) {
        this.changeProduct(product);
      } else {
        this.compareProducts.set(product.id, product);
      }
    }
  }
  changeProduct(product: Product) {
    const compareProductsT = Array.from(this.compareProducts);
    const delProd = compareProductsT[0];
    this.compareProducts.delete(delProd[0]);
    this.compareProducts.set(product.id, product);
  }
  deleteFromCompare(product: Product) {
    if (this.compareProducts.has(product.id)) {
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
