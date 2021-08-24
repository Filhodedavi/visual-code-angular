import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AlunosGuard implements CanActivateChild {
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state:  RouterStateSnapshot
    ): Observable<boolean>|boolean {

        // console.log(route);
        // console.log(state);

        console.log('AlunosGuard: Guarda de rotas filhas');

        if (state.url.includes('editar')){
            // alert('Usuario sem acesso');
           // return Observable.of(false);
        }
        
        return true; 
     }
}