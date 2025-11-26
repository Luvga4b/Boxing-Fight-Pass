var database = require("../database/config");

function salvar(idUsuario, resultado, pontuacao) {
    // Insere na tabela RegistroJogo
    var instrucaoSql = `
        INSERT INTO RegistroJogo (fkUsuario, resultado, pontuacao) VALUES (${idUsuario}, '${resultado}', ${pontuacao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar
}