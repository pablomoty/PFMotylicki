import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MenunavegacionComponent } from './layout/menunavegacion/menunavegacion.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { HomeModule } from './pages/home/home.module';
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CursosModule } from './pages/cursos/cursos.module';




@NgModule({
  declarations: [
    DashboardComponent,
    MenunavegacionComponent,
    ToolbarComponent,
    
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    AlumnosModule,
    HomeModule,
    MatListModule,
    RouterModule,
    DashboardRoutingModule,
    CursosModule
    
    

  ],exports: [
    DashboardComponent
    
  ]
})
export class DashboardModule { }
