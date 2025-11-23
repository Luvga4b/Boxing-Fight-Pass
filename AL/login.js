function entrar() {
    var email = iptEmail.value;
    var senha = iptSenha.value;

    mensagemErro.innerHTML = "";
    mensagemErro.style.color = "#d13a3a";

    if (email == "" || senha == "") {
        mensagemErro.innerHTML = "Preencha todos os campos.";
    } else {
        if (email == "admin@sptech.school" && senha == "12345678") {
            mensagemErro.style.color = "#9DC284";
            mensagemErro.innerHTML = "Sucesso! Entrando...";
            
            window.location.href = "estatisticas.html";
        } else {
            mensagemErro.innerHTML = "E-mail ou senha incorretos.";
        }
    }
}