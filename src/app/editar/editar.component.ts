import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    "equipamento_descricao": "",
    "modelo": "",
    "marca": "",
    "num_serie": ""
  }];
  public tipos_equipamento;
  public setores;

  constructor(public route: ActivatedRoute, public router: Router, public api: ApiService, public functions: FunctionsService) { }

  ngOnInit() {
    this.api.getSetores().subscribe(res => {
      this.setores = res
    });
    this.api.getTipoEquipamentos().subscribe(res => {
      this.tipos_equipamento = res
    }, Error => {
      this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error')
    });
    this.api.getEquipamentos(this.equipamento_id).subscribe(res => {
      this.equipamento = res
    }, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error'));
  }

  putEquipamento() {
    this.api.putEquipamento(this.equipamento_id, this.equipamento).subscribe(res => {
      this.functions.showToast('Equipamento atualizado com sucesso!', 'success')
      this.router.navigate(['/equipamentos'])
    },
      Error => {
        this.functions.showToast('Erro ao atualizar equipamento, favor tentar novamente.', 'error')
      });
  }
}
