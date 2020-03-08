import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';
import { DataPipe } from '../data.pipe';

declare var $;

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.scss']
})
export class MovimentacoesComponent implements OnInit {
  public movimentacoes;
  public setores;

  constructor(public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getSetores().subscribe(res => {
      this.setores = res
    });
    this.api.getMovimentacoes().subscribe(res => {
      this.movimentacoes = res;
    });
  }

  openModal(movimentacao_id) {
    localStorage.setItem("movimentacao_id", movimentacao_id);
    $('#staticBackdrop').modal('show')
  }

  deletarMovimentacao() {
    this.api.deleteMovimentacao(localStorage.getItem("movimentacao_id")).subscribe(() => {
      this.functions.showToast('Movimentação excluída com sucesso', 'success');
      $('#staticBackdrop').modal('hide');
      localStorage.removeItem("movimentacao_id");
    }, Error => {
      this.functions.showToast('Erro ao deletar movimentação, favor tentar novamente!', 'error');
    })
  }
}
