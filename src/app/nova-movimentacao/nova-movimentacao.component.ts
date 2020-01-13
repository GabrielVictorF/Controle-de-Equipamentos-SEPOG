import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-nova-movimentacao',
  templateUrl: './nova-movimentacao.component.html',
  styleUrls: ['./nova-movimentacao.component.scss']
})
export class NovaMovimentacaoComponent implements OnInit {
  public setores;
  public tipo_movimentacao;
  public movimentacao = {
    setor_origem: '',
    setor_destino: '',
    observacao: '',
    data_movimentacao: '',
    tipo_movimentacao: 0
  }
  constructor(public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getSetores().subscribe(res => {
      this.setores = res
    }, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error'));
    this.api.getTipoMovimentacao().subscribe(res => {
      this.tipo_movimentacao = res
    }, Error => this.functions.showToast('Erro ao obter os tipos de movimentação, favor recarregar a página', 'error'));
  }

  postMovimentacao() {
    console.log(this.movimentacao)
  }
}
