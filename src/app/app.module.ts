import { AuthGuardService } from './services/auth_guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt-PT';
registerLocaleData(pt);

import { en_US, NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NgZorroAntdModule } from './shared/nz-zorro.module';
import { WebSocketService } from './services/websocket.service';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgZorroAntdModule,
  ],

  providers: [
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'pt':
            return pt_BR;
          default:
            return pt_BR;
        }
      }, deps: [LOCALE_ID]
    },
    {provide: WebSocketService},
    {provide: AuthGuardService}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
