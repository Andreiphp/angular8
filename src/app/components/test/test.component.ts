import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {
  form: FormGroup;
  arrafr:any;
  keys: any;
  constructor() {
    
   }

  ngOnInit() {
    this.arrafr = [
      {Email:'wwwww', ISN_A:0, EXPR: 0},
      {Email:'wert', ISN_A:0, EXPR: 0},
      {Email:'wewewe', ISN_A:0, EXPR: 0}
    ];
    this.form = new FormGroup(this.createGroup());
    this.keys = Object.keys(this.form);
    console.log(this.form);

  }

  createGroup() {
    let group = {};
    let g = this.arrafr;
    g.forEach((element, index) => {
      group[index] = new FormGroup(this.creatControl(element));
    });

    return group;
  }
  creatControl(element){
    let control = {};
    control['email'] = new FormControl(element.Email);
    control['ck'] = new FormControl(element.Email);
    control['expr'] = new FormControl(element.Email);
    return control;
  }

}
