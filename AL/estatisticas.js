var vetorLutas = [
  { titulo: "Tyson vs Holyfield", campeonato: "WBA", ano: 1996, categoria: "Pesado" },
  { titulo: "Ali vs Frazier", campeonato: "WBC", ano: 1975, categoria: "Pesado" },
  { titulo: "Popó vs Castillo", campeonato: "WBO", ano: 2000, categoria: "Leve" },
  { titulo: "Mayweather vs Pacquiao", campeonato: "WBA", ano: 2015, categoria: "Medio" },
  { titulo: "Fury vs Wilder", campeonato: "WBC", ano: 2020, categoria: "Pesado" },
  { titulo: "Canelo vs GGG", campeonato: "IBF", ano: 2017, categoria: "Medio" }
];

function iniciarPagina() {
  carregarDadosLutaPrincipal();
  listarLutas(vetorLutas);
}

function listarLutas(lista) {
  listaDeLutas.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var luta = lista[i];
    listaDeLutas.innerHTML += `
      <div class="itemLista">
        <span class="itemTitulo">${luta.titulo}</span>
        <span class="itemDetalhe">${luta.campeonato} | ${luta.ano} | ${luta.categoria}</span>
      </div>
    `;
  }
}

function filtrarLutas() {
  var termoBusca = inputBusca.value.toLowerCase();
  var termoCampeonato = selectCampeonato.value;
  var termoAno = inputAno.value;
  var termoCategoria = selectCategoria.value;

  var listaFiltrada = [];

  for (var i = 0; i < vetorLutas.length; i++) {
    var luta = vetorLutas[i];
    
    var bateuBusca = luta.titulo.toLowerCase().includes(termoBusca);
    var bateuCampeonato = termoCampeonato == "" || luta.campeonato == termoCampeonato;
    var bateuAno = termoAno == "" || luta.ano == termoAno;
    var bateuCategoria = termoCategoria == "" || luta.categoria == termoCategoria;

    if (bateuBusca && bateuCampeonato && bateuAno && bateuCategoria) {
      listaFiltrada.push(luta);
    }
  }

  listarLutas(listaFiltrada);
}

function carregarDadosLutaPrincipal() {
  var dadosLuta = {
    anoEvento: "1996", // ADICIONADO O ANO DA LUTA AQUI
    lutadorA: {
      nome: "Mike Tyson",
      idade: "30",
      altura: "1.78 m",
      alcance: "1.80 m",
      cartel: "45-1-0",
      foto: "https://cdn.fightfax.com/profiles_avatar/pictures/mike-tyson-991330-1730802287.png",
      vitoriasKo: 44,
      vitoriasDecisao: 1,
      resultado: "PERDEDOR (TKO)"
    },
    lutadorB: {
      nome: "Evander Holyfield",
      idade: "34",
      altura: "1.89 m",
      alcance: "1.97 m",
      cartel: "32-3-0",
      foto: "https://static.wixstatic.com/media/2af6dc_16b0ede7e09a4b1487e92206a9348825~mv2.png/v1/crop/x_0,y_0,w_500,h_499/fill/w_502,h_504,fp_0.50_0.50,lg_1,q_85,enc_avif,quality_auto/real%20deal-3.png",
      vitoriasKo: 23,
      vitoriasDecisao: 9,
      resultado: "VENCEDOR"
    },
    estatisticasGolpes: {
      tysonConectados: 150,
      holyfieldConectados: 180
    }
  };


  subtituloLuta.innerHTML = `${dadosLuta.lutadorA.nome} vs ${dadosLuta.lutadorB.nome} (${dadosLuta.anoEvento}) - Estatísticas Oficiais`;

  nomeLutadorA.innerHTML = dadosLuta.lutadorA.nome;
  imgLutadorA.src = dadosLuta.lutadorA.foto;
  idadeA.innerHTML = dadosLuta.lutadorA.idade;
  alturaA.innerHTML = dadosLuta.lutadorA.altura;
  alcanceA.innerHTML = dadosLuta.lutadorA.alcance;
  cartelA.innerHTML = dadosLuta.lutadorA.cartel;
  
  statusA.innerHTML = dadosLuta.lutadorA.resultado;
  if (dadosLuta.lutadorA.resultado.includes("VENCEDOR")) {
    statusA.className = "badgeStatus badgeVencedor";
  } else {
    statusA.className = "badgeStatus badgePerdedor";
  }

  nomeLutadorB.innerHTML = dadosLuta.lutadorB.nome;
  imgLutadorB.src = dadosLuta.lutadorB.foto;
  idadeB.innerHTML = dadosLuta.lutadorB.idade;
  alturaB.innerHTML = dadosLuta.lutadorB.altura;
  alcanceB.innerHTML = dadosLuta.lutadorB.alcance;
  cartelB.innerHTML = dadosLuta.lutadorB.cartel;

  statusB.innerHTML = dadosLuta.lutadorB.resultado;
  if (dadosLuta.lutadorB.resultado.includes("VENCEDOR")) {
    statusB.className = "badgeStatus badgeVencedor";
  } else {
    statusB.className = "badgeStatus badgePerdedor";
  }

  var contextoRosca = graficoRosca.getContext("2d");
  new Chart(contextoRosca, {
    type: "doughnut",
    data: {
      labels: ["Nocautes (Tyson)", "Decisão (Tyson)", "Nocautes (Holyfield)", "Decisão (Holyfield)"],
      datasets: [{
        data: [
          dadosLuta.lutadorA.vitoriasKo,
          dadosLuta.lutadorA.vitoriasDecisao,
          dadosLuta.lutadorB.vitoriasKo,
          dadosLuta.lutadorB.vitoriasDecisao
        ],
        backgroundColor: ["#d13a3a", "#882525", "#ffffff", "#cccccc"],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      }
    }
  });

  var contextoBarras = graficoBarras.getContext("2d");
  new Chart(contextoBarras, {
    type: "bar",
    data: {
      labels: ["Golpes Conectados"],
      datasets: [
        {
          label: dadosLuta.lutadorA.nome,
          data: [dadosLuta.estatisticasGolpes.tysonConectados],
          backgroundColor: "#d13a3a"
        },
        {
          label: dadosLuta.lutadorB.nome,
          data: [dadosLuta.estatisticasGolpes.holyfieldConectados],
          backgroundColor: "#ffffff"
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      },
      scales: {
        y: {
          ticks: { color: "white" },
          grid: { color: "#444" }
        },
        x: {
          ticks: { color: "white" },
          grid: { display: false }
        }
      }
    }
  });
}