import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app-root/app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AppRouterModule } from './module/router/router.module';
import { MainComponent } from './components/main/main.component';
import { RequestsService } from './services/requests.service';
import { JwtInterceptor } from './services/jwt-interseptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminRedactProdComponent } from './components/admin/admin-redact-prod/admin-redact-prod.component';
import { ErrorInterseptorService } from './services/error-interseptor.service';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ShowCartDirective } from './directives/show-cart.directive';
import { SliderComponent } from './components/slider/slider.component';
import { MainServices } from './services/main.service';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { MainLatestProductComponent } from './components/main-latest-product/main-latest-product.component';
import { TestComponent } from './components/test/test.component';
import { LatestProductSliderComponent } from './components/latest-product-slider/latest-product-slider.component';
import { PreViewProductComponent } from './components/pre-view-product/pre-view-product.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import {PaginationServices} from './services/pagination.services';
import {ProductsService} from './services/products.service';
@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ViewProductComponent,
    MainComponent,
    LoginComponent,
    AdminComponent,
    AdminNewProductComponent,
    AdminRedactProdComponent,
    HeaderMenuComponent,
    ShowCartDirective,
    SliderComponent,
    MainSectionComponent,
    MainLatestProductComponent,
    TestComponent,
    LatestProductSliderComponent,
    PreViewProductComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouterModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterseptorService, multi: true },
    RequestsService,
    MainServices,
    PaginationServices,
    ProductsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
