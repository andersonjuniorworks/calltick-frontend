import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneOuCelular'
})
export class TelefoneOuCelularPipe implements PipeTransform {

  transform(value) {
    if(value.length == 10) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    if(value.length == 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  }

}
