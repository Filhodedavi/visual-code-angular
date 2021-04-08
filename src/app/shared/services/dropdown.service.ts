import { Cidade } from './../models/cidade';
import { EstadoBr } from './../models/estado-br';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): any{
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');

  }

  getCidades(idEstado: number): any{
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      // tslint:disable-next-line: triple-equals
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );

  }

  getCargos(): any{
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'},
    ];
  }
  getTecnologias(): any{
    return [
      { nome: 'java', desc: 'Java'},
      { nome: 'javascript', desc: 'javascript'},
      { nome: 'php', desc: 'PHP'},
      { nome: 'ruby', desc: 'Ruby'}
    ];
  }

  getNewsletter(): any{
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'}
    ];
  }
}
