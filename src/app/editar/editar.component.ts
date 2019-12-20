import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';

declare var $;
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  private equipamento_id = +this.route.snapshot.paramMap.get('equipamento_id');
  public equipamento: any = [{
    "equipamento_tomb": "",
    "equipamento_descricao": ""
  }];
  public tipos_equipamento;

  constructor(public route: ActivatedRoute, public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res => this.tipos_equipamento = res);
    this.api.getEquipamentos(this.equipamento_id).subscribe(res => this.equipamento = res);
  }


  putEquipamento() {
    this.api.putEquipamento(this.equipamento_id, this.equipamento).subscribe(res => {
      this.functions.showToast('Equipamento atualizado com sucesso!', 'success')
    },
      Error => {
        this.functions.showToast('Erro ao atualizar equipamento, favor tentar novamente.', 'error')
      });
  }
}
