import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-list',
  templateUrl: './app-preview-list.component.html',
  styleUrls: ['./app-preview-list.component.sass']
})
export class AppPreviewListComponent implements OnInit {

  @Input() product;
  constructor() { }

  ngOnInit() {
  }

}
