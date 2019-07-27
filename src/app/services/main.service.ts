import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainServices {

  public subOnResize: Subject<any> = new Subject();
  public subOnload: Subject<any> = new Subject();
    constructor() {

    }



}
