var database = require("../database/config");

function salvar(idUsuario, resultado, pontuacao) {
    // Insere na tabela RegistroJogo
    console.log("model");
    console.log(idUsuario);
    var instrucaoSql = `
        INSERT INTO RegistroJogo (fkUsuario, resultado, pontuacao) VALUES (${idUsuario}, '${resultado}', ${pontuacao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar
}