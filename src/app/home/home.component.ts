import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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
  }, {
    titulo: 'Relatórios',
    imagem: '../../../assets/img/relatorio.jpg',
    router: '/relatorios',
    descTexto: 'Diversos tipos de relatórios.',
    descButton: 'Visualizar relatórios'
  }, {
    titulo: 'Equipamentos',
    imagem: '../../../assets/img/ativos.png',
    router: '/equipamentos',
    descTexto: 'Lista os equipamentos.',
    descButton: 'Visualizar ativos'
  }]
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getTipoEquipamentos().subscribe(res => console.log(res))
  }

}
