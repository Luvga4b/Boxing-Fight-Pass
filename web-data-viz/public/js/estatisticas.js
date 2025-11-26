/* estatisticas.js */

var chartRosca = null;
var chartBarras = null;
var indiceAtual = 0;
var abaAtual = "todos"; 

var vetorLutas = [
  { 
    titulo: "Tyson vs Holyfield", 
    campeonato: "WBA", 
    ano: 1996, 
    categoria: "Pesado",
    favorito: false,
    estatisticasLuta: { golpesA: 150, golpesB: 180 },
    lutadorA: {
      nome: "Mike Tyson",
      idade: "30", 
      altura: 1.78,
      alcance: 1.80,
      cartelTexto: "50-6-0", 
      urlImagem: "https://cdn.fightfax.com/profiles_avatar/pictures/mike-tyson-991330-1730802287.png",
      vitoriasKo: 44,
      vitoriasDecisao: 6,
      resultadoLuta: "PERDEDOR (TKO)"
    },
    lutadorB: {
      nome: "Evander Holyfield",
      idade: "34",
      altura: 1.89,
      alcance: 1.97,
      cartelTexto: "44-10-2",
      urlImagem: "https://static.wixstatic.com/media/2af6dc_16b0ede7e09a4b1487e92206a9348825~mv2.png/v1/crop/x_0,y_0,w_500,h_499/fill/w_502,h_504,fp_0.50_0.50,lg_1,q_85,enc_avif,quality_auto/real%20deal-3.png",
      vitoriasKo: 29,
      vitoriasDecisao: 15,
      resultadoLuta: "VENCEDOR"
    }
  },
  { 
    titulo: "Ali vs Frazier", 
    campeonato: "WBC", 
    ano: 1975, 
    categoria: "Pesado",
    favorito: false,
    estatisticasLuta: { golpesA: 230, golpesB: 200 },
    lutadorA: {
      nome: "Muhammad Ali",
      idade: "33",
      altura: 1.91,
      alcance: 1.98,
      cartelTexto: "56-5-0",
      urlImagem: "https://cdn.britannica.com/86/192386-050-D7F3126D/Muhammad-Ali-American.jpg", 
      vitoriasKo: 37,
      vitoriasDecisao: 19,
      resultadoLuta: "VENCEDOR"
    },
    lutadorB: {
      nome: "Joe Frazier",
      idade: "31",
      altura: 1.82,
      alcance: 1.85,
      cartelTexto: "32-4-1",
      urlImagem: "https://cdn.britannica.com/93/225193-050-73961219/American-boxer-Joe-Frazier-1969.jpg", 
      vitoriasKo: 27,
      vitoriasDecisao: 5,
      resultadoLuta: "PERDEDOR"
    }
  }
];

function iniciarPagina() {
  clicarAba("todos");
  indiceAtual = 0;
  carregarLuta();
}

function clicarAba(novaAba) {
    abaAtual = novaAba;
    
    // Atualiza visual dos botões
    if (abaAtual == "todos") {
        btnTodos.className = "botao-aba ativo";
        btnFavoritos.className = "botao-aba";
    } 
    
    if (abaAtual == "favoritos") {
        btnTodos.className = "botao-aba";
        btnFavoritos.className = "botao-aba ativo";
    }

    listarLutas();
}

function listarLutas() {
  listaDeLutas.innerHTML = "";

  var termo = inputBusca.value.toLowerCase();
  var filtroCamp = selectCampeonato.value;
  var filtroCat = selectCategoria.value;
  var filtroAno = inputAno.value;

  for (var i = 0; i < vetorLutas.length; i++) {
    var luta = vetorLutas[i];
    var tituloMin = luta.titulo.toLowerCase();

    // Filtros sequenciais
    var passouBusca = false;
    if (tituloMin.indexOf(termo) >= 0) {
        passouBusca = true;
    }

    var passouCamp = false;
    if (filtroCamp == "" || luta.campeonato == filtroCamp) {
        passouCamp = true;
    }

    var passouCat = false;
    if (filtroCat == "" || luta.categoria == filtroCat) {
        passouCat = true;
    }

    var passouAno = false;
    if (filtroAno == "" || luta.ano == filtroAno) {
        passouAno = true;
    }
    
    var passouAba = true;
    if (abaAtual == "favoritos") {
        if (luta.favorito == false) {
            passouAba = false;
        }
    }

    if (passouBusca && passouCamp && passouCat && passouAno && passouAba) {
        listaDeLutas.innerHTML += `
          <div class="item-lista" onclick="indiceAtual = ${i}; carregarLuta()">
            <img src="${luta.lutadorA.urlImagem}" class="foto-pequena">
            <div>
                <span class="titulo-luta">${luta.titulo}</span>
                <span class="detalhe-luta">${luta.campeonato} | ${luta.ano} | ${luta.categoria}</span>
            </div>
          </div>
        `;
    }
  }
}

function filtrarLutas() {
    listarLutas();
}

