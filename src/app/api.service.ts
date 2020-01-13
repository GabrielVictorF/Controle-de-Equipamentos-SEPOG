import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public URL = 'http://172.30.91.60:3000/';
  private httpOptions = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Q33gjLVTvUMJdcPx0pVwVwCzndBz-iKk98GEq4UbvLA',
      'Access-Control-Allow-Credentials': 'true'
    })
  });

  constructor(public http: HttpClient) { }

  public getTipoEquipamentos() {
    return this.http.get(`${this.URL}tipo_equipamento?order=tipo_equipamento_descricao`, this.httpOptions);
  }

  public getEquipamentos(equipamento_id?, tipo_equipamento_id?, setor_id?, fabricante?, modelo?) {
    let url = `${this.URL}equipamento?select=*,setor(*),tipo_equipamento(*)`;

    equipamento_id ? url += `&equipamento_id=eq.${equipamento_id}` : ''

    tipo_equipamento_id ? url += `&tipo_equipamento_id=eq.${tipo_equipamento_id}`: ''

    setor_id ? url += `&setor_id=eq.${setor_id}` : ''

    fabricante? url += `&fabricante=eq.${fabricante}` : ''

    modelo? url += `&modelo=eq.${modelo}` : ''
  
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

  public postEquipamento(body) {
    return this.http.post(`${this.URL}cotec/public/equipamento`, body);
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
}
