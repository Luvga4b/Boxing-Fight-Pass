// Função para validar e atualizar o cabeçalho da Home (index.html)
function validarSessaoIndex() {
    var idUsuario = sessionStorage.ID_USUARIO;
    
    var menuDeslogado = document.getElementById("menuDeslogado");
    var menuLogado = document.getElementById("menuLogado");

    // Se houver usuário logado (ID salvo na sessão)
    if (idUsuario != null) {
        // Esconde botões de login/cadastro
        if(menuDeslogado) menuDeslogado.style.display = "none";
        
        // Mostra botões de sistema/sair e aplica layout flex para alinhar
        if(menuLogado) {
            menuLogado.style.display = "flex"; 
        }
    } else {
        // Se NÃO tiver usuário (Deslogado)
        if(menuDeslogado) menuDeslogado.style.display = "block";
        if(menuLogado) menuLogado.style.display = "none";
    }
}

// Função para limpar a sessão (Deslogar)
function sair() {
    sessionStorage.clear(); // Limpa todos os dados salvos
    window.location.reload(); // Recarrega a página para atualizar o menu
}