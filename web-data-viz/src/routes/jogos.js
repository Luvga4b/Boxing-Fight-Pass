var express = require("express");
var router = express.Router();
var jogoController = require("../controllers/jogoController");

router.post("/salvar", function (req, res) {
    console.log("route");
    jogoController.salvar(req, res);
});

module.exports = router;