import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  user: any;
  titleLastP: string;
  messageLastP: string;
  constructor(public request: RequestsService) {
    this.titleLastP = 'New Trending Products';
    this.messageLastP = 'Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est';

   }

  getDataTest2() {
    console.log('click2');
  }
  ngOnInit() {
  }

}
