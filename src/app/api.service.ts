import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { encode } from 'punycode';
import { FunctionsService } from './functions.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public URL = 'http://35.247.211.8:3100/';
  private httpOptions = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Q33gjLVTvUMJdcPx0pVwVwCzndBz-iKk98GEq4UbvLA',
      'Access-Control-Allow-Credentials': 'true'
    })
  });

  constructor(public http: HttpClient, public functions: FunctionsService) { }

  public getTipoEquipamentos() {
    return this.http.get(`${this.URL}tipo_equipamento?order=tipo_equipamento_descricao`, this.httpOptions);
  }

  public getEquipamentos(equipamento_id?, tipo_equipamento_id?, setor_id?, fabricante?, modelo?, tombamento?) {
    let url = `${this.URL}equipamento?select=*,setor(*),tipo_equipamento(*)`;

    equipamento_id ? url += `&equipamento_id=eq.${equipamento_id}` : ''

    tipo_equipamento_id ? url += `&tipo_equipamento_id=eq.${tipo_equipamento_id}`: ''

    setor_id ? url += `&setor_id=eq.${setor_id}` : ''

    fabricante? url += `&fabricante=eq.${fabricante}` : ''

    modelo? url += `&modelo=eq.${modelo}` : ''

    tombamento? url += `&equipamento_tomb=ilike.*${tombamento}*` : ''

    return this.http.get(url, this.httpOptions);
  }

  public putEquipamento(equipamento_id, body) {
    const corpoReq = {
      "equipamento_id": body[0].equipamento_id,
      "equipamento_tomb": body[0].equipamento_tomb,
      "equipamento_descricao": body[0].equipamento_descricao,
      "tipo_equipamento_id": body[0].tipo_equipamento_id,
      "setor_id": body[0].setor_id,
      "modelo": body[0].modelo,
      "fabricante": body[0].fabricante,
      "num_serie": body[0].num_serie
    };
    console.log(corpoReq)
    return this.http.put(`${this.URL}equipamento?equipamento_id=eq.${equipamento_id}`, corpoReq, this.httpOptions);
  }

  public putMovimentacao(movimentacao_id, body) {
    const corpoReq = {
      "movimentacao_id": body[0].movimentacao_id,
      "tipomovi_id": body[0].tipomovi_id,
      "observacao": body[0].observacao,
      "data_movimentacao": body[0].data_movimentacao,
      "setor_origem_id": body[0].setor_origem_id,
      "setor_destino_id": body[0].setor_destino_id,
    };
    return this.http.put(`${this.URL}movimentacao?movimentacao_id=eq.${movimentacao_id}`, corpoReq, this.httpOptions);
  }

  public postEquipamento(body) {
    return this.http.post(`${this.URL}equipamento`, body);
  }

  public getSetores() {
    return this.http.get(`${this.URL}setor?order=setor_sigla`);
  }

  public getQtdEquipamentosCat() {
    return this.http.get(`${this.URL}count_tipo_equipamento`, this.httpOptions);
  }

  public getQtdEquipamentosSetor() {
    return this.http.get(`${this.URL}count_equipamento_setor`, this.httpOptions);
  }

  public getGroupEquipFabricante() {
    return this.http.get(`${this.URL}group_equip_fabricante`, this.httpOptions);
  }

  public getGroupEquipModelo() {  
    return this.http.get(`${this.URL}group_equip_modelo`, this.httpOptions);
  }

  public getTipoMovimentacao() {
    return this.http.get(`${this.URL}tipo_movimento`, this.httpOptions);
  }

  public getPesquisaUsuario(termo: string) {
    return this.http.get(`${this.URL}usuario?usuario_nome=ilike.*${termo}*`, this.httpOptions);
  }

  public getPesquisaEquipamento(tombamento: string, exceto_equipamento?) {
    let url = `${this.URL}equipamento?select=*,setor(*),tipo_equipamento(*)&equipamento_tomb=ilike.*${tombamento}*`;

    if (exceto_equipamento) {
      exceto_equipamento.forEach((element, index) => {
        url += `&equipamento_id=neq.${exceto_equipamento[index]}`;
      });
    }
    return this.http.get(url, this.httpOptions)
  }

  public postMovimentacao(movimentacao): any { // Insert na tabela de movimentacao
    let url = `${this.URL}movimentacao`;
    let body = {
      setor_origem_id: movimentacao.setor_origem,
      setor_destino_id: movimentacao.setor_destino,
      tipomovi_id: movimentacao.tipo_movimentacao,
      observacao: movimentacao.observacao,
      data_movimentacao: movimentacao.data_movimentacao
    }

    this.http.post(`${this.URL}movimentacao`, body, this.httpOptions).subscribe(() => {
      this.getUltimaMovimentacao().subscribe(res => {

        let arrayNew = [];
        movimentacao.equipamentos.map(id => {
          let body = {
            movimentacao_id: res[0].movimentacao_id,
            equipamento_id: id
          };
          console.log(id)
          arrayNew.push(body);
        });

        console.log(arrayNew)
        this.http.post(`${this.URL}equipamento_movimentado`, arrayNew, this.httpOptions).subscribe(() => {
          this.functions.showToast('Movimentação criada com sucesso!', 'success')
        }, Error => {
          this.functions.showToast('Erro ao criar movimentação, favor tentar novamente!', 'error');
        });
        //this.postEquipamentosMovimentados(arrayNew).subscribe(() => console.log('Concluído'))
      })
    });
  }
  
  public getUltimaMovimentacao() { // Recupera o ID da última movimentação
    let url = `${this.URL}movimentacao?order=movimentacao_id.desc&limit=1`;
    return this.http.get(url, this.httpOptions);
  }

  public getMovimentacoes(movimentacao_id?) {
    let url = `${this.URL}movimentacao?select=*, setor(*), tipo_movimento(*), equipamento_movimentado(*), equipamento(*)`;
    if (movimentacao_id)
      url += `&movimentacao_id=eq.${movimentacao_id}`; 
    return this.http.get(url, this.httpOptions);
  }

  public deleteMovimentacao(movimentacao_id) {
    let url = `${this.URL}movimentacao?movimentacao_id=eq.${movimentacao_id}`;
    return this.http.delete(url, this.httpOptions);
  }

  public deleteEquipamentoMovimentado(movimentacao_id, equipamentos) {
    let url = `${this.URL}equipamento_movimentado?movimentacao_id=eq.${movimentacao_id}`;
    this.http.delete(url, this.httpOptions).subscribe(() => {
      let arrayNew = [];
      equipamentos.map(id => {
        let body = {
          movimentacao_id: movimentacao_id,
          equipamento_id: id
        };
        console.log(id)
        arrayNew.push(body);
      });

      console.log(arrayNew)
      this.http.post(`${this.URL}equipamento_movimentado`, arrayNew, this.httpOptions).subscribe(() => {
        this.functions.showToast('Movimentação criada com sucesso!', 'success')
      }, Error => {
        this.functions.showToast('Erro ao criar movimentação, favor tentar novamente!', 'error');
      });
      //this.postEquipamentosMovimentados(arrayNew).subscribe(() => console.log('Concluído'))    });
    });
  }
}
