import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  private equipamento_id = +this.route.snapshot.paramMap.get('equipamento_id');
  public equipamento;
  public tipos_equipamento;

  constructor(public route: ActivatedRoute, public api: ApiService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res => this.tipos_equipamento = res);
    this.api.getEquipamentos(this.equipamento_id).subscribe(res => this.equipamento = res);
  }


  putEquipamento() {
    console.log(this.equipamento[0])
   // this.api.putEquipamento(this.equipamento_id, this.equipamento).subscribe(res => console.log(res))
  }
}
