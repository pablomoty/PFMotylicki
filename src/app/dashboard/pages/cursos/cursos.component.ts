import { Component, OnDestroy, OnInit } from '@angular/core';
import { Curso } from './models';
import { CursosService } from './cursos.service';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit, OnDestroy {

  public data$: Observable<Curso[]>;

  public displayedColumns = ['id', 'name', 'precio', 'actions'];

  public isAdmin$: Observable<boolean>;

  constructor(private cursosService: CursosService, private store: Store) {
    this.data$ = this.cursosService.getCursos();
    this.isAdmin$ = this.store.select(selectEsAdmin);
  }

  ngOnDestroy(): void {
   
  }

  ngOnInit(): void {

    this.cursosService.loadCursos();
  }

  onCreate(): void {
    this.cursosService.crear();
  }

  onDelete(id: number): void {
    this.cursosService.deleteById(id);
  }
}
