import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import { LOCALE_ID, NgModule } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import { SettingsService } from './settings.service';
import br from '@angular/common/locales/pt';
registerLocaleData(br, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ /*{
    provide: LOCALE_ID,
    useValue: 'pt-BR',
  }*/
  SettingsService, {
    provide: LOCALE_ID,
    deps: [SettingsService],
    useFactory: (settingsService: { getLocale: () => any; }) => settingsService.getLocale()
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
