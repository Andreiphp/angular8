import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit, OnDestroy {
  public priceFrom = 0;
  public priceTo = 200;
  public brands;
  public filterstate = new Set();
  public end = 200;
  public step = 20;
  public flafMoovLeft = false;
  public leftStep = 0;
  public rigthStep = 100;
  positionRangeLeft = 0;
  positionRangeWidth = 100;
  private road: string;
  private arraySteps: Array<number> = [];
  private fixPosition = 0;
  private differenceL = 0;
  private differenceR = 0;
  private _unsubscribe = new Subject();
  @Output() emitfilter: EventEmitter<any> = new EventEmitter<any>();
  get infoCoordinate() {
    return this.rangeS.nativeElement.getBoundingClientRect();
  }
  get disableFilter() {
    if (this.filterstate.size || this.priceFrom !== 0 || this.priceTo !== 200) {
      return false;
    } else {
      return true;
    }
  }
  constructor(private prodSrv: ProductsService) { }
  @ViewChild('rangeS', { static: false }) rangeS;
  @ViewChild('form', { static: false }) form;
  ngOnInit() {
    this.prodSrv.getAllBrandsByFilter().pipe(takeUntil(this._unsubscribe)).subscribe((data) => {
      this.brands = data;
    }, (error) => {
      console.log(error);
    });
    this.prodSrv.clearSearch.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
      this.clear();
    });
    setTimeout(() => {
      this.setSteps();
    });
  }
  filterSet($event, brand): void {
    if (this.filterstate.has(brand.title)) {
      this.filterstate.delete(brand.title);
    } else {
      this.filterstate.add(brand.title);
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
      const offSet = Math.round($event.pageX - this.infoCoordinate.left);
      const offsetRigth = Math.round(this.infoCoordinate.right - $event.pageX);
      const pR = (offsetRigth / this.infoCoordinate.width) * 100;
      const p = (offSet / this.infoCoordinate.width) * 100;
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

  setRangeWidth(): void {
    this.positionRangeLeft = this.leftStep;
    this.positionRangeWidth = 100 - (this.leftStep + (100 - this.rigthStep));
  }
  leftMoov(p: number, $event, moovment: string): void {
    const position = Math.round(p);
    if (position + 10 < this.rigthStep) {
      this.arraySteps.forEach((a, b) => {
        if (moovment === 'right') {
          if (position + 2 === a) {
            this.leftStep = a;
            this.setRangeWidth();
          }
        }
        if (moovment === 'left') {
          if (position - 2 === a) {
            this.leftStep = a;
            this.setRangeWidth();
          }
        }
      });
    }
    this.fixPosition = $event.pageX;
    this.setPrice(this.leftStep, 'left');
  }
  rightMoov(p: number, $event, moovment: string): void {
    const position = Math.round(p);
    if (position - 10 > this.leftStep) {
      this.arraySteps.forEach((a, b) => {
        if (moovment === 'right') {
          if (position + 2 === a) {
            this.rigthStep = a;
            this.setRangeWidth();
          }
        }
        if (moovment === 'left') {
          if (position - 2 === a) {
            this.rigthStep = a;
            this.setRangeWidth();
          }
        }
      });
    }
    this.fixPosition = $event.pageX;
    this.setPrice(this.rigthStep, 'right');
  }

  moovleftUp($event): void {
    this.flafMoovLeft = false;
  }
  mouseoutLeft(): void {
    this.flafMoovLeft = false;
  }

  setSteps(): void {
    const fin = Math.round(this.end / this.step);
    let sum = 0;
    for (let i = 1; i <= this.step; i++) {
      this.arraySteps.push(sum += fin);
    }
    this.arraySteps.unshift(0);
  }
  setPrice(range, position): void {
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
  startFilter() {
    if (this.filterstate.size || this.priceFrom !== 0 || this.priceTo !== 200) {
      this.emitfilter.emit({
        brand: this.filterstate,
        priseto: this.priceTo,
        priceFrom: this.priceFrom
      });
    }
  }
  clear() {
    if (this.form) {
      this.form.nativeElement.reset();
    }
    this.filterstate.clear();
    this.priceFrom = 0;
    this.priceTo = 200;
  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}
