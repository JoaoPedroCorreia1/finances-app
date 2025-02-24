import { Financa } from "./financa";

export class GraficosDoughnut {

    // Funções Publicas

    static selecionarDadosGraficoDoughnutTotal(financas: Financa[]): any{

        let {receitaTotal, despesaTotal} = this.calcularReceitaDespesa(financas);
        
        const dadosGraficoDoughnutTotal = this.gerarDadosGraficoDoughnut(
            ["Income", "Expense"],
            [receitaTotal, despesaTotal],
            ['#2196F3', '#F44336']
        )

        return dadosGraficoDoughnutTotal;
    }   

    static selecionarDadosGraficoDoughnutBalanco(financas: Financa[]): any {
        
        let {receitaTotal, despesaTotal} = this.calcularReceitaDespesa(financas);
        const balanco = receitaTotal + despesaTotal;

        var dadosGraficoDoughnutBalanco = null;
        
        if(balanco >= 0){

            dadosGraficoDoughnutBalanco = this.gerarDadosGraficoDoughnut(
                ["Balance"],
                [balanco],
                ['#2196F3'] // Azul
            );
            
        } else {

            dadosGraficoDoughnutBalanco = this.gerarDadosGraficoDoughnut(
                ["Balance"],
                [balanco],
                ['#F44336'] // Vermelho
            );

        }

        return dadosGraficoDoughnutBalanco;
    }

    // Funções Privadas
    
    private static calcularReceitaDespesa(financas: Financa[]): any {
        
        const receitaFinancas = financas.filter(f => f.tipoFinanca === 0); // == Receita
        const despesaFinancas = financas.filter(f => f.tipoFinanca === 1); // == Despesa
    
        var receitaTotal = 0;
        receitaFinancas.forEach( (f, i) => {
          receitaTotal += f.valor;  
        });
    
        var despesaTotal = 0;
        despesaFinancas.forEach( (f, i) => {
          despesaTotal += f.valor;  
        });

        return {receitaTotal, despesaTotal};
    }

    private static gerarDadosGraficoDoughnut(
        labelsDoughnut: any,
        dataDoughnut: any,
        corDoughnut: any): any{

        const dadosGraficoDoughnut = {

            labels: labelsDoughnut,

            datasets: [{

                data:dataDoughnut,

                backgroundColor: corDoughnut
            }]
            
        }

        return dadosGraficoDoughnut;
    }
}
