import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';
import {Observable, fromEvent} from 'rxjs';

@Component({
  selector: 'app-nova-movimentacao',
  templateUrl: './nova-movimentacao.component.html',
  styleUrls: ['./nova-movimentacao.component.scss']
})
export class NovaMovimentacaoComponent implements OnInit {
  public setores;
  private equipamento_selecionado: boolean = false;
  public pesquisa: any = {
    usuario: [],
    equipamento: []
  };

  public equipamentos_selecionados = [];
  public tipo_movimentacao;
  public movimentacao = {
    equipamentos: [],
    setor_origem: 0,
    setor_destino: 0,
    observacao: '',
    data_movimentacao: '',
    pesquisa_equipamento: '',
    pesquisa_usuario: '',
    tipo_movimentacao: 1
  }

  constructor(public api: ApiService, public functions: FunctionsService) { 
    //this.getPesquisaEquipamento();
  }

  ngOnInit() {
    this.api.getSetores().subscribe(res => {
      this.setores = res
    }, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error'));
    this.api.getTipoMovimentacao().subscribe(res => {
      this.tipo_movimentacao = res
    }, Error => this.functions.showToast('Erro ao obter os tipos de movimentação, favor recarregar a página', 'error'));
  }

  postMovimentacao() {
    this.api.postMovimentacao(this.movimentacao);
  }

  getPesquisaUsuario() {
    this.api.getPesquisaUsuario(this.movimentacao.pesquisa_usuario).subscribe(res => this.pesquisa.usuario = res)
  }

  getPesquisaEquipamento() {
      this.api.getPesquisaEquipamento(this.movimentacao.pesquisa_equipamento, this.movimentacao.equipamentos).subscribe(res => {this.pesquisa.equipamento = res, console.log(this.pesquisa.equipamento)})
      
  }

  adicionaEquipamento(equipamento) {
    console.log(equipamento)
    this.equipamentos_selecionados.push(equipamento);
    this.pesquisa.equipamento = [];
    this.movimentacao.equipamentos.push(equipamento.equipamento_id); //GERANDO ERRO UNDEFINED
    console.log(this.equipamentos_selecionados)
  }

  retiraEquipamento(index) {
    this.equipamentos_selecionados.splice(index, 1); 
    this.movimentacao.equipamentos = [];
  }
}
