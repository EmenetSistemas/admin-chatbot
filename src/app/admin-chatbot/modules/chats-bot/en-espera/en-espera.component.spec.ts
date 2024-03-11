import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnEsperaComponent } from './en-espera.component';

describe('EnEsperaComponent', () => {
  let component: EnEsperaComponent;
  let fixture: ComponentFixture<EnEsperaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnEsperaComponent]
    });
    fixture = TestBed.createComponent(EnEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
