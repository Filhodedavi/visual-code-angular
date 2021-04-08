import { BasedFormComponent } from './../shared/based-form/based-form.component';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/form-validations';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BasedFormComponent implements OnInit {

  // formulario!: FormGroup | any;
  estados!: EstadoBr[];
  cidades!: Cidade[];
  // estados!: Observable<EstadoBr[]>;
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];
  frameworks!: ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService,
  ) {
    super();
  }

  ngOnInit(): void {

    // this.verificaEmailService.verificaEmail('email@email.com').subscribe();
    // this.estados = this.dropdownService.getEstadosBr();
    this.dropdownService.getEstadosBr()
      .subscribe((dados: EstadoBr[]) => this.estados = dados);

    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();

    /*this.dropdownService.getEstadosBr()
      .subscribe(dados => {this.estados = dados; console.log(dados);});*/

    this.formulario = this.formBuilder.group({
      // coloque um array para o caso de precisar de mais de uma validação diferente
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    // é possivel escutar os valores atraves do statusChanges ou valueChanges

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        ((value: any) => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value) : EMPTY
        )
      )
      .subscribe((dados: any) => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map((estados: any) => estados && estados.length > 0 ? estados[0].id : EMPTY),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
        )
      .subscribe((cidades: any) => this.cidades = cidades);
    // this.dropdownService.getCidades(8).subscribe(console.log);


  }


  buildFrameworks(): any {

    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }
  /*
  this.formBuilder.array ([
    new FormControl(false),
    new FormControl(false),
    new FormControl(false),
    new FormControl(false)
  ])*/

  // criar uma validacao e atraves de uma funcao direta do componente, mas pode criar sua propria API

  submit(): any {

    console.log(this.formulario.value);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    console.log(valueSubmit);

    this.http
    .post('https://httpbin.org/post', JSON.stringify({}))
      // tslint:disable-next-line: deprecation
      .subscribe((dados: any) => {
        console.log(dados);
        // reseta o form
        // this.resetar();
      },
        (error: any) => alert('erro')
      );

  }

  consultaCEP(): any {
    const cep = this.formulario.get('endereco.cep').value;
    // Nova variável "cep" somente com dígitos.
    // cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe((dados: any) => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any): any {
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

  resetaDadosForm(): any {
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

  setarCargo(): any {
    const cargo = { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: { nome: any; nivel: any; }, obj2: { nome: any; nivel: any; }): any {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 && obj2;
  }

  setarTecnologias(): any {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }

  validarEmail(formControl: FormControl): any {
    return this.verificaEmailService.verificaEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

  getFrameworksControls(): any {
    return this.formulario.get('frameworks') ? (this.formulario.get('frameworks') as FormArray).controls : null;
  }
}
