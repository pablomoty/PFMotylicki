import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectEsAdmin } from 'src/app/store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  return inject(Store).select(selectEsAdmin).pipe(

    map((isAdmin) => {

      if (!isAdmin) {
        return router.createUrlTree(['/dashboard/home'])
      }

      return true;
    })
  )
};
