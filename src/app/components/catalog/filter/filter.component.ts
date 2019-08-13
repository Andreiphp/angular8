import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {
  public priceFrom = 0;
  public priceTo = 200;
  public brands;
  public filterstate = {};
  public start = 0;
  public end = 200;
  public step = 20;
  public widht;
  public flafMoovLeft = false;
  public leftStep = 0;
  public rigthStep = 100;
  private road: string;
  private arraySteps: Array<number> = [];
  private fixPosition: number = 0;
  constructor(private proSrv: ProductsService) { }
  @ViewChild('rangeS', { static: false }) rangeS;
  ngOnInit() {
    this.proSrv.getAllBrandsByFilter().subscribe((data) => {
      this.brands = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    setTimeout(() => {
      this.getCoord();
      this.setSteps();
    });
  }
  getCoord() {
    this.widht = this.rangeS.nativeElement.getBoundingClientRect();
  }
  filterSet($event, brand): void {
    if (this.filterstate.hasOwnProperty(brand.title)) {
      delete this.filterstate[brand.title];
    } else {
      this.filterstate[brand.title] = brand.title;
    }
  }

  mooveLeftEnter($event) {
    $event.preventDefault();
    this.fixPosition = $event.pageX;
    const id = $event.target.id;
    if (id === 'rLeft' || id === 'rRight') {
      if (id === 'rLeft') {
        this.road = 'left';
      }
      if (id === 'rRight') {
        this.road = 'right';
      }
      this.flafMoovLeft = true;
    } else {
      this.flafMoovLeft = false;
    }
  }
  mooveMoovLeft($event): void {
    if (this.flafMoovLeft) {
      let moovment = '';
      const offSet = Math.round($event.pageX - this.widht.left);
      const p = (offSet / this.widht.width) * 100;
      if ($event.pageX > this.fixPosition) {
        moovment = 'right';
      } else {
        moovment = 'left';
      }
      if (this.road === 'left') {
        this.leftMoov(p, $event, moovment);
      } else {
        this.rightMoov(p, $event, moovment);
      }

    }
  }
  leftMoov(p: number, $event, moovment: string) {
    if (this.leftStep + 2 >= this.rigthStep) {
      if (moovment === 'right') {
        return;
      }
      if (moovment === 'left') {
        this.leftStep = p;
      }
    } else {
      this.leftStep = p;
    }
    this.fixPosition = $event.pageX;
    this.setPrice(this.leftStep, 'left');
  }
  rightMoov(p: number, $event, moovment: string) {
    if (this.rigthStep - 2 <= this.leftStep ) {
      if (moovment === 'left') {
        return;
      }
      if (moovment === 'right') {
        this.rigthStep = p;
      }
    } else {
      this.rigthStep = p;
    }
    this.fixPosition = $event.pageX;
    this.setPrice(this.rigthStep, 'right');
  }

  moovleftUp($event) {
    if (this.road === 'left') {
      const minus = (200 / 100) * this.leftStep;
      let firstValue = Math.abs(this.arraySteps[0] - minus);
      let endValue;
      this.arraySteps.forEach((a, b) => {
        if (firstValue > Math.abs(a - minus)) {
          firstValue = Math.abs(a - minus);
          endValue = a;
        }
      });
      endValue = endValue ? endValue : 0;
      if (endValue === 200) {
        endValue = 190;
        this.priceFrom = 190;
      }
      this.leftStep = endValue / this.end * 100;
    } else {
      const minus = (200 / 100) * this.rigthStep;
      let firstValue = Math.abs(this.arraySteps[0] - minus);
      let endValue;
      this.arraySteps.forEach((a, b) => {
        if (firstValue > Math.abs(a - minus)) {
          firstValue = Math.abs(a - minus);
          endValue = a;
        }
      });
      endValue = endValue ? endValue : 0;
      if (endValue === 200) {
        endValue = 200;
        this.priceTo = 200;
      }
      this.rigthStep = endValue / this.end * 100;
    }
    this.flafMoovLeft = false;
  }
  mouseoutLeft() {
    this.flafMoovLeft = false;
  }

  setSteps() {
    const fin = Math.round(this.end / this.step);
    let sum = 0;
    for (let i = 1; i <= this.step; i++) {
      this.arraySteps.push(sum += fin);
    }
    this.arraySteps.unshift(0);
  }
  setPrice(range, position) {
    const minusLeft = (200 / 100) * this.leftStep;
    const minusRight = (200 / 100) * this.rigthStep;
    let fixLeft = Math.abs(this.arraySteps[0] - minusLeft);
    let fixRight = Math.abs(this.arraySteps[0] - minusRight);
    let ydf;
    const r = this.arraySteps.forEach((a, b) => {
      if (position === 'left') {
        if (fixLeft > Math.abs(a - minusLeft)) {
          fixLeft = Math.abs(a - minusLeft);
          ydf = a;
        }
      } else {
        if (fixRight > Math.abs(a - minusRight)) {
          fixRight = Math.abs(a - minusRight);
          ydf = a;
        }
      }
    });

    if (position === 'left') {
      this.priceFrom = ydf ? ydf : this.arraySteps[0];
    } else {
      this.priceTo = ydf ? ydf : this.arraySteps[0];
    }
  }

}
