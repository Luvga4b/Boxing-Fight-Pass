/* lutadores.js */

var chartRadar = null;
var indiceAtual = 0;
var abaAtual = "todos";

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
        atributos: { forca: 92, velocidade: 80, resistencia: 96, tecnica: 85, defesa: 78 }
    }
];

function iniciarPaginaLutadores() {
    filtrarPorAba("todos");
    indiceAtual = 0;
    exibirLutador();
}

function filtrarPorAba(tipo) {
    abaAtual = tipo;

    // Atualiza visual dos botões (Acesso direto ao ID)
    if (tipo == "todos") {
        btnTodos.className = "botao-aba ativo";
        btnFavoritos.className = "botao-aba";
    }
    
    if (tipo == "favoritos") {
        btnTodos.className = "botao-aba";
        btnFavoritos.className = "botao-aba ativo";
    }

    listarLutadores();
}

function listarLutadores() {
    listaLutadores.innerHTML = "";
    var termo = inputBusca.value.toLowerCase();

    for (var i = 0; i < vetorAtletas.length; i++) {
        var atleta = vetorAtletas[i];
        var nomeMinusculo = atleta.nome.toLowerCase();

        var passouBusca = false;
        if (nomeMinusculo.indexOf(termo) >= 0) {
            passouBusca = true;
        }

        var passouAba = true;
        if (abaAtual == "favoritos") {
            if (atleta.favorito == false) {
                passouAba = false;
            }
        }

        if (passouBusca && passouAba) {
            var htmlEstrela = "";
            
            if (atleta.favorito == true) {
                htmlEstrela = '<span class="texto-dourado">★</span>';
            }

            listaLutadores.innerHTML += `
            <div class="item-lista" onclick="indiceAtual=${i}; exibirLutador()">
                <img src="${atleta.urlImagem}" class="foto-pequena">
                <div>
                    <span class="titulo-luta">
                        ${atleta.nome} 
                        ${htmlEstrela}
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

    nomePerfil.innerHTML = dados.nome + ' <span id="estrelaFavorito" class="estrela" onclick="alternarFavorito()"></span>';

    if (dados.favorito == true) {
        estrelaFavorito.innerHTML = "★";
        estrelaFavorito.className = "estrela estrela-amarela";
    }
    
    if (dados.favorito == false) {
        estrelaFavorito.innerHTML = "☆";
        estrelaFavorito.className = "estrela";
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
    var idUsuario = sessionStorage.ID_USUARIO;

    // Verifica se usuário está logado
    if (idUsuario == undefined) {
        alert("Você precisa fazer login para favoritar!");
        window.location = "login.html";
        return;
    }

    if (atleta.favorito == false) {
        atleta.favorito = true;
        
        // --- CÓDIGO NOVO: ENVIAR PARA O BANCO ---
        // Adiciona 1 ao índice porque no banco os IDs começam em 1
        var idLutadorBanco = indiceAtual + 1; 

        fetch("/usuarios/favoritar/lutador", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                idLutadorServer: idLutadorBanco
            })
        }).then(function(resposta) {
            if (resposta.ok) {
                console.log("Lutador favoritado com sucesso!");
            } else {
                console.log("Erro ao favoritar (Talvez já esteja favoritado?)");
            }
        });
        // ----------------------------------------

    } else {
        atleta.favorito = false;
        // (Opcional: futuramente você pode criar uma rota para remover o favorito)
        alert("Removido visualmente (remover do banco ainda não implementado)");
    }

    exibirLutador();
    listarLutadores();
}

function atualizarRadar(dados) {
    var ctx = graficoRadar.getContext('2d');

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