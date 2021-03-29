import { AlunoFormComponent } from './../alunos/aluno-form/aluno-form.component';
    import { Injectable } from '@angular/core';
    import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
    import { Observable } from 'rxjs';
    
    @Injectable({providedIn: 'root'})
    export class AlunosDeactivateGuard implements CanDeactivate<AlunoFormComponent> {
        canDeactivate(
            component: AlunoFormComponent,
            route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {
            return true;
        }
    }
}