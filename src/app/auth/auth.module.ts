import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';




@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    
    

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    SharedModule,
    AuthRoutingModule
    
  ],exports: [
    AuthComponent
  ]
})
export class AuthModule { }
