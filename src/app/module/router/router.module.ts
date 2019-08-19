import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { ViewProductComponent } from '../../components/view-product/view-product.component';
import { MainComponent } from '../../components/main/main.component';
import { AdminComponent } from '../../components/admin/admin.component';
import { AdminNewProductComponent } from '../../components/admin/admin-new-product/admin-new-product.component';
import { AdminRedactProdComponent } from '../../components/admin/admin-redact-prod/admin-redact-prod.component';
import { AuthGuard } from '../../guards/auth.guard';
import { LoginComponent } from '../../components/login/login.component';
import { TestComponent } from '../../components/test/test.component';
import {SearchComponent} from '../../components/catalog/search/search.component';
import {CatalogViewComponent} from '../../components/catalog/catalog-view/catalog-view.component';
const childrenRouter: Routes = [
    { path: 'newproduct', component: AdminNewProductComponent },
    { path: 'redactproduct', component: AdminRedactProdComponent }
];
const catalogChildren: Routes = [
  { path: 'search/', component: SearchComponent, data: { animation: 'catalogAnimate' }},
    { path: 'view/:category/:page', component: CatalogViewComponent, data: { animation: 'catalogAnimate' }},
];

const routes: Routes = [
    { path: '', component: MainComponent },
    {
        path: 'catalog', component: CatalogComponent,
        children: catalogChildren,
        data: { animation: 'catalogAnimate' },
    },
    { path: 'view-product', component: ViewProductComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: childrenRouter },
    { path: 'test', component: TestComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];




@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    providers: [AuthGuard],
    exports: [
        RouterModule
    ]

})
export class AppRouterModule {
}











