import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestProductSliderComponent } from './latest-product-slider.component';

describe('LatestProductSliderComponent', () => {
  let component: LatestProductSliderComponent;
  let fixture: ComponentFixture<LatestProductSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestProductSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
