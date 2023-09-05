import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioalumnosComponent } from './formularioalumnos.component';

describe('FormularioalumnosComponent', () => {
  let component: FormularioalumnosComponent;
  let fixture: ComponentFixture<FormularioalumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioalumnosComponent]
    });
    fixture = TestBed.createComponent(FormularioalumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
