import { Component } from '@angular/core';
import { MainServices } from '../../services/main.service';
import { RouterOutlet } from '@angular/router';
import {fader} from '../../animations/route-animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [fader]
})
export class AppComponent {
  title = 'app';
  constructor(private _mainSrv: MainServices) {
    window.onresize = () => {
      this._mainSrv.subOnResize.next();
    };
    window.onload = () => {
      this._mainSrv.subOnload.next();
    };
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
