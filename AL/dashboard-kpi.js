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

    // Acesso direto aos IDs (sem document.getElementById)
    kpiUsuarios.innerHTML = totalCadastros;
    kpiJogadores.innerHTML = totalJogadores;
}

function plotarGraficoLutadores() {
    // Acesso direto ao ID do canvas
    var ctx = graficoLutadores.getContext("2d");

    var labels = ["Mike Tyson", "M. Ali", "Holyfield", "J. Frazier"];
    var dadosLikes = [1500, 1800, 900, 400]; 
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
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true, 
                    ticks: { color: "#fff" }, 
                    grid: { color: "#444" } 
                },
                x: { 
                    ticks: { color: "#fff" }, 
                    grid: { display: false } 
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function plotarGraficoLutas() {
    // Acesso direto ao ID do canvas
    var ctx = graficoLutas.getContext("2d");

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
            maintainAspectRatio: false,
            indexAxis: 'y', // Gráfico horizontal
            scales: {
                x: { 
                    ticks: { color: "#fff" }, 
                    grid: { color: "#444" } 
                },
                y: { 
                    ticks: { color: "#fff" }, 
                    grid: { display: false } 
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}