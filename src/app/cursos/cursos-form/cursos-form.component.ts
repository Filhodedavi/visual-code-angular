import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {

    /*this.route.params.subscribe(
      (params: any) => {
        const id = params.id;
        console.log(id);
        const curso$ = this.service.loadByID(id);
        curso$.subscribe((curso: any) => {
          registro = curso;
          this.updateForm(curso);
        });
      }
    );*/

    // quando fazemos subscribe no route.params, e o proprio angular responsavel pela inscricao nao sendo necessario um unsubscribe

    /*this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap(id => this.service.loadByID(id))
      )
      .subscribe(curso => this.updateForm(curso));*/

    const curso = this.route.snapshot.data.curso;

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  /*updateForm(curso: any): any {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }*/

  hasError(field: string): any {
    return this.form.get(field)?.errors;
  }

  onSubmit(): any {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com successo!';
      let msgError = 'Erro ao criar curso, tente novamente';

      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com successo!';
        msgError = 'Erro ao atualizar curso, tente novamente';
      }

      this.service.save(this.form.value)
        .subscribe(
          ( success: any) => {
            this.modal.showAlertSuccess('Curso atualizado com successo!');
            this.location.back();
          },
          ( error: any) => this.modal.showAlertDanger('Erro ao atualizar o curso, tente novamente')
        );


     /* if (this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          (success: any) => {
            this.modal.showAlertSuccess('Curso atualizado com successo!');
            this.location.back();
          },
          (error: any) => this.modal.showAlertDanger('Erro ao atualizar o curso, tente novamente'),
          () => console.log('update completo')
        );
      } else {
        this.service.create(this.form.value).subscribe(
          (success: any) => {
            this.modal.showAlertSuccess('Curso criado com successo!');
            this.location.back();
          },
          (error: any) => this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
          () => console.log('request completo')
        );
      }*/
    }
  }

  onCancel(): any {
    this.submitted = false;
    this.form.reset();
  }

}
