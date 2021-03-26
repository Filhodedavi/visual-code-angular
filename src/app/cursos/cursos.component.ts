import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from './cursos.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: any[];
  paginas!: number;
  constructor(public CursosService: CursosService, 
    public route:ActivatedRoute, 
    public router: Router) { 
    this.cursos = CursosService.getCursos();
  }

  proximaPagina(){
    this.paginas++;
  }

  ngOnInit(): void {
  }

}