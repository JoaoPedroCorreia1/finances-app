import { Financa } from "./financa";
import { SelecionadorDeFinanca } from "./selecionador-de-financa";

export class GraficosBarra {

    static selecionarDadosGraficoBarraMensal(
        financas: Financa[], 
        mes: number, 
        ano: number
        ): any{
        
        const meses = ['jan', 'feb', 'mar', 'apr',
        'may', 'jun', 'jul', 'aug', 'sep', 'oct',
        'nov', 'dec'];

        var receitasData = [];
        var despesasData = [];
        var mesesLabel = []

        var mesLocal = mes;

        for (let i = 0; i < 12; i++) {

            if(mesLocal < 1){
                mesLocal = 12; // mes = dezembro
            }

            // adicionar nome do mes
            mesesLabel.push(meses[mesLocal-1]);

            // adicionar receita do mes
            const receitaMesLocal = this.calcularBalancoTotalPorData(
                financas,
                0, // Receita
                1, // Seleção por mes
                ano,
                mesLocal
            )
            
            receitasData.push(receitaMesLocal);

            // adicionar despesa do mes
            const despesaMesLocal = this.calcularBalancoTotalPorData(
                financas,
                1, // Despesa
                1, // Seleção por mes
                ano,
                mesLocal
            )

            despesasData.push(despesaMesLocal);

            mesLocal--;
            
        }

        const dadosGraficoBarrasMensal = this.gerarDadosGraficoBarras(
            mesesLabel,
            receitasData,
            despesasData
        );

        return dadosGraficoBarrasMensal;
    }

    static selecionarDadosGraficoTabelaAnual(
        financas: Financa[], 
        ano: number
        ): any{

        var receitasData = [];
        var despesasData = [];
        var anoLabel = []

        var anoLocal = ano;

        for (let i = 0; i < 8; i++) {
            // ano
            anoLabel.push(anoLocal);

            // receita do ano
            var receitaAnoLocal = this.calcularBalancoTotalPorData(
                financas,
                0, // Receita
                2, // Seleção por ano
                anoLocal
            )
            
            receitasData.push(receitaAnoLocal);

            // despesa do ano

            var despesaAnoLocal = this.calcularBalancoTotalPorData(
                financas,
                1, // Despesa
                2, // Seleção por ano
                anoLocal
            )
            
            despesasData.push(despesaAnoLocal);

            anoLocal--;

        }
        
        const dadosGraficoBarraAnual = this.gerarDadosGraficoBarras(
            anoLabel,
            receitasData,
            despesasData
        );

        return dadosGraficoBarraAnual;
    }

    private static gerarDadosGraficoBarras(
        Label: any,
        receitasData: any,
        despesasData: any
        ): any{

        // inverte arrays
        Label = Label.reverse();
        receitasData = receitasData.reverse();
        despesasData = despesasData.reverse();
        
        const dadosGraficoBarras = {
            labels: Label,
            datasets: [
            {
                label: 'Income',
                backgroundColor: '#42A5F5',
                data: receitasData
            },
            {
                label: 'Expense',
                backgroundColor: '#F44336',
                data: despesasData
            }
            ]
        };

        return dadosGraficoBarras;
    }

    private static calcularBalancoTotalPorData(
        financas: Financa[],
        tipoFinanca: number,   //0 = Receita, 1 = Despesa
        tipoSelecao: number,   //1 = Mes, 2 = Ano
        ano: number,
        mes: number = 0
    ){
        //Seleciona por data
        var financasBalanco = SelecionadorDeFinanca.SelecionarFinancaPorData(
            financas,
            tipoSelecao,
            0,
            mes,
            ano
        );
        
        //Seleciona por tipo
        financasBalanco = financasBalanco.filter(f => f.tipoFinanca === tipoFinanca);

        var balanco = 0;
        financasBalanco.forEach( (f, i) => {    
            balanco += f.valor; 
        });

        return balanco;
    }

}
