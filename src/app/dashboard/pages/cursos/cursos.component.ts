import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import { CursosActions } from './store/cursos.actions';
import { Cursos } from './models';
import { selectCursosArray } from './store/cursos.selectors';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

    cursos$: Observable<Cursos[]>;
  
    constructor(private store: Store) {
      this.cursos$ = this.store.select(selectCursosArray);
    }
  
    displayedColumns = ['id', 'nombre', 'acciones']
  
    ngOnInit(): void {
      this.store.dispatch(CursosActions.loadCursos())
    }
  

  
}
