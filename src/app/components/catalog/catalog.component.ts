import { Component, OnInit } from '@angular/core';
import { divTrigger } from './catalog-animations';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
  animations: [
    divTrigger
  ]
})
export class CatalogComponent implements OnInit {
  public isVisible = false;
  public products = [
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
  private _subscribe: Subject<any> = new Subject();
  constructor(
    private _router: ActivatedRoute,
  ) {
    this._router.params.subscribe(data => {
      console.log(data);
    });
   }

  ngOnInit() {

  }

}
