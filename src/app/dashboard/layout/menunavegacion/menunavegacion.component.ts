import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menunavegacion',
  templateUrl: './menunavegacion.component.html',
  styleUrls: ['./menunavegacion.component.scss']
})
export class MenunavegacionComponent {
  
  constructor(private router: Router,) {}

  desloguear(): void {
    this.router.navigate(['auth'], {})
}
}
