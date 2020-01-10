import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.scss']
})
export class MovimentacoesComponent implements OnInit {
  public setores;
  public movimentacao = {
    setor_origem: '',
    setor_destino: '',
    observacao: ''
  }
  constructor(public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getSetores().subscribe(res => {
      this.setores = res
    }, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error'));
  }
}
