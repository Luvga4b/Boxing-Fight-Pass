function fazerCadastro() {
    var nomeVar = iptNome.value;
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    var confirmacaoVar = iptConfirmarSenha.value;

    mensagemErro.innerHTML = "";

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoVar == "") {
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "Preencha todos os campos.";
        return false;
    }
    if (senhaVar != confirmacaoVar) {
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "As senhas não coincidem.";
        return false;
    }

    // Enviando para API
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            mensagemErro.className = "msg texto-sucesso";
            mensagemErro.innerHTML = "Cadastro realizado! Redirecionando...";
            setTimeout(() => {
                window.location = "login.html";
            }, 2000);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        mensagemErro.className = "msg texto-erro";
        mensagemErro.innerHTML = "Erro ao cadastrar (Email já existe?)";
    });

    return false;
}