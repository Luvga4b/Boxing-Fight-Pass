var database = require("../database/config");

function buscarKpis() {
    var instrucaoSql = `
        SELECT 
            (SELECT count(*) FROM Usuario) as totalUsuarios,
            (SELECT count(DISTINCT fkUsuario) FROM RegistroJogo) as totalJogadores;
    `;
    return database.executar(instrucaoSql);
}

function buscarGraficoLutadores() {
    // Conta quantos favoritos cada lutador tem
    var instrucaoSql = `
        SELECT l.nome, count(f.idFavoritoLuta) as votos
        FROM Lutador l
        LEFT JOIN FavoritoLutador f ON l.idLutador = f.fkLutador
        GROUP BY l.idLutador, l.nome
        ORDER BY votos DESC;
    `;
    return database.executar(instrucaoSql);
}

function buscarGraficoLutas() {
    // Conta quantos favoritos cada luta tem
    var instrucaoSql = `
        SELECT lt.titulo, count(fl.idFavorito) as votos
        FROM Luta lt
        LEFT JOIN FavoritoLuta fl ON lt.idLuta = fl.fkLuta
        GROUP BY lt.idLuta, lt.titulo
        ORDER BY votos DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpis,
    buscarGraficoLutadores,
    buscarGraficoLutas
}