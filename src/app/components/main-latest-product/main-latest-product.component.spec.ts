import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLatestProductComponent } from './main-latest-product.component';

describe('MainLatestProductComponent', () => {
  let component: MainLatestProductComponent;
  let fixture: ComponentFixture<MainLatestProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLatestProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLatestProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
