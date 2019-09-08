import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProdBlockComponent } from './preview-prod-block.component';

describe('PreviewProdBlockComponent', () => {
  let component: PreviewProdBlockComponent;
  let fixture: ComponentFixture<PreviewProdBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewProdBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewProdBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
