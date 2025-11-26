var express = require("express");
var router = express.Router();
var jogoController = require("../controllers/jogoController");

router.post("/salvar", function (req, res) {
    jogoController.salvar(req, res);
});

module.exports = router;