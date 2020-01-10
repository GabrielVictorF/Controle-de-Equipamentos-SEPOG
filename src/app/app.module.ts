import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; // Módulo da dependência de paginação
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Módulo do PIPE de pesquisa
import * as Sentry from "@sentry/browser"; //Sentry para captura de erros
import { ChartsModule } from 'ng2-charts'; // Geração de gráficos

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { FooterComponent } from './footer/footer.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { EditarComponent } from './editar/editar.component';
import { NovoEquipamentoComponent } from './novo-equipamento/novo-equipamento.component';
import { FunctionsService } from './functions.service';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';

Sentry.init({
  dsn: "https://e11bf940a0ff4e39b493d3f0a59ee0b7@sentry.io/1863399"
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor(public functions: FunctionsService) {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    //this.functions.showToast('Erro', 'erro', 'error');
    //Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RelatoriosComponent,
    FooterComponent,
    EquipamentosComponent,
    EditarComponent,
    NovoEquipamentoComponent,
    MovimentacoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
    ChartsModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
