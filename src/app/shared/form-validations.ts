import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1): any {
    const validator = (formArray: FormArray) => {
      /*const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < ValueTransformer.length; i++){
        if (values[i].value) {
          totalChecked += 1;
        }
      }*/
      // essa anotacao acima faz a mesma funcao que o codigo abaixo
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl): any{
    const cep = control.value;
    if (cep && cep !== ''){
      const validacep = /^[0-9] {8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equalsTo(otherfield: string): any{
    const validator = (formControl: FormControl) => {

      if (otherfield == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(formControl.root as FormGroup).controls){
        return null;
      }

      const field = (formControl.root as FormGroup).get(otherfield);

      if (!field){
        throw new Error('É necessário informar um campo valido.');
      }

      if (field.value !== formControl.value){
        return { equalsTo : otherfield};
      }

      return null;

    };
    return validator;
  }

}
