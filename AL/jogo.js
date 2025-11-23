var vidaCarro = 100;

function bater() {

  imgLutador.src = "sprites/lutadorSocando.png";
  var dano = Math.random() * 10 + 5;
  var danoInteiro = parseInt(dano);
  vidaCarro = vidaCarro - danoInteiro;
  if (vidaCarro < 0) {
    vidaCarro = 0;
  }

  spanVida.innerHTML = vidaCarro;
  mensagemAcao.innerHTML = `POW! Você causou ${danoInteiro} de dano!`;

  if (vidaCarro <= 0) {
    imgCarro.src = "sprites/carroDestruido.png";
    mensagemAcao.innerHTML = "PERFECT! CARRO DESTRUÍDO!";
    mensagemAcao.style.color = "#d13a3a";
  } else if (vidaCarro < 50) {
    imgCarro.src = "sprites/carroDanificado.png";
  }
}

function voltar() {
  imgLutador.src = "sprites/lutadorParado.png";
}

function reiniciarJogo() {
  vidaCarro = 100;
  spanVida.innerHTML = vidaCarro;
  mensagemAcao.innerHTML = "Prepare-se...";
  mensagemAcao.style.color = "white";
  imgCarro.src = "sprites/carroNovo.png";
  imgLutador.src = "sprites/lutadorParado.png";
}