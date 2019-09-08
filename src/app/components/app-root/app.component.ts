import { Component, OnDestroy, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MainServices } from '../../services/main.service';
import { RouterOutlet } from '@angular/router';
import { fader } from '../../animations/route-animations';
import { ProductsService } from 'src/app/services/products.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interfaces';
import { PreviewProdBlockComponent } from '../preview-prod-block/preview-prod-block.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [fader]
})
export class AppComponent implements OnDestroy {
  @ViewChild('previewProduct', { static: false, read: ViewContainerRef }) previewProduct: ViewContainerRef;
  public title = 'Супер - магазин спортивного питания';
  private _unsubscribe = new Subject<any>();
  constructor(
    private _mainSrv: MainServices,
    private _prodSrv: ProductsService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    window.onresize = () => {
      this._mainSrv.subOnResize.next();
    };
    window.onload = () => {
      this._mainSrv.subOnload.next();
    };
    this._prodSrv.emitPreviewProductBlock
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((product: Product) => {
        this.initPreviewProduct(product);
      });
    this._prodSrv.emitclearPreview
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this.previewProduct.clear();
      });
  }
  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  initPreviewProduct(product: Product): void {
    this.previewProduct.clear();
    const previewComponent = this.componentFactoryResolver.resolveComponentFactory(PreviewProdBlockComponent);
    const previewComponentRef = this.previewProduct.createComponent(previewComponent);
    previewComponentRef.instance.product = product;
  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
