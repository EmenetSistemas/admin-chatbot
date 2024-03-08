import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevPdfComponent } from './prev-pdf.component';

describe('PrevPdfComponent', () => {
  let component: PrevPdfComponent;
  let fixture: ComponentFixture<PrevPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrevPdfComponent]
    });
    fixture = TestBed.createComponent(PrevPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
