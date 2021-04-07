import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): any{
    return this.http.get('assets/dados/estadosbr.json');

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
