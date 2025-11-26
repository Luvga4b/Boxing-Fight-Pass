var vidaCarro = 100;

function bater() {
  var imgLutador = document.getElementById("imgLutador");
  var imgCarro = document.getElementById("imgCarro");
  
  // Caminho corrigido para assets/
  imgLutador.src = "assets/lutadorSocando.png"; 
  
  var dano = Math.random() * 10 + 5;
  var danoInteiro = parseInt(dano);
  vidaCarro = vidaCarro - danoInteiro;
  
  if (vidaCarro < 0) { vidaCarro = 0; }

  spanVida.innerHTML = vidaCarro;
  mensagemAcao.innerHTML = "POW! Você causou " + danoInteiro + " de dano!";

  if (vidaCarro <= 0) {
    console.log("entrou")
    imgCarro.src = "assets/carroDestruido.png";
    mensagemAcao.innerHTML = "PERFECT! CARRO DESTRUÍDO!";
    mensagemAcao.style.color = "#d13a3a";

    // SALVAR NO BANCO
    var idUsuario = sessionStorage.ID_USUARIO;
    if (idUsuario > 0) {
        fetch("/jogos/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                pontuacaoServer: 100,
                resultadoServer: 'Carro Destruido'
            })
        }).then(res => {
          alert("Parabéns carro destruido com sucesso");
          reiniciarJogo();
        }
        )
    }

  } else if (vidaCarro < 50) {
    imgCarro.src = "assets/carroDanificado.png";
  }
}

function voltar() {
  document.getElementById("imgLutador").src = "assets/lutadorParado.png";
}

function reiniciarJogo() {
  vidaCarro = 100;
  spanVida.innerHTML = vidaCarro;
  mensagemAcao.innerHTML = "Prepare-se...";
  mensagemAcao.style.color = "white";
  document.getElementById("imgCarro").src = "assets/carroNovo.png";
  document.getElementById("imgLutador").src = "assets/lutadorParado.png";
}