function carregarKPIs() {
    if(sessionStorage.IS_ADM == 0)
    {
        alert("Você não um adm");
        window.location = "index.html";
    }
    buscarKpisGerais();
    obterDadosGraficoLutadores();
    obterDadosGraficoLutas();
}

function buscarKpisGerais() {
    fetch("/dashboard/geral").then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (json) {
                console.log("Dados recebidos do KPI:", json); // Para você conferir no F12

                // Lógica para tratar diferentes formatos de retorno do MySQL
                var dados = null;
                if (json.length > 0) {
                    if (json[0].totalUsuarios !== undefined) {
                        dados = json[0]; // Formato direto
                    } else if (json[0][0] && json[0][0].totalUsuarios !== undefined) {
                        dados = json[0][0]; // Formato array de array
                    }
                }

                if (dados) {
                    // Atualiza os números na tela
                    document.getElementById("kpiUsuarios").innerHTML = dados.totalUsuarios;
                    document.getElementById("kpiJogadores").innerHTML = dados.totalJogadores;
                } else {
                    console.error("Formato de dados inesperado ou vazio");
                }
            });
        } else {
            console.error('Erro na requisição da API');
        }
    }).catch(function (erro) {
        console.error('Erro:', erro);
    });
}

function obterDadosGraficoLutadores() {
    fetch("/dashboard/grafico/lutadores").then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                plotarGraficoLutadores(resposta);
            });
        }
    });
}

function obterDadosGraficoLutas() {
    fetch("/dashboard/grafico/lutas").then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                plotarGraficoLutas(resposta);
            });
        }
    });
}

function plotarGraficoLutadores(dados) {
    var ctx = document.getElementById("graficoLutadores").getContext("2d");
    
    var labels = [];
    var valores = [];

    for (var i = 0; i < dados.length; i++) {
        labels.push(dados[i].nome);
        valores.push(dados[i].votos);
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Votos",
                data: valores,
                backgroundColor: "#d13a3a"
            }]
        },
        options: {
            scales: {
                y: { ticks: { color: "white" }, beginAtZero: true },
                x: { ticks: { color: "white" } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function plotarGraficoLutas(dados) {
    var ctx = document.getElementById("graficoLutas").getContext("2d");
    
    var labels = [];
    var valores = [];

    for (var i = 0; i < dados.length; i++) {
        labels.push(dados[i].titulo);
        valores.push(dados[i].votos);
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Favoritos",
                data: valores,
                backgroundColor: "#d13a3a"
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: { ticks: { color: "white" }, beginAtZero: true },
                y: { ticks: { color: "white" } }
            },
            plugins: { legend: { display: false } }
        }
    });
}