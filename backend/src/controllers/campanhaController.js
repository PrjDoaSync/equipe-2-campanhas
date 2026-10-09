const campanhaService = require("../services/campanhaService");

class CampanhaController {
  /**
   * Rota 13: GET /api/v1/campanhas
   * Vitrine e listagem com busca, filtros e paginação
   */
  listar(req, res) {
    try {
      const { page, limit, busca, entidadeId, status } = req.query;

      const resultado = campanhaService.listarCampanhas({
        page,
        limit,
        busca,
        entidadeId,
        status
      });

      return res.status(200).json(resultado);
    } catch (error) {
      console.error("Erro ao listar campanhas:", error);
      return res.status(500).json({ error: "Erro interno no servidor ao listar campanhas." });
    }
  }

  /**
   * Rota 14: GET /api/v1/campanhas/:id
   * Detalhes de uma campanha específica
   */
  buscarPorId(req, res) {
    try {
      const { id } = req.params;

      if (!id || id.trim() === "") {
        return res.status(400).json({ error: "Identificador da campanha inválido." });
      }

      const campanha = campanhaService.buscarPorId(id.trim());

      if (!campanha) {
        return res.status(404).json({ error: "Campanha não encontrada." });
      }

      return res.status(200).json({ data: campanha });
    } catch (error) {
      console.error("Erro ao buscar campanha por ID:", error);
      return res.status(500).json({ error: "Erro interno no servidor ao buscar campanha." });
    }
  }

  /**
   * Rota de diagnóstico / Healthcheck
   */
  health(req, res) {
    return res.status(200).json({
      status: "UP",
      modulo: "Equipe 2 - Campanhas",
      versao: "1.0.0-sprint1",
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = new CampanhaController();
