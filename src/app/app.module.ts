import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; // Módulo da dependência de paginação
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Módulo do PIPE de pesquisa

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { EmprestimosComponent } from './emprestimos/emprestimos.component';
import { FooterComponent } from './footer/footer.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { EditarComponent } from './editar/editar.component';
import { NovoEquipamentoComponent } from './novo-equipamento/novo-equipamento.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RelatoriosComponent,
    EmprestimosComponent,
    FooterComponent,
    EquipamentosComponent,
    EditarComponent,
    NovoEquipamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
