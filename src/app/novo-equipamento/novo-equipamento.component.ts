import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-novo-equipamento',
  templateUrl: './novo-equipamento.component.html',
  styleUrls: ['./novo-equipamento.component.scss']
})
export class NovoEquipamentoComponent implements OnInit {
  public equipamento: any = {
    "equipamento_tomb": "",
    "equipamento_descricao": "",
    "equipamento_id": 0,
    "modelo": "",
    "fabricante": "",
    "num_serie": ""
  };
  public tipos_equipamento;
  public setores;

  constructor(public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res => {
      this.tipos_equipamento = res
    }, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error'));
    this.api.getSetores().subscribe(res => {
      this.setores = res
     }, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error'));
  }

  postEquipamento() {
    this.api.postEquipamento(this.equipamento).subscribe(res => {
      this.functions.showToast('Equipamento atualizado com sucesso!', 'success')
    }, Error => {
      this.functions.showToast('Erro ao cadastrar equipamento, favor tentar novamente.', 'error')
    });
  }
}
