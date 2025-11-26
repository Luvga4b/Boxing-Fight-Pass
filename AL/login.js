function entrar() {
    var email = iptEmail.value;
    var senha = iptSenha.value;

    mensagemErro.innerHTML = "";
    
    if (email == "" || senha == "") {
        mensagemErro.className = "texto-erro";
        mensagemErro.innerHTML = "Preencha todos os campos.";
    } else {
        if (email == "admin@sptech.school" && senha == "12345678") {
            mensagemErro.className = "texto-sucesso";
            mensagemErro.innerHTML = "Sucesso! Entrando...";
            
            window.location.href = "estatisticas.html";
        } else {
            mensagemErro.className = "texto-erro";
            mensagemErro.innerHTML = "E-mail ou senha incorretos.";
        }
    }
}