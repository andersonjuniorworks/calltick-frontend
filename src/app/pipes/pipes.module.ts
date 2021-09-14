import { TelefoneOuCelularPipe } from './telefone-ou-celular.pipe';
import { CpfOuCnpjPipe } from 'src/app/pipes/cpf-ou-cnpj.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [CpfOuCnpjPipe, TelefoneOuCelularPipe],
  declarations: [CpfOuCnpjPipe, TelefoneOuCelularPipe]
})
export class PipesModule { }
