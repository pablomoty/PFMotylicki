import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioinscripcionesComponent } from './formularioinscripciones.component';

describe('FormularioinscripcionesComponent', () => {
  let component: FormularioinscripcionesComponent;
  let fixture: ComponentFixture<FormularioinscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioinscripcionesComponent]
    });
    fixture = TestBed.createComponent(FormularioinscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
