function fazerCadastro() {

  var nome = iptNome.value;
  var email = iptEmail.value;
  var senha = iptSenha.value;
  var confirmacao = iptConfirmarSenha.value;

  mensagemErro.innerHTML = "";
  mensagemErro.style.color = "#d13a3a";

  if (nome == "" || email == "" || senha == "" || confirmacao == "") {
    mensagemErro.innerHTML = "Por favor, preencha todos os campos.";
  } else if (nome.length < 3) {
    mensagemErro.innerHTML = "O nome deve ter pelo menos 3 caracteres.";
  } else if (!email.includes("@")) {
    mensagemErro.innerHTML = "Por favor, insira um e-mail válido.";
  } else if (senha.length < 8) {
    mensagemErro.innerHTML = "A senha deve ter pelo menos 8 caracteres.";
  } else if (senha != confirmacao) {
    mensagemErro.innerHTML = "As senhas não coincidem.";
  } else {
    mensagemErro.innerHTML = "Cadastro realizado com sucesso!";
    mensagemErro.style.color = "#9DC284";


    location.href = "login.html";
  }
}