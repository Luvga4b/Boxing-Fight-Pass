var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// --- ADICIONE ISTO AQUI ---
router.post("/favoritar/lutador", function (req, res) {
    usuarioController.favoritarLutador(req, res);
});

router.post("/favoritar/luta", function (req, res) {
    usuarioController.favoritarLuta(req, res);
});
// --------------------------

module.exports = router;