import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CursosService {

    emitirCursoCriado = new EventEmitter <string> ();
    private cursos: string[] = ['Angular 2', 'Java', 'GitHub'];

    constructor(){
        console.log('CursosService');
    }

    getCursos(): any {
        return this.cursos;
    }

    addCurso(curso: string): any{
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
    }
}
