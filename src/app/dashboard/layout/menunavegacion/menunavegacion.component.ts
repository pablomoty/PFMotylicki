import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { selectEsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-menunavegacion',
  templateUrl: './menunavegacion.component.html',
  styleUrls: ['./menunavegacion.component.scss']
})
export class MenunavegacionComponent {

 public selectEsAdmin$: Observable<boolean>;

  constructor(private router: Router, private store: Store, private authService: AuthService){          
    this.selectEsAdmin$ = this.store.select(selectEsAdmin);
  }

  desloguear(): void {
    this.authService.logout();
    this.router.navigate(['auth'], {})
  }
}
