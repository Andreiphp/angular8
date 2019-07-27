import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreViewProductComponent } from './pre-view-product.component';

describe('PreViewProductComponent', () => {
  let component: PreViewProductComponent;
  let fixture: ComponentFixture<PreViewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreViewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
