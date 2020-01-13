import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public navbarItens = [{
    'button': 'Visualizar movimentações',
    'router': '/movimentacoes',
    'dropdown_itens': [{
      'button': 'Criar nova movimentação',
      'router': '/nova-movimentacao'
    }]
  }, {
    'button': 'Visualizar equipamentos',
    'router': '/equipamentos',
    'dropdown_itens': [{
      'button': 'Cadastrar novo',
      'router': '/novo-equipamento'
    }]
  }];

  constructor() { }

  ngOnInit() {
  }

}
