import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
// metodo
  canActivate(
    route: ActivatedRouteSnapshot,
    // rota em si
    state: RouterStateSnapshot,
    // o estado da rota
  ) : Observable<boolean> | boolean{
    // logica

    if(this.authService.usuarioEstaAutenticado()){
      return true;
    }
    this.router.navigate(['/login']);

    return false;
  }
}