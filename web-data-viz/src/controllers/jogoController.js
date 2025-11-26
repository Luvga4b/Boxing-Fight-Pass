var jogoModel = require("../models/jogoModel");

function salvar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var pontuacao = req.body.pontuacaoServer;
    var resultado = req.body.resultadoServer;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
    } else {
         console.log("controller");
         console.log(idUsuario);
        jogoModel.salvar(idUsuario, resultado, pontuacao)
            .then(function (resultado) { res.json(resultado); })
            .catch(function (erro) { res.status(500).json(erro.sqlMessage); });
    }
}

module.exports = { 
    salvar
 }