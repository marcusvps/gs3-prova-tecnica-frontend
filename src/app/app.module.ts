import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './components/cliente/list/list.component';
import {LocalStorageService} from './service/local-storage.service';
import { NovoComponent } from './components/cliente/novo/novo.component';
import { VisualizarComponent } from './components/cliente/visualizar/visualizar.component';
import {NgxMaskModule} from 'ngx-mask';
import { AlterarComponent } from './components/cliente/alterar/alterar.component';
import {ListHistoricoComponent} from './components/historico/list/list-historico.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    NovoComponent,
    VisualizarComponent,
    AlterarComponent,
    ListHistoricoComponent
  ],
    imports: [

        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),


    ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
