import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import Chart from 'chart.js'; //Geração de gráficos

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cards = [{
    titulo: 'Empréstimos',
    imagem: '../../../assets/img/transfer.png',
    router: '/emprestimos',
    descTexto: 'Visualizar empréstimos.',
    descButton: 'Visualizar empréstimos'
  }, 
  {
    titulo: 'Equipamentos',
    imagem: '../../../assets/img/ativos.png',
    router: '/equipamentos',
    descTexto: 'Lista os equipamentos.',
    descButton: 'Visualizar ativos'
  },{
    titulo: 'Relatórios',
    imagem: '../../../assets/img/relatorio.jpg',
    router: '/relatorios',
    descTexto: 'Diversos tipos de relatórios.',
    descButton: 'Visualizar relatórios'
  }]
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65], label: 'Series A'},
  ];
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res => console.log(res))
  }

}
