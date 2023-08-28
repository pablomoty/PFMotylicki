import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public emailControl = new FormControl('juanperez@gmail.com', [Validators.required, Validators.email]);
  public apellidoControl = new FormControl('Perez', [Validators.required]);

  public loginForm = new FormGroup({
    email: this.emailControl,
    apellido: this.apellidoControl,
  });

  constructor(private authService: AuthService) {}

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
  
      this.authService.login(this.loginForm.getRawValue())
    }

    
  }
}

