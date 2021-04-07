import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
 // estados!: EstadoBr[];
  estados!: Observable<EstadoBr[]>;
  cargos!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();

    /*this.dropdownService.getEstadosBr()
      .subscribe(dados => {this.estados = dados; console.log(dados);});*/


    this.formulario = this.formBuilder.group({
      // coloque um array para o caso de precisar de mais de uma validação diferente
      nome: [null, Validators.required], // [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null]
    })
  }
  onSubmit() {
    console.log(this.formulario.value);

    if (this.formulario.valid) {

      this.http.post('https://httpbin.org/post',
        JSON.stringify(this.formulario.value))
        .subscribe((dados: any) => {
          console.log(dados);
          // reseta o form
          // this.resetar();
        },
          (error: any) => alert('erro')
        );
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }

resetar() {
  this.formulario.reset();
}

verificaValidTouched(campo: string) {
  return (!this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  );
}

verificaEmailInvalido() {
  const campoEmail = this.formulario.get('email');
  if (campoEmail.errors) {
    return campoEmail.errors['email'] && campoEmail?.touched;
  }
}

aplicaCssErro(campo: string) {
  return {
    'has-error': this.verificaValidTouched(campo),
    'has-feedback': this.verificaValidTouched(campo)
  };
}
consultaCEP() {
  const cep = this.formulario.get('endereco.cep').value;
  // Nova variável "cep" somente com dígitos.
  // cep = cep.replace(/\D/g, '');

  if (cep != null && cep !== '') {
    this.cepService.consultaCEP(cep)
      .subscribe((dados: any) => this.populaDadosForm(dados));
  }
}

populaDadosForm(dados: any) {
  this.formulario.patchValue({
    endereco: {
      rua: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    }
  });
  // this.formulario.get('nome')?.setValue('Loiane');
}

resetaDadosForm() {
  this.formulario.patchValue({
    endereco: {
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null
    }
  });
}

  setarCargo(){
    const cargo = { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 && obj2;
  }
}
