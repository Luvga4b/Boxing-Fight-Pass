function entrar() {
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;

    mensagemErro.innerHTML = "";
    
    if (emailVar == "" || senhaVar == "") {
        mensagemErro.className = "texto-erro";
        mensagemErro.innerHTML = "Preencha todos os campos.";
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.IS_ADM = json.isAdm;

                mensagemErro.className = "texto-sucesso";
                mensagemErro.innerHTML = "Sucesso! Entrando...";

                setTimeout(function () {
                if(sessionStorage.IS_ADM == 1)
                    {
                        window.location = "dashboard-kpi.html";
                    }else{
                        window.location = "estatisticas.html";
                    }
                    
                }, 1000);
            });
        } else {
            console.log("Erro de login!");
            mensagemErro.className = "texto-erro";
            mensagemErro.innerHTML = "Email ou senha incorretos.";
        }
    }).catch(function (erro) {
        console.log(erro);
    });
    return false;
}