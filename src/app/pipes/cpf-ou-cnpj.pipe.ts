
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfOuCnpj'
})
export class CpfOuCnpjPipe implements PipeTransform {

  response: string;

  transform(value: string = '') {
    
    if(value.length == 11) {
      this.response = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }

    if(value.length == 14) {
      this.response = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")
    }

    return this.response;
    
  }

}
