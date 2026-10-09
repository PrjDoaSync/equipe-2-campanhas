const { campanhasIniciais } = require("../data/fixtures");

class CampanhaService {
  constructor() {
    // Clona as fixtures para memória manipulável
    this.campanhas = JSON.parse(JSON.stringify(campanhasIniciais));
  }

  /**
   * Enriquece o objeto da campanha com métricas dinâmicas
   * conformes à especificação oficial do rotas-api.md.
   */
  enriquecerCampanha(campanha) {
    const meta = Number(campanha.metaValor) || 0;
    const arrecadado = Number(campanha.valorArrecadado) || 0;
    const percentual = meta > 0 ? (arrecadado / meta) * 100 : 0;

    // Regra oficial: recebendoDoacoes é true quando ATIVA
    const hoje = new Date().toISOString().slice(0, 10);
    const dataInicioValida = !campanha.dataInicio || hoje >= campanha.dataInicio;
    const dataFimValida = !campanha.dataFim || hoje <= campanha.dataFim;
    const recebendoDoacoes = campanha.status === "ATIVA" && dataInicioValida && dataFimValida;

    return {
      ...campanha,
      metaValor: Number(meta.toFixed(2)),
      valorArrecadado: Number(arrecadado.toFixed(2)),
      percentualAtingido: Number(percentual.toFixed(2)),
      recebendoDoacoes
    };
  }

  /**
   * Consulta pública e filtrada com paginação
   * RF12, RF14, CAM-T04 e rotas-api.md
   */
  listarCampanhas({ page = 1, limit = 10, busca = "", entidadeId = null, status = null }) {
    const numPage = Math.max(1, parseInt(page, 10) || 1);
    const numLimit = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));

    // Regra de ouro da especificação: campanhas em RASCUNHO nunca são expostas na consulta pública
    let filtradas = this.campanhas.filter((c) => c.status !== "RASCUNHO");

    // Filtro por status (se fornecido, ou padrão para ATIVA na consulta pública comum)
    if (status) {
      const statusUpper = status.toUpperCase();
      filtradas = filtradas.filter((c) => c.status === statusUpper);
    }

    // Filtro por busca textual (no título ou descrição)
    if (busca && busca.trim().length > 0) {
      const termo = busca.trim().toLowerCase();
      filtradas = filtradas.filter((c) =>
        (c.titulo && c.titulo.toLowerCase().includes(termo)) ||
        (c.descricao && c.descricao.toLowerCase().includes(termo)) ||
        (c.categoria && c.categoria.toLowerCase().includes(termo)) ||
        (c.entidade && c.entidade.nomeFantasia && c.entidade.nomeFantasia.toLowerCase().includes(termo))
      );
    }

    // Filtro por entidade
    if (entidadeId) {
      filtradas = filtradas.filter((c) => c.entidade && c.entidade.id === entidadeId);
    }

    const total = filtradas.length;
    const totalPages = Math.ceil(total / numLimit) || 1;
    const offset = (numPage - 1) * numLimit;
    const paginadas = filtradas.slice(offset, offset + numLimit);

    return {
      data: paginadas.map((c) => this.enriquecerCampanha(c)),
      meta: {
        total,
        page: numPage,
        limit: numLimit,
        totalPages
      }
    };
  }

  /**
   * Busca detalhada por ID
   * Rota 14: GET /api/v1/campanhas/{id}
   */
  buscarPorId(id) {
    const campanha = this.campanhas.find((c) => c.id === id);

    // Se não existir ou for rascunho em consulta pública, não expõe
    if (!campanha || campanha.status === "RASCUNHO") {
      return null;
    }

    return this.enriquecerCampanha(campanha);
  }

  /**
   * Método de criação para apoiar testes de integração da Sprint 1
   */
  criar(dados) {
    const novaCampanha = {
      id: `b2a1c3d4-6e7f-4a8b-9c0d-${Date.now().toString(16).padStart(12, "0")}`,
      titulo: dados.titulo,
      descricao: dados.descricao,
      metaValor: Number(dados.metaValor) || 0,
      valorArrecadado: 0.0,
      dataInicio: dados.dataInicio,
      dataFim: dados.dataFim,
      status: dados.status || "ATIVA",
      motivoDesativacao: null,
      imagemUrl: dados.imagemUrl || null,
      categoria: dados.categoria || "Geral",
      entidade: dados.entidade || {
        id: "a1b2c3d4-1111-4a8b-9c0d-1e2f3a4b5c01",
        razaoSocial: "Associação de Pais e Amigos dos Excepcionais - APAE",
        nomeFantasia: "APAE"
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.campanhas.unshift(novaCampanha);
    return this.enriquecerCampanha(novaCampanha);
  }
}

module.exports = new CampanhaService();
