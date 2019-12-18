import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { EmprestimosComponent } from './emprestimos/emprestimos.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { EditarComponent } from './editar/editar.component';
import { NovoEquipamentoComponent } from './novo-equipamento/novo-equipamento.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'emprestimos', component: EmprestimosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'equipamentos', component: EquipamentosComponent },
  { path: 'editar/:equipamento_id', component: EditarComponent},
  { path: 'novo-equipamento', component: NovoEquipamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
