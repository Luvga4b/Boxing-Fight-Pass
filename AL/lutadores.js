/* lutadores.js */

var chartRadar = null;
var indiceAtual = 0;
var abaAtual = "todos"; // Variável para controlar o filtro de favoritos

// Banco de Dados de Atletas
var vetorAtletas = [
    {
        nome: "Mike Tyson",
        apelido: "Iron Mike",
        categoria: "Peso Pesado",
        pais: "EUA",
        favorito: false,
        urlImagem: "https://cdn.fightfax.com/profiles_avatar/pictures/mike-tyson-991330-1730802287.png",
        cartel: { vitorias: 50, derrotas: 6, kos: 44 },
        atributos: { forca: 98, velocidade: 90, resistencia: 85, tecnica: 88, defesa: 82 }
    },
    {
        nome: "Muhammad Ali",
        apelido: "The Greatest",
        categoria: "Peso Pesado",
        pais: "EUA",
        favorito: false,
        urlImagem: "https://cdn.britannica.com/86/192386-050-D7F3126D/Muhammad-Ali-American.jpg",
        cartel: { vitorias: 56, derrotas: 5, kos: 37 },
        atributos: { forca: 85, velocidade: 99, resistencia: 95, tecnica: 98, defesa: 92 }
    },
    {
        nome: "Evander Holyfield",
        apelido: "The Real Deal",
        categoria: "Peso Pesado",
        pais: "EUA",
        favorito: false,
        urlImagem: "https://static.wixstatic.com/media/2af6dc_16b0ede7e09a4b1487e92206a9348825~mv2.png/v1/crop/x_0,y_0,w_500,h_499/fill/w_502,h_504,fp_0.50_0.50,lg_1,q_85,enc_avif,quality_auto/real%20deal-3.png",
        cartel: { vitorias: 44, derrotas: 10, kos: 29 },
        atributos: { forca: 88, velocidade: 85, resistencia: 98, tecnica: 90, defesa: 88 }
    },
    {
        nome: "Joe Frazier",
        apelido: "Smokin' Joe",
        categoria: "Peso Pesado",
        pais: "EUA",
        favorito: false,
        urlImagem: "https://cdn.britannica.com/93/225193-050-73961219/American-boxer-Joe-Frazier-1969.jpg",
        cartel: { vitorias: 32, derrotas: 4, kos: 27 },
        atributos: { 
            forca: 92,       // Lendário gancho de esquerda
            velocidade: 80, 
            resistencia: 96, // Famoso por aguentar muita punição e continuar avançando
            tecnica: 85,     // Estilo 'bob and weave'
            defesa: 78 
        }
    }
];

function iniciarPaginaLutadores() {
    filtrarPorAba("todos");
    indiceAtual = 0;
    exibirLutador();
}

function filtrarPorAba(tipo) {
    abaAtual = tipo;
    
    // Atualiza visual dos botões
    if (tipo == "todos") {
        document.getElementById("btnTodos").className = "botao-aba ativo";
        document.getElementById("btnFavoritos").className = "botao-aba";
    } else {
        document.getElementById("btnTodos").className = "botao-aba";
        document.getElementById("btnFavoritos").className = "botao-aba ativo";
    }

    listarLutadores();
}

function listarLutadores() {
    listaLutadores.innerHTML = "";
    var termo = inputBusca.value.toLowerCase();

    for (var i = 0; i < vetorAtletas.length; i++) {
        var atleta = vetorAtletas[i];
        
        var passouBusca = false;
        if (atleta.nome.toLowerCase().indexOf(termo) >= 0) {
            passouBusca = true;
        }

        var passouAba = true;
        if (abaAtual == "favoritos" && atleta.favorito == false) {
            passouAba = false;
        }

        if (passouBusca && passouAba) {
            listaLutadores.innerHTML += `
            <div class="item-lista" onclick="indiceAtual=${i}; exibirLutador()">
                <img src="${atleta.urlImagem}" class="foto-pequena">
                <div>
                    <span class="titulo-luta">
                        ${atleta.nome} 
                        ${atleta.favorito ? '<span style="color:gold">★</span>' : ''}
                    </span>
                    <span class="detalhe-luta">${atleta.apelido}</span>
                </div>
            </div>
            `;
        }
    }
}

function filtrarLutadores() {
    listarLutadores();
}

function exibirLutador() {
    var dados = vetorAtletas[indiceAtual];

    // Preencher Texto
    nomePerfil.innerHTML = dados.nome + ' <span id="estrelaFavorito" class="estrela" onclick="alternarFavorito()"></span>';
    
    var spanEstrela = document.getElementById("estrelaFavorito");
    if (dados.favorito) {
        spanEstrela.innerHTML = "★";
        spanEstrela.className = "estrela estrela-amarela";
    } else {
        spanEstrela.innerHTML = "☆";
        spanEstrela.className = "estrela";
    }

    categoriaPerfil.innerHTML = dados.categoria;
    imgPerfil.src = dados.urlImagem;
    
    vitoriasPerfil.innerHTML = dados.cartel.vitorias;
    derrotasPerfil.innerHTML = dados.cartel.derrotas;
    koPerfil.innerHTML = dados.cartel.kos;
    origemPerfil.innerHTML = dados.pais;

    atualizarRadar(dados);
}

function alternarFavorito() {
    var atleta = vetorAtletas[indiceAtual];
    
    if (atleta.favorito == false) {
        atleta.favorito = true;
    } else {
        atleta.favorito = false;
    }

    exibirLutador();
    listarLutadores();
}

function atualizarRadar(dados) {
    var ctx = document.getElementById('graficoRadar').getContext('2d');

    if (chartRadar != null) {
        chartRadar.destroy();
    }

    chartRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Força', 'Velocidade', 'Resistência', 'Técnica', 'Defesa'],
            datasets: [{
                label: 'Nível (0-100)',
                data: [
                    dados.atributos.forca,
                    dados.atributos.velocidade,
                    dados.atributos.resistencia,
                    dados.atributos.tecnica,
                    dados.atributos.defesa
                ],
                backgroundColor: 'rgba(209, 58, 58, 0.4)', 
                borderColor: '#d13a3a',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#d13a3a'
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#444' },
                    grid: { color: '#333' },
                    pointLabels: {
                        color: 'white',
                        font: { size: 14 }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#aaa',
                        stepSize: 20,
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false } 
            }
        }
    });
}