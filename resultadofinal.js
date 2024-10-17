
// Função para adicionar comportamento ao botão de atualizar o relatório geral
document.getElementById('atualizar-relatorio-btn').addEventListener('click', function() {
    document.getElementById('calculate-expenses-btn').click();
});

// Função para exibir o Relatório Geral ao concluir todos os cálculos
document.getElementById('calculate-expenses-btn').addEventListener('click', function() {
    const energia = getInputValue('energia');
    const aluguel = getInputValue('aluguel');
    const funcionario = getInputValue('funcionario');
    const internet = getInputValue('internet');
    const marketing = getInputValue('marketing');
    const simplesNacional = getInputValue('simples-nacional');
    const frete = getInputValue('frete');

    // Calcular Valor da Venda Bruta e Lucro
    const valorBruto = getInputValue('valor-bruto');
    const descontoEmpresa = getInputValue('desconto-empresa');
    const valorComDesconto = valorBruto - (valorBruto * (descontoEmpresa / 100));
    const embalagem = getInputValue('embalagem');
    const icms = getInputValue('icms');
    const porcentagemVenda = getInputValue('porcentagem-venda');
    const valorVendaBruta = valorComDesconto * (1 + porcentagemVenda / 100);
    const valorFinal = valorVendaBruta + icms + embalagem;
    const valorLucro = valorVendaBruta - valorComDesconto  ;

    // Calcular o valor total das taxas
    const taxaMaquininha = getInputValue('taxa-maquininha');
    const descontoCliente = getInputValue('desconto-cliente');
    const taxaPlataforma = getInputValue('taxa-plataforma');
    const comissao = getInputValue('comissao');
    const valorTaxaMaquininha = valorFinal * (taxaMaquininha / 100);
    const valorDescontoCliente = valorFinal * (descontoCliente / 100);
    const valorTaxaPlataforma = valorFinal * (taxaPlataforma / 100);
    const valorComissao = valorFinal * (comissao / 100);
    const valorTotalTaxas = valorTaxaMaquininha + valorDescontoCliente + valorTaxaPlataforma + valorComissao;

    // Calcular Total de Gastos Gerais
    const totalGastosGerais = energia + aluguel + funcionario + internet + marketing + simplesNacional + frete;

    // Valor Final Com Todos os Gastos
    const valorFinalTotal = valorTotalTaxas + totalGastosGerais + valorComDesconto + icms + embalagem;

    // Calcular Gastos Operacionais
    const gastosOperacionais = embalagem + (valorComDesconto * (icms / 100));

    // Exibir valores no relatório geral
    document.getElementById('gastos-brutos').innerText = `R$ ${(gastosOperacionais).toFixed(2)}`;
    document.getElementById('total-taxas-relatorio').innerText = `R$ ${valorTotalTaxas.toFixed(2)}`;
    document.getElementById('total-gastos-gerais-relatorio').innerText = `R$ ${totalGastosGerais.toFixed(2)}`;
    document.getElementById('valor-produto-sem-despesas').innerText = `R$ ${valorComDesconto.toFixed(2)}`;
    document.getElementById('valor-produto-com-despesas').innerText = `R$ ${valorFinalTotal.toFixed(2)}`;
    document.getElementById('valor-lucro-relatorio').innerText = `R$ ${valorLucro.toFixed(2)}`;

    // Exibir a seção de relatório geral
    document.getElementById('relatorio-geral').style.display = 'block';

    // Gerar Gráfico do Relatório Geral
    gerarGraficoRelatorioGeral(gastosOperacionais, valorTotalTaxas, totalGastosGerais, valorVendaBruta, valorFinalTotal, valorLucro);
});

// Função para gerar o gráfico do Relatório Geral com Chart.js
function gerarGraficoRelatorioGeral(gastosOperacionais, totalTaxas, totalGastosGerais, valorProdutoSemDespesas, valorProdutoComDespesas, valorLucro) {
    const ctx = document.getElementById('grafico-relatorio-geral').getContext('2d');
    if (window.myChartRelatorioGeral) {
        window.myChartRelatorioGeral.destroy();
    }
    window.myChartRelatorioGeral = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gastos Operacionais', 'Total de Taxas', 'Total de Gastos Gerais', 'Produto Sem Despesas', 'Produto Com Despesas', 'Lucro'],
            datasets: [{
                label: 'Valores (R$)',
                data: [gastosOperacionais, totalTaxas, totalGastosGerais, valorProdutoSemDespesas, valorProdutoComDespesas, valorLucro],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',   // Gastos Operacionais (Vermelho)
                    'rgba(255, 159, 64, 0.8)',   // Total de Taxas (Laranja)
                    'rgba(255, 205, 86, 0.8)',   // Total de Gastos Gerais (Amarelo)
                    'rgba(75, 192, 192, 0.8)',   // Produto Sem Despesas (Verde)
                    'rgba(54, 162, 235, 0.8)',   // Produto Com Despesas (Azul)
                    'rgba(153, 102, 255, 0.8)'   // Lucro (Roxo)
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribuição do Relatório Geral'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}