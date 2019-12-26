import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res => this.tipos_equipamento = res);
    this.api.getSetores().subscribe(res => this.setores = res );
    this.api.getCountEquipamentos().subscribe(res => {
      this.api.getEquipamentos().subscribe(res => this.equips = res);
    });  
  }

  public getResultsFilter() {
    this.api.getEquipamentos(null, this.filtro.tipo_equipamento_id, this.filtro.setor_id).subscribe(res => this.equips = res)
    //this.filtro.setor_id > 0 ?  
  }

  public resetCampos() {
    this.filtro.setor_id = 0;
    this.filtro.tipo_equipamento_id = 0;
  }
}
