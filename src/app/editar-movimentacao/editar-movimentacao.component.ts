import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';

@Component({
	selector: 'app-editar-movimentacao',
	templateUrl: './editar-movimentacao.component.html',
	styleUrls: ['./editar-movimentacao.component.scss']
})
export class EditarMovimentacaoComponent implements OnInit {

	public movimentacao:any = {
		"data_movimentacao": "",
		"tipomovi_id": 0,
		"observacao": "",
		"setor_origem_id": 0,
		"equipamentos": [],
		"setor_destino_id": 0,
		"pesquisa_equipamento": ""
	};

	public equipamentos_selecionados = [];
	public pesquisa: any = {
		equipamento: []
	}
	public requests_com_sucesso = 0;
	public tipo_movimentacao;
	public setores;
	private movimentacao_id = +this.route.snapshot.paramMap.get('movimentacao_id');

	constructor(public route: ActivatedRoute, public router: Router, 
		public api: ApiService, public functions: FunctionsService) { }

	ngOnInit() {
		this.api.getMovimentacoes(this.movimentacao_id).subscribe(res => {
			this.requests_com_sucesso++;
			this.movimentacao = res,
			console.log(this.movimentacao)
		})
		this.api.getSetores().subscribe(res => {

			this.requests_com_sucesso++;
			this.setores = res
		}, Error => this.functions.showToast('Erro ao obter categoria de equipamentos, favor recarregar a página', 'error'));
		this.api.getTipoMovimentacao().subscribe(res => {

			this.requests_com_sucesso++;
			this.tipo_movimentacao = res
		}, Error => this.functions.showToast('Erro ao obter os tipos de movimentação, favor recarregar a página', 'error'));
	}

	/*putMovimentacao() {
		console.log(this.movimentacao.equipamentos)
		this.api.putMovimentacao(this.movimentacao_id, this.movimentacao).subscribe(() => {
			this.api.deleteEquipamentoMovimentado(this.movimentacao_id, this.movimentacao.equipamentos).subscribe(() => {
				this.functions.showToast('Movimentação atualizada com sucesso!', 'success')
			}, Error => this.functions.showToast('Erro ao atualizar movimentação!', 'error'))
		})
	} */

	adicionaEquipamento(equipamento) {
			console.log(this.movimentacao.equipamentos)
		this.equipamentos_selecionados.push(equipamento);
		this.pesquisa.equipamento = [];
		this.movimentacao.equipamentos.push(equipamento.equipamento_id); //GERANDO ERRO UNDEFINED
	
	}

	getPesquisaEquipamento() {
		this.api.getPesquisaEquipamento(this.movimentacao.pesquisa_equipamento, this.movimentacao.equipamentos).subscribe(res => {
			this.pesquisa.equipamento = res, 
			console.log(this.pesquisa.equipamento)
		}) 
	} 
}
