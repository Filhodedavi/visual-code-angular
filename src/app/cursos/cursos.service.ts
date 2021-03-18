import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CursosService {

    constructor(){
        console.log('CursosService');
    }

    static criouNovoCurso = new EventEmitter <string> ();

    emitirCursoCriado = new EventEmitter <string> ();

    private cursos: string[] = ['Angular 2', 'Java', 'GitHub'];

    getCursos(): any {
        return this.cursos;
    }

    addCurso(curso: string): any{
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }
}
