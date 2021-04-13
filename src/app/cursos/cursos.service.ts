import { environment } from './../../environments/environment';
import { Curso } from './curso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  // quando fizer build de producao, no lugare de usar localhost porta 3000 apenas vai utilizar o / pra acessar

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(): any{
    return this.http.get<Curso[]>(this.API)
    // forma mais facil pra debugar usando pipe e tap
    .pipe(
      delay(2000),
     tap(console.log)
    );
  }

  loadByID(id: any): any {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso: any): any {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso: any): any {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: any): any {
    if (curso.id){
      return this.update(curso);
    }
    return this.create(curso);
  }
}
