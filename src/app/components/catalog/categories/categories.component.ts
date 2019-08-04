import { Component, OnInit, Input } from '@angular/core';
import { RequestsService } from '../../../services/requests.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  public categories: Array<any> = [];
  @Input() categories_id: number;
  constructor(
    private reqSrv: RequestsService,
  ) { }

  ngOnInit() {
    this.reqSrv.get_categories().subscribe((data: Array<any>) => {
      if (data.length) {
        data.forEach(cat => {
          this.categories.push({
            id: cat.id,
            title: cat.title
          });
        });
      }
    });
  }

}
