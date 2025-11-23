/* dashboard-kpi.js */

function carregarKPIs() {
    atualizarNumeros();
    plotarGraficoLutadores();
    plotarGraficoLutas();
}

function atualizarNumeros() {
    // Simulando dados vindos do banco
    var totalCadastros = 1250; 
    var totalJogadores = 840; 

    // Efeito simples de inserir o número
    document.getElementById("kpiUsuarios").innerHTML = totalCadastros;
    document.getElementById("kpiJogadores").innerHTML = totalJogadores;
}

function plotarGraficoLutadores() {
    var ctx = document.getElementById("graficoLutadores").getContext("2d");

    // Simulando dados de Likes dos Lutadores
    // Misturando os muito populares com os menos populares para o gráfico
    var labels = ["Mike Tyson", "M. Ali", "Holyfield", "J. Frazier"];
    var dadosLikes = [1500, 1800, 900, 400, 120, 80]; 
    // Cores: Vermelho para os Top, Cinza para os menos votados
    var cores = ["#d13a3a", "#d13a3a", "#d13a3a", "#d13a3a"];

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Número de Favoritos",
                data: dadosLikes,
                backgroundColor: cores,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { color: "#fff" }, grid: { color: "#444" } },
                x: { ticks: { color: "#fff" }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function plotarGraficoLutas() {
    var ctx = document.getElementById("graficoLutas").getContext("2d");


    var labels = ["Tyson v Holyfield", "Ali v Frazier", "Ali v Foreman", "Tyson v Paul"];
    var dadosLikes = [3200, 2900, 2500, 1500];
    

    var cores = ["#d13a3a", "#d13a3a", "#d13a3a", "#d13a3a"];

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Lutas Favoritadas",
                data: dadosLikes,
                backgroundColor: cores,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // 'y' faz o gráfico ficar deitado (horizontal), fica ótimo para nomes longos de lutas
            scales: {
                x: { ticks: { color: "#fff" }, grid: { color: "#444" } },
                y: { ticks: { color: "#fff" }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}