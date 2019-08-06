import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {
  public brands;
  public filterstate = {};
  public start = 0;
  public end = 200;
  public step = 20;
  public widht;
  public flafMoovLeft = false;
  public leftStep = 0;
  private road;
  private arraySteps: Array<number> = [];
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

  mooveLeftEnter() {
    this.flafMoovLeft = true;
  }
  mooveMoovLeft($event) {
    if (this.flafMoovLeft) {
      console.log($event.pageX + '-' + this.widht.left);
      const offSet = Math.round($event.pageX - this.widht.left);
      const p = ( offSet / this.widht.width ) * 100;
      this.leftStep = p;
      this.arraySteps.forEach(el => {
        if (this.leftStep + 2 >= el) {
          this.leftStep = el;
        }
      });
      console.log(p);
    //  console.log($event.pageX);
    }
  }

  moovleftUp($event) {
    this.flafMoovLeft = false;
  }
  moovOverLeft($event) {
   // this.flafMoovLeft = false;
  }
  setSteps() {
    const fin = Math.round(100 / this.step);
    let sum = 0;
    for (let i = 1; i <= this.step; i++) {
      this.arraySteps.push(sum += fin);
    }
  }

}
