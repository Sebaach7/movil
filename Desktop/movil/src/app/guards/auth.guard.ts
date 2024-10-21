import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';  // Asegúrate de la ruta correcta

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login']);  // Redirigir si no está autenticado
          return false;
        }
        return true;
      })
    );
  }
}