import { getTestBed } from '@angular/core/testing';
import { FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-based-form',
  template: '<div></div>'
})
export abstract class BasedFormComponent implements OnInit {

  formulario!: FormGroup | any;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): any;

  onSubmit(): any{
    if (this.formulario.valid){
      this.onSubmit();
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray): any {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar(): any {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): any {
    return (!this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  verificaRequired(campo: string): any {
    return (
      this.formulario.get(campo)?.hasError('required') && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  verificaEmailInvalido(): any {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors.email && campoEmail?.touched;
    }
  }
  aplicaCssErro(campo: string): any {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  getCampo(campo: string): any {
    return this.formulario.get(campo);
  }

}
