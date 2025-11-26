var dashboardModel = require("../models/dashboardModel");

function buscarDadosGerais(req, res) {
    dashboardModel.buscarKpis().then(function (resultado) {
        res.json(resultado);
    }).catch(function (erro) { res.status(500).json(erro.sqlMessage); });
}

function buscarGraficoLutadores(req, res) {
    dashboardModel.buscarGraficoLutadores().then(function (resultado) {
        res.json(resultado);
    }).catch(function (erro) { res.status(500).json(erro.sqlMessage); });
}

function buscarGraficoLutas(req, res) {
    dashboardModel.buscarGraficoLutas().then(function (resultado) {
        res.json(resultado);
    }).catch(function (erro) { res.status(500).json(erro.sqlMessage); });
}

module.exports = { buscarDadosGerais, buscarGraficoLutadores, buscarGraficoLutas }