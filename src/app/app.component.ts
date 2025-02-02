import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { FinancaService } from './financa.service';
import { AdicionadorDeFinanca } from './model/adicionador-de-financa';
import { Financa } from './model/financa';
import { SelecionadorDeFinanca } from './model/selecionador-de-financa';
import { SelecionadorGrafico } from './model/selecionador-grafico';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = "finances-app"

  diaAtual: any;
  mesAtual: any;
  anoAtual: any;
  // graficos
  dadosGraficoDoughnut: any;
  dadosGraficoTabela: any;
  formatacaoGraficoTabela: any;
  // opções
  //   botão
  opcoesBotaoReceitaOuDespesa: any;
  opcoesBotaoTipoSelecao: any;
  opcoesBotaoData: any;
  opcoesBotaoTipoGraficoDoughnut: any;
  opcoesBotaoTipoGraficoTabela: any;
  opcoesBotaoRepeticao: any;
  // valores vinculados
  //   data
  dataInserir: any = new Date();
  dataHistorico: any = new Date();
  //   botao
  botaoTipoFinancaSelecionado: any = 0;
  botaoTipoSelecaoSelecionado: any = 1;
  botaoTipoGraficoDoughnutSelecionado: any = 0;
  botaoTipoGraficoTabelaSelecionado: any = 0;
  botaoTipoDataHistoricoSelecionado: any = true;
  botaoTipoDataAdicionadorSelecionado: any = 0;
  botaoRepeticaoSelecionado: any = 0;
  //   tela
  telaAtual: string = "Tela Principal";
  //  rotulos
  rotuloNumero: any = "Qual o valor?";
  rotuloNome: any = "Qual o nome?";

  
  financasVisiveis: Financa[] = [];

  financas: Financa[] = [];

  tabViewHistorico: any = 0;

  constructor(private financaService: FinancaService){

  }

  // Inicialização

  ngOnInit() {
    this.inicializarArrays();
    this.inicializarFinancas();
  }

  inicializarArrays(){
    this.formatacaoGraficoTabela = {
      legend: {
          labels: {
              fontColor: '#495057'
          }
      },
      scales: {
          xAxes: [{
              ticks: {
                  fontColor: '#495057'
              }
          }],
          yAxes: [{
              ticks: {
                  fontColor: '#495057'
              }
          }]
      }
    };

    this.opcoesBotaoReceitaOuDespesa = [
      {opcao: "Receita", valor: 0},
      {opcao: "Despesa", valor: 1},
    ];

    this.opcoesBotaoTipoSelecao = [
      {opcao: "Dia", valor: 0},
      {opcao: "Mes", valor: 1},
      {opcao: "Ano", valor: 2},
    ];

    this.opcoesBotaoTipoGraficoDoughnut = [
      {opcao: "Total", valor: 0},
      {opcao: "Balanço", valor: 1},
    ];

    this.opcoesBotaoTipoGraficoTabela = [
      {opcao: "Mensal", valor: 0},
      {opcao: "Anual", valor: 1},
    ];

    this.opcoesBotaoData = [
      {opcao: "Data Atual", valor: true},
      {opcao: "Selecionar", valor: false},
    ];

    this.opcoesBotaoRepeticao =[
      {opcao: "Sem Repetição", valor: 0},
      {opcao: "Mensal", valor: 1},
      {opcao: "Anual", valor: 2},
    ]
  }

  inicializarFinancas(){ 
    // obtém finanças do backEnd
    this.financaService.getColecaoAtualizada().subscribe(financasBackEnd => {
    this.financas = financasBackEnd;
    //atualiza
    this.atualizarFinancasVisiveis();
    this.atualizarGraficos();
    });
    // atualiza backend
    this.financaService.list();
  }

  // Eventos

    // pagina 1

  eventoTabViewPrincipal(){
    if(this.telaAtual == "Tela Principal"){
      this.telaAtual = "Tela Gráficos";
    } else{
      this.telaAtual = "Tela Principal"
    }
    this.atualizarGraficos();
  }

  eventoBotaoAdicionarFinanca (financaForm: any){
    this.adicionarFinanca(financaForm);
  }

  eventoBotaoTipoSelecaoHistorico(){
    this.atualizarFinancasVisiveis();
  }

  eventoBotaoDataHistorico(){
    this.atualizarFinancasVisiveis();
    this.dataHistorico = new Date();
    this.atualizarGraficos();
  }

  eventoDataHistorico(){
    this.atualizarFinancasVisiveis();
    this.atualizarGraficos();
  }

    // pagina 2
    
  eventoBotaoTipoSelecaoGraficos(){
    this.atualizarGraficos();
  }

  eventoDataGraficos(){
    this.atualizarFinancasVisiveis();
    this.atualizarGraficos();
  }

  eventoBotaoTipoGraficoDoughnut(){
    this.atualizarGraficoDoughnut();
  }

  eventoBotaoTipoGraficoTabela(){
    this.atualizarGraficoTabela();
  }

  // Funções

  adicionarFinanca (financaForm: any){
    // define
    const f = AdicionadorDeFinanca.criarFinanca(financaForm);
    // checa erro
    if(typeof f == "string"){
      const erro = f;
      this.exibirMensagemErro(erro);
      console.log(erro);
      return;
    }
    // checa se nulo
    if(isNaN(f.valor)){
      return;
    }
    // adiciona
    this.financaService.add(f);
    // reseta
    this.resetarfinancaForm(financaForm);
    // atualiza
    this.atualizarFinancasVisiveis();
  }

  async resetarfinancaForm(form: any){ 
    // reseta
    form.resetForm();
    this.resetarMensagemErro();
    // inicializa variaveis
    this.dataInserir = new Date();
    this.botaoRepeticaoSelecionado = 0;
    this.botaoTipoFinancaSelecionado = 0;
  }

  atualizarFinanca (f: Financa){
    this.financaService.update(f);
  }

  atualizarFinancasVisiveis(){
    //check if data historico is null
    if(isNaN(this.dataHistorico)){
      return;
     }

    const dia = this.dataHistorico.getDate();
    const mes = this.dataHistorico.getMonth()+1;
    const ano = this.dataHistorico.getFullYear();

    this.financasVisiveis = SelecionadorDeFinanca.SelecionarFinancaPorData(
      this.financas,
      this.botaoTipoSelecaoSelecionado,
      dia, mes, ano);
  }

  atualizarGraficos(){
    if(this.telaAtual == "Tela Gráficos"){
      this.atualizarGraficoDoughnut();
      this.atualizarGraficoTabela();
    }
  }

  atualizarGraficoDoughnut(){
    this.atualizarFinancasVisiveis();

    var dadosGraficoDoughnut = SelecionadorGrafico.ObterDadosGraficoDoughnut(
      this.financasVisiveis,
      this.botaoTipoGraficoDoughnutSelecionado
    )

    this.dadosGraficoDoughnut = dadosGraficoDoughnut;
  }
  
  atualizarGraficoTabela(){
    this.atualizarFinancasVisiveis();

    const mes = this.dataHistorico.getMonth()+1;
    const ano = this.dataHistorico.getFullYear();

    var dadosGraficoTabela = SelecionadorGrafico.ObterDadosGraficoBarra(
      this.financas,
      this.botaoTipoGraficoTabelaSelecionado,
      ano,
      mes
    )

    this.dadosGraficoTabela = dadosGraficoTabela;
  }

  //  Mensagens
  resetarMensagemErro(){
    this.rotuloNumero = "Qual o valor?";
    this.rotuloNome = "Qual o nome?";
  }

  exibirMensagemErro(erro: string){

    if(erro == "Erro Valor Negativo"){
      this.rotuloNumero = "Qual o valor? (número positivo)"
    }

    if(erro == "Erro Valor Alto"){
      this.rotuloNumero = "Qual o valor? (max 22 números)"
    }

    if(erro == "Erro Nome Grande"){
      this.rotuloNome = "Qual o nome? (max 20 letras)"
    }
  }

  retornarString(): any{
    return 'string';
  }
}