function carregarLuta() {
  var dados = vetorLutas[indiceAtual];

  subtituloLuta.innerHTML = `${dados.lutadorA.nome} vs ${dados.lutadorB.nome} (${dados.ano})`;

  // Configuração Lutador A
  nomeLutadorA.innerHTML = dados.lutadorA.nome + ' <span id="estrelaA" class="estrela" onclick="clicarEstrela()">☆</span>';
  imgLutadorA.src = dados.lutadorA.urlImagem;
  idadeA.innerHTML = dados.lutadorA.idade;
  alturaA.innerHTML = dados.lutadorA.altura;
  alcanceA.innerHTML = dados.lutadorA.alcance;
  cartelA.innerHTML = dados.lutadorA.cartelTexto;
  
  statusA.innerHTML = dados.lutadorA.resultadoLuta;
  if (dados.lutadorA.resultadoLuta.indexOf("VENCEDOR") >= 0) {
      statusA.className = "badge badgeVencedor";
  } else {
      statusA.className = "badge badgePerdedor";
  }

  // Configuração Lutador B
  nomeLutadorB.innerHTML = dados.lutadorB.nome + ' <span id="estrelaB" class="estrela" onclick="clicarEstrela()">☆</span>';
  imgLutadorB.src = dados.lutadorB.urlImagem;
  idadeB.innerHTML = dados.lutadorB.idade;
  alturaB.innerHTML = dados.lutadorB.altura;
  alcanceB.innerHTML = dados.lutadorB.alcance;
  cartelB.innerHTML = dados.lutadorB.cartelTexto;
  
  statusB.innerHTML = dados.lutadorB.resultadoLuta;
  if (dados.lutadorB.resultadoLuta.indexOf("VENCEDOR") >= 0) {
      statusB.className = "badge badgeVencedor";
  } else {
      statusB.className = "badge badgePerdedor";
  }

  // Configuração Estrelas (Favoritos)
  if (dados.favorito == true) {
      estrelaA.className = "estrela estrela-amarela";
      estrelaA.innerHTML = "★";
      estrelaB.className = "estrela estrela-amarela";
      estrelaB.innerHTML = "★";
  } else {
      estrelaA.className = "estrela";
      estrelaA.innerHTML = "☆";
      estrelaB.className = "estrela";
      estrelaB.innerHTML = "☆";
  }

  atualizarGraficos();
}

function clicarEstrela() {
    var dados = vetorLutas[indiceAtual];
    var idUsuario = sessionStorage.ID_USUARIO;

    if (idUsuario == undefined) {
        alert("Faça login para favoritar lutas!");
        window.location = "login.html";
        return;
    }

    if (dados.favorito == false) {
        dados.favorito = true;
        alert("Luta favoritada!");

        // --- CÓDIGO NOVO: ENVIAR PARA O BANCO ---
        var idLutaBanco = indiceAtual + 1; 

        fetch("/usuarios/favoritar/luta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                idLutaServer: idLutaBanco
            })
        }).then(function(resposta) {
            if (resposta.ok) {
                console.log("Luta favoritada no banco!");
            }
        });
        // ----------------------------------------

    } else {
        dados.favorito = false;
    }

    carregarLuta();
    listarLutas();
}

function atualizarGraficos() {
  var dados = vetorLutas[indiceAtual];

  if (chartRosca != null) {
    chartRosca.destroy();
  }
  if (chartBarras != null) {
    chartBarras.destroy();
  }

  // Gráfico Rosca
  var contextoRosca = graficoRosca.getContext("2d");
  chartRosca = new Chart(contextoRosca, {
    type: "doughnut",
    data: {
      labels: ["KO (A)", "Decisão (A)", "KO (B)", "Decisão (B)"],
      datasets: [{
        data: [
          dados.lutadorA.vitoriasKo,
          dados.lutadorA.vitoriasDecisao,
          dados.lutadorB.vitoriasKo,
          dados.lutadorB.vitoriasDecisao
        ],
        backgroundColor: ["#d13a3a", "#882525", "#ffffff", "#cccccc"],
        borderWidth: 0
      }]
    },
    options: {
      plugins: { legend: { labels: { color: "white" } } }
    }
  });

  // Gráfico Barras
  var contextoBarras = graficoBarras.getContext("2d");
  chartBarras = new Chart(contextoBarras, {
    type: "bar",
    data: {
      labels: ["Golpes Conectados"],
      datasets: [
        {
          label: dados.lutadorA.nome,
          data: [dados.estatisticasLuta.golpesA],
          backgroundColor: "#d13a3a"
        },
        {
          label: dados.lutadorB.nome,
          data: [dados.estatisticasLuta.golpesB],
          backgroundColor: "#ffffff"
        }
      ]
    },
    options: {
      plugins: { legend: { labels: { color: "white" } } },
      scales: {
        y: { ticks: { color: "white" }, grid: { color: "#444" } },
        x: { ticks: { color: "white" }, grid: { display: false } }
      }
    }
  });
}