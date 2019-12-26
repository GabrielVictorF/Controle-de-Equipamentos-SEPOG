import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  public relatorio;
  public show = [false, false];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Parque Tecnológico'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  //public barChartData: any = [{ data: [], label: '' }];


  constructor(public api: ApiService) { }

  ngOnInit() {
    console.log(this.barChartData)
  }

  qtdEquipamentosCat() {
    this.api.getQtdEquipamentosCat().subscribe(res => {
      this.relatorio = res,
        this.aplicaDados(0)
    })
  }

  aplicaDados(view) {
    this.controlView(view);
    this.barChartData = [];
    this.relatorio.map((res, index) => {
      this.barChartData.push({
        data: [res.data],
        label: res.label  
      });
    })
    console.log(this.barChartData)
  }

  controlView(view) {
    this.show.forEach((res, index) => {
      index == view ? this.show[view] = !this.show[view] : this.show[index] = false;
    });
  }

  qtdEquipamentosSetor() {
    this.api.getQtdEquipamentosSetor().subscribe(res => {
      this.relatorio = res,
        this.aplicaDados(1)
    })
  }
}
