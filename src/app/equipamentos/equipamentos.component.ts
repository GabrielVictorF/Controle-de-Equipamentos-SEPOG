import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosComponent implements OnInit {
  public equips: any = [];
  
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getCountEquipamentos().subscribe(res => {
      this.api.getEquipamentos().subscribe(res => this.equips = res);
    });  
  }
}
