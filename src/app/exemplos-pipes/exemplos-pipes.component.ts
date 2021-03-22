import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  constructor() { }

  livro: any = {
    titulo: 'learning javascript Data Structures and Algorithms',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2020, 5, 23),
    url: 'http://a.co/glqjpRP'
  };

  livros: string[] = ['Java', 'Angular 2'];

  filtro!: string;

  valorAsync = new Promise((resolve, rejects) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000);
  });
  // desse jeito nao funciona mais
  // valorAsync2 = Observable.interval(2000).map((valor: any) => 'Valor assíncrono 2');

  valorAsync2 = interval(2000).pipe(map(valor => 'Valor assíncrono 2'));

  addCurso(valor: string): any {
    this.livros.push(valor);
    console.log(this.livros);
  }

  // tslint:disable-next-line:typedef
  obterCursos(){

    if (this.livros.length === 0 || this.filtro === undefined
      || this.filtro?.trim() === ''){
    return this.livros;
      }

    return this.livros.filter((v) => {
        if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
        return false;
    });
  }

  ngOnInit(): void {
  }

}
