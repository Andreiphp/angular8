import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotegoriesComponent } from './categories.component';

describe('CotegoriesComponent', () => {
  let component: CotegoriesComponent;
  let fixture: ComponentFixture<CotegoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotegoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotegoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
