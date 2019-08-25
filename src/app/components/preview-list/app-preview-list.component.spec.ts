import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPreviewListComponent } from './app-preview-list.component';

describe('AppPreviewListComponent', () => {
  let component: AppPreviewListComponent;
  let fixture: ComponentFixture<AppPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPreviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
