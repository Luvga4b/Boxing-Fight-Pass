var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nome, email,isAdm FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function favoritarLutador(idUsuario, idLutador) {
    console.log("model");
    console.log(idUsuario);
    console.log(idLutador);
    var instrucao = `INSERT INTO FavoritoLutador (fkUsuario, fkLutador) VALUES (${idUsuario}, ${idLutador});`;
    return database.executar(instrucao);
}

function favoritarLuta(idUsuario, idLuta) {
    // Atenção: Certifique-se que o idLuta 1, 2, 3 existem no banco (Tabela Luta)
    var instrucao = `INSERT INTO FavoritoLuta (fkUsuario, fkLuta) VALUES (${idUsuario}, ${idLuta});`;
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    favoritarLutador,
    favoritarLuta
};