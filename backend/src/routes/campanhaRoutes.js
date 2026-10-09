const { Router } = require("express");
const campanhaController = require("../controllers/campanhaController");

const router = Router();

// Rota de Healthcheck
router.get("/health", (req, res) => campanhaController.health(req, res));

// Rota 13: GET /api/v1/campanhas
router.get("/campanhas", (req, res) => campanhaController.listar(req, res));

// Rota 14: GET /api/v1/campanhas/:id
router.get("/campanhas/:id", (req, res) => campanhaController.buscarPorId(req, res));

module.exports = router;
