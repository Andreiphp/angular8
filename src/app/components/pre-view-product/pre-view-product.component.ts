import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pre-view-product',
  templateUrl: './pre-view-product.component.html',
  styleUrls: ['./pre-view-product.component.sass']
})
export class PreViewProductComponent implements OnInit {
  @Input() product;

  constructor() { }

  ngOnInit() {
  }

}
