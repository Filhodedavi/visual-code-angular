import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

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

    console.log('AuthGuard')
    return this.verificarAcesso();

  }

  private verificarAcesso(){

    if(this.authService.usuarioEstaAutenticado()){
      return true;
    }
    this.router.navigate(['/login']);

    return false; 
  }


    canLoad(route: Route): Observable<boolean> |Promise<boolean>|boolean {
      console.log('canLoad: verificando se usuário pode acessar');
      return this.verificarAcesso();
    }
  }