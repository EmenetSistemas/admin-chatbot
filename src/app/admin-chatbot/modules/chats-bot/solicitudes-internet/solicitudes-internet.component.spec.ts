import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesInternetComponent } from './solicitudes-internet.component';

describe('SolicitudesInternetComponent', () => {
  let component: SolicitudesInternetComponent;
  let fixture: ComponentFixture<SolicitudesInternetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesInternetComponent]
    });
    fixture = TestBed.createComponent(SolicitudesInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
