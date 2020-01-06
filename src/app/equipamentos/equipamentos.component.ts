import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosComponent implements OnInit {
  public equips: any = [];
  public setores; 
  public tipos_equipamento;
  public filtro = {
    tipo_equipamento_id: 0,
    setor_id: 0
  }
  private carregando = false;
  private paginaAtual = 1;

  constructor(public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res =>{
      this.tipos_equipamento = res
    }, Error => {
      this.functions.showToast('Erro ao obter a lista de equipamentos, favor recarregar a página!', 'error')
    });
    this.api.getSetores().subscribe(res => {
      this.setores = res
     }, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error') );
    //this.api.getEquipamentos().subscribe(res => this.equips = res);
  }

  public getSemFiltros() {
    if (this.filtro.tipo_equipamento_id == 0 && this.filtro.setor_id == 0)
      return true;
    return false;
  }

  public getResultsFilter() {
    this.carregando = true;
    this.api.getEquipamentos(null, this.filtro.tipo_equipamento_id, this.filtro.setor_id).subscribe(res => {
      this.equips = res, this.carregando = false
    },  Error => {
      this.functions.showToast('Erro ao obter a lista de equipamentos, favor recarregar a página!', 'error'),
      this.carregando = false
    }) 
  }

  public resetCampos() {
    this.filtro.setor_id = 0;
    this.filtro.tipo_equipamento_id = 0;
  }
}
