
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  response: string;

  transform(value: string = '') {

    return value.replace(/(\d{5})(\d{3})/, "$1-$2");

  }

}
