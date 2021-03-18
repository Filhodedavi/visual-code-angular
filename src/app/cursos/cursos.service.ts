import { LogService } from './../shared/log.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CursosService {

    constructor(private logService: LogService){
        console.log('CursosService');
    }

    static criouNovoCurso = new EventEmitter <string> ();

    emitirCursoCriado = new EventEmitter <string> ();

    private cursos: string[] = ['Angular 2', 'Java', 'GitHub'];

    getCursos(): any {
        this.logService.consoleLog('Obtendo lista de cursos');
        return this.cursos;
    }

    addCurso(curso: string): any{
        // substituir aspas por crase pra nao concatenar variaveis e ai coloca $ {} pra colocar strings sem muito codigo
        this.logService.consoleLog(`Criando um novo curso ${curso}`);
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }
}
