import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  public relatorio;
  public show = false;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Parque Tecnológico'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  //public barChartData: any = [{ data: [], label: '' }];
  public colors = [{
    'backgroundColor': "rgba(255,99,132,0.6)",
    'borderColor': "rgba(255,99,132,1)",
    'hoverBackgroundColor': "rgba(255,99,132,0.8)",
    'hoverBorderColor': "rgba(255,99,132,1)"
  }, {
    'backgroundColor': "rgba(54,162,235,0.6)",
    'borderColor': "rgba(54,162,235,1)",
    'hoverBackgroundColor': "rgba(54,162,235,0.8)",
    'hoverBorderColor': "rgba(54,162,235,1)"
  }, {
    'backgroundColor': "rgba(255,206,86,0.6)",
    'borderColor': "rgba(255,206,86,1)",
    'hoverBackgroundColor': "rgba(255,206,86,0.8)",
    'hoverBorderColor': "rgba(255,206,86,1)"
  }, {
    'backgroundColor': "rgba(231,233,237,0.6)",
    'borderColor': "rgba(231,233,237,1)",
    'hoverBackgroundColor': "rgba(231,233,237,0.8)",
    'hoverBorderColor': "rgba(231,233,237,1)"
  }, {
    'backgroundColor': "rgba(75,192,192,0.6)",
    'borderColor': "rgba(75,192,192,1)",
    'hoverBackgroundColor': "rgba(75,192,192,0.8)",
    'hoverBorderColor': "rgba(75,192,192,1)", 
  }, {
    'backgroundColor': "rgba(151,187,205,0.6)",
    'borderColor': "rgba(151,187,205,1)",
    'hoverBackgroundColor': "rgba(151,187,205,0.8)",
    'hoverBorderColor': "rgba(151,187,205,1)"
  }, {
    'backgroundColor': "rgba(220,220,220,0.6)",
    'borderColor': "rgba(220,220,220,1)",
    'hoverBackgroundColor': "rgba(220,220,220,0.8)",
    'hoverBorderColor': "rgba(220,220,220,1)"
  }, {
    'backgroundColor': "rgba(247,70,74,0.6)",
    'borderColor': "rgba(247,70,74,1)",
    'hoverBackgroundColor': "rgba(247,70,74,0.8)",
    'hoverBorderColor': "rgba(247,70,74,1)"
  }
  ];
  
  constructor(public api: ApiService) { }

  ngOnInit() {
    console.log(this.barChartData)
  }

  qtdEquipamentosCat() {
    this.api.getQtdEquipamentosCat().subscribe(res => { 
      this.relatorio = res,
      this.aplicaDados()
    })
  }

  aplicaDados() {
    this.show = !this.show;
    this.barChartData = [];
      this.relatorio.map((res, index) => {
        this.barChartData.push({
          data: [res.data],
          label: res.label,
          backgroundColor: this.geraCorAleatoriaRgba(),
          borderColor: this.geraCorAleatoriaRgba(),
          hoverBackgroundColor: '#00000',
          hoverBorderColor: this.geraCorAleatoriaRgba()
        });
      })
      //this.barChartData.push({data: [100], label: 'k'})
      //this.barChartData.push(this.relatorio)
      console.log(this.barChartData)
  }

  qtdEquipamentosSetor() {
    this.api.getQtdEquipamentosSetor().subscribe(res => {
      this.relatorio = res,
      this.aplicaDados()
    })
  }

  geraCorAleatoriaRgba() {
    return `rgba(${(parseInt(Math.random() * (255 + 1)))},${(parseInt(Math.random() * (255 + 1)))}, ${(parseInt(Math.random() * (255 + 1)))}, ${(parseInt(Math.random()  * (255 + 1)))})`;
  }
}
