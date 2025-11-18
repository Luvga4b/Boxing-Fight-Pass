function fazerLogin() {
  var email = iptEmail.value;
  var senha = iptSenha.value;

  mensagemErro.innerHTML = "";
  mensagemErro.style.color = "#d13a3a";

  if (email == "" || senha == "") {
    mensagemErro.innerHTML = "Por favor, preencha todos os campos.";
  } else if (!email.includes("@")) {
    mensagemErro.innerHTML = "Por favor, insira um e-mail válido.";
  } else {
    if (email == "admin@boxing.com" && senha == "12345678") {
      mensagemErro.innerHTML = "Login efetuado com sucesso!";
      mensagemErro.style.color = "#9DC284";

      location.href = "dashboard.html";
    } else {
      mensagemErro.innerHTML = "E-mail ou senha inválidos.";
    }
  }
}