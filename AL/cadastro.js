function fazerCadastro() {
    var nome = iptNome.value;
    var email = iptEmail.value;
    var senha = iptSenha.value;
    var confirmacao = iptConfirmarSenha.value;

    mensagemErro.innerHTML = "";
    
    if (nome == "" || email == "" || senha == "" || confirmacao == "") {
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "Por favor, preencha todos os campos.";
    } else if (nome.length < 3) {
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "O nome deve ter pelo menos 3 caracteres.";
    } else if (email.indexOf("@") < 0) {
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "Por favor, insira um e-mail válido.";
    } else if (senha.length < 8) {
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "A senha deve ter pelo menos 8 caracteres.";
    } else if (senha != confirmacao) {
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "As senhas não coincidem.";
    } else {
        mensagemErro.className = "msg texto-sucesso";
        mensagemErro.innerHTML = "Cadastro realizado! Redirecionando...";
        
        window.location.href = "login.html";
    }
}