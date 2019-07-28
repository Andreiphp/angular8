import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';

@Component({
    selector: 'app-admin-new-product',
    templateUrl: './admin-new-product.component.html',
    styleUrls: ['./admin-new-product.component.sass']
})
export class AdminNewProductComponent implements OnInit {

    constructor(public request: RequestsService) {

    }

    ngOnInit() {
        this.request.checkToken().subscribe(result => {

        }, error1 => {
            //console.log(error1);
        });
    }

}
