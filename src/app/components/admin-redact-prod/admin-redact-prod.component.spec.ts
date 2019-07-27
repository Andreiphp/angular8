import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRedactProdComponent } from './admin-redact-prod.component';

describe('AdminRedactProdComponent', () => {
  let component: AdminRedactProdComponent;
  let fixture: ComponentFixture<AdminRedactProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRedactProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRedactProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
