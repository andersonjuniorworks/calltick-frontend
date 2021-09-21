
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskKey'
})
export class MaskKeyPipe implements PipeTransform {

  response: string;

  transform(value: string = '') {

    return value.replace(/(\w{5})(\w{5})(\w{5})(\w{5})/, "$1-$2-$3-$4");

  }

}
