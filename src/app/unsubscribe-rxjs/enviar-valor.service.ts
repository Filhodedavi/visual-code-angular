import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  // instanciar um novo observable.

  private emissor$ = new Subject<string>();

  emitirValor(valor: string): any {
    this.emissor$.next(valor);
  }

  getValor(): any {
    return this.emissor$.asObservable();
  }

}
