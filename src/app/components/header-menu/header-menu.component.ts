import { Component, OnInit, OnDestroy } from '@angular/core';
import { openBascket } from './animate';
import { MainServices } from '../../services/main.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CartServicesService } from 'src/app/services/cart-services.service';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.sass'],
    animations: [openBascket]
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
    flagOpenSinCart: boolean;
    flegSubCat: boolean;
    flagMainMenu: boolean;
    get cartProducts() {
        const cartProd = Array.from(this.cartSrv.basket);
        return cartProd;
    }
    get countProductsInCart() {
        const cartProd = Array.from(this.cartSrv.basket);
        return cartProd.reduce((prev, curent, arr) => {
            return prev += curent[1].count;
        }, 0);
    }
    private unSubscribe: Subject<any> = new Subject();

    constructor(
        private mainSrv: MainServices,
        private cartSrv: CartServicesService,
    ) {
        this.flagOpenSinCart = false;
        this.flegSubCat = false;
        this.flagMainMenu = false;
        if (window.innerWidth >= 990) {
            this.flagMainMenu = false;
        } else {
            this.flagMainMenu = true;
        }
        this.mainSrv.subOnResize.pipe(takeUntil(this.unSubscribe)).subscribe(() => {
            this.flegSubCat = false;
            if (window.innerWidth < 990) {
                this.flagMainMenu = true;
            }
            this.resize(event);
        });
    }
    getSummCart() {
      return this.cartSrv.getSummCart();
    }
    openSinCart() {
        this.flagOpenSinCart = !this.flagOpenSinCart;
    }
    deleteProdFCart(product) {
        this.cartSrv.deleteFromCart(product);
    }

    openMobileMenu(event) {
        if (event.target.id === 'm') {
            if (window.innerWidth <= 990) {
                this.flegSubCat = !this.flegSubCat;
            }
        }
    }
    showMainMenu() {
        this.flagMainMenu = !this.flagMainMenu;
        if (this.flagMainMenu) {
            this.flegSubCat = false;
        }
    }

    hideAllMenu() {
        this.flagMainMenu = true;
        this.flegSubCat = false;
    }
    public resize(event) {
        if (event.target.innerWidth >= 990) {
            this.flagMainMenu = false;
            this.flegSubCat = false;
        } else {
            this.flagMainMenu = true;
        }
    }

    ngOnInit() {
    }
    ngOnDestroy() {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }

}
