import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component";
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from "../auth.service";

describe('LoginComponent', () => {

  let component: LoginComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
    })

    component = TestBed.createComponent(LoginComponent).componentInstance
  })

  it('Formulario invalido por falta de datos', () => {

    component.emailControl.setValue('');
    component.apellidoControl.setValue('');

    expect(component.loginForm.invalid).toBeTrue();
  })


  it('Llamado al markAllAsTouched por falta de datos en el login', () => {


    component.emailControl.setValue('');
    component.apellidoControl.setValue('');

    expect(component.loginForm.invalid).toBeTrue();


    const spyOfMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
    component.login()


    expect(spyOfMarkAllAsTouched).toHaveBeenCalled()}) 
  

  it('Formulario valido, llamado al login', () => {

    const authService = TestBed.inject(AuthService);

    component.emailControl.setValue('fake@mail.com');
    component.apellidoControl.setValue('123456');

    expect(component.loginForm.valid).toBeTrue();
    const spyOnAuthServiceLogin = spyOn(authService, 'login');
    component.login();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();

  });
})
