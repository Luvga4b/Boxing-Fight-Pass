var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/geral", function (req, res) {
    dashboardController.buscarDadosGerais(req, res);
});

router.get("/grafico/lutadores", function (req, res) {
    dashboardController.buscarGraficoLutadores(req, res);
});

router.get("/grafico/lutas", function (req, res) {
    dashboardController.buscarGraficoLutas(req, res);
});

module.exports = router;