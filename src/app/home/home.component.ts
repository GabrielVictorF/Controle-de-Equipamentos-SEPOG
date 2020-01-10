import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cards = [{
    titulo: 'Movimentações',
    imagem: '../../../assets/img/transfer.png',
    router: '/movimentacoes',
    descTexto: 'Visualizar movimentações.',
    descButton: 'Visualizar movimentações'
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
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res => console.log(res))
  }

}
