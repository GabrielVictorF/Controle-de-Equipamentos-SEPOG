import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public URL = 'http://172.30.91.60:8080/';
  private httpOptions = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Q33gjLVTvUMJdcPx0pVwVwCzndBz-iKk98GEq4UbvLA',
      'Access-Control-Allow-Credentials': 'true'
    })
  });

  constructor(public http: HttpClient) { }

  public getTipoEquipamentos() {
    return this.http.get(`${this.URL}cotec/public/tipo_equipamento`, this.httpOptions);
  }

  public getEquipamentos(equipamento_id?) {
    let url = `${this.URL}_QUERIES/get/equipamentos-full`;
    if (equipamento_id)
      url += `?equipId=${equipamento_id}`;
    return this.http.get(url, this.httpOptions);
  }

  public getCountEquipamentos() {
    return this.http.get(`${this.URL}cotec/public/equipamento?_count=*`, this.httpOptions);
  }

  public putEquipamento(equipamento_id, body) {
    const corpoReq = {
      "equipamento_id": body[0].equipamento_id,
        "equipamento_tomb": body[0].equipamento_tomb,
        "equipamento_descricao": body[0].equipamento_descricao,
        "tipo_equipamento_id": body[0].tipo_equipamento_id,
        "setor_id": body[0].setor_id
    };
    console.log(corpoReq)
    return this.http.put(`${this.URL}cotec/public/equipamento?equipamento_id=${equipamento_id}`, corpoReq, this.httpOptions);
  }

  public postEquipamento(body) {
    return this.http.post(`${this.URL}cotec/public/equipamento`, body);
  }

  public getSetores() {
    return this.http.get(`${this.URL}cotec/public/setor?_order=setor_sigla`);
  }
}
