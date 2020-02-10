import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.scss']
})
export class MovimentacoesComponent implements OnInit {
  public movimentacoes;
  constructor(public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getMovimentacoes().subscribe(res => {
      this.movimentacoes = res;
    });
  }

  deletarMovimentacao(movimentacao_id) {
    
  }
}
