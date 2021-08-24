import { IFormCanDeactivate } from './iform-candeactivate';
import { AlunoFormComponent } from './../alunos/aluno-form/aluno-form.component';
    import { Injectable } from '@angular/core';
    import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
    import { Observable } from 'rxjs';
    
    @Injectable({providedIn: 'root'})
    export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
        canDeactivate(
            component: IFormCanDeactivate,
            route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {

            console.log('guarda de desativaçâo')

            // return component.podeMudarRota();
            return component.podeDesativar();
        }
    }