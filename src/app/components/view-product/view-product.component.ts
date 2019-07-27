import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../services/requests.service';

@Component({
    selector: 'app-view-product',
    templateUrl: './view-product.component.html',
    styleUrls: ['./view-product.component.sass']
})
export class ViewProductComponent implements OnInit {

    constructor(public request: RequestsService) {

    }

    ngOnInit() {
    }

}
