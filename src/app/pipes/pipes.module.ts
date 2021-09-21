import { MaskKeyPipe } from './mask-key.pipe';
import { CepPipe } from './cep.pipe';
import { TelefoneOuCelularPipe } from './telefone-ou-celular.pipe';
import { CpfOuCnpjPipe } from 'src/app/pipes/cpf-ou-cnpj.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [CpfOuCnpjPipe, TelefoneOuCelularPipe, CepPipe, MaskKeyPipe],
  declarations: [CpfOuCnpjPipe, TelefoneOuCelularPipe, CepPipe, MaskKeyPipe]
})
export class PipesModule { }
