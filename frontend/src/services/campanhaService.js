/**
 * Camada de serviço de integração com a API de Campanhas (CAM-T04 / CAM-T05).
 * Respeita o contrato oficial de rotas definido em rotas-api.md.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

// Fixtures locais para fallback caso o backend não esteja executando
const MOCK_CAMPANHAS = [
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c01",
    titulo: "Cadeiras de Rodas Adaptadas para Alunos da APAE",
    descricao: "Aquisição de 5 cadeiras de rodas sob medida com apoio ergonômico para atendimento e reabilitação de crianças e jovens assistidos na unidade.",
    metaValor: 12000.00,
    valorArrecadado: 7800.00,
    percentualAtingido: 65.00,
    dataInicio: "2026-09-15",
    dataFim: "2026-11-30",
    status: "ATIVA",
    recebendoDoacoes: true,
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80",
    categoria: "Saúde e Mobilidade",
    entidade: {
      id: "a1b2c3d4-1111-4a8b-9c0d-1e2f3a4b5c01",
      razaoSocial: "Associação de Pais e Amigos dos Excepcionais - APAE",
      nomeFantasia: "APAE",
      cidade: "São Paulo",
      estado: "SP"
    }
  },
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c02",
    titulo: "Reforma e Equipamentos da Sala de Fisioterapia e Estímulo",
    descricao: "Modernização do espaço terapêutico da Associação Amor Inclusivo, incluindo tatames terapêuticos, barras paralelas e brinquedos sensoriais.",
    metaValor: 15000.00,
    valorArrecadado: 11250.00,
    percentualAtingido: 75.00,
    dataInicio: "2026-09-20",
    dataFim: "2026-12-15",
    status: "ATIVA",
    recebendoDoacoes: true,
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    categoria: "Infraestrutura",
    entidade: {
      id: "a1b2c3d4-2222-4a8b-9c0d-1e2f3a4b5c02",
      razaoSocial: "Associação Amor Inclusivo de Apoio Comunitário",
      nomeFantasia: "Amor Inclusivo",
      cidade: "Campinas",
      estado: "SP"
    }
  },
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c03",
    titulo: "Cestas Básicas e Kits de Higiene para Famílias Atendidas",
    descricao: "Fornecimento de apoio nutricional e produtos de higiene pessoal para 80 famílias em situação de vulnerabilidade assistidas pela APAE.",
    metaValor: 8000.00,
    valorArrecadado: 3200.00,
    percentualAtingido: 40.00,
    dataInicio: "2026-10-01",
    dataFim: "2026-11-20",
    status: "ATIVA",
    recebendoDoacoes: true,
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    categoria: "Assistência e Nutrição",
    entidade: {
      id: "a1b2c3d4-1111-4a8b-9c0d-1e2f3a4b5c01",
      razaoSocial: "Associação de Pais e Amigos dos Excepcionais - APAE",
      nomeFantasia: "APAE",
      cidade: "São Paulo",
      estado: "SP"
    }
  },
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c04",
    titulo: "Oficinas de Artes e Música para Inclusão Social",
    descricao: "Contratação de materiais de pintura, instrumentos de percussão e instrutores para oficinas terapêuticas de expressão artística.",
    metaValor: 6000.00,
    valorArrecadado: 6000.00,
    percentualAtingido: 100.00,
    dataInicio: "2026-08-01",
    dataFim: "2026-09-30",
    status: "ENCERRADA",
    recebendoDoacoes: false,
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    categoria: "Cultura e Educação",
    entidade: {
      id: "a1b2c3d4-2222-4a8b-9c0d-1e2f3a4b5c02",
      razaoSocial: "Associação Amor Inclusivo de Apoio Comunitário",
      nomeFantasia: "Amor Inclusivo",
      cidade: "Campinas",
      estado: "SP"
    }
  }
];

export const campanhaService = {
  getBaseUrl() {
    return API_BASE_URL;
  },

  /**
   * Consulta a lista de campanhas via API com suporte a filtros e busca
   */
  async listarCampanhas({ busca = "", status = "", entidadeId = "" } = {}) {
    const params = new URLSearchParams();
    if (busca) params.append("busca", busca);
    if (status && status !== "TODAS") params.append("status", status);
    if (entidadeId) params.append("entidadeId", entidadeId);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const url = `${API_BASE_URL}/campanhas${queryString}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na API (${response.status}): ${response.statusText}`);
      }

      const json = await response.json();
      return {
        data: json.data || [],
        meta: json.meta || { total: json.data.length, page: 1, limit: 10, totalPages: 1 },
        isFallback: false
      };
    } catch (err) {
      console.warn("Backend indisponível no endpoint real. Utilizando fallback local para demonstração:", err);

      // Aplica os filtros em memória sobre o mock fallback
      let filtradas = MOCK_CAMPANHAS;
      if (status && status !== "TODAS") {
        filtradas = filtradas.filter((c) => c.status === status);
      }
      if (busca) {
        const termo = busca.toLowerCase();
        filtradas = filtradas.filter((c) =>
          c.titulo.toLowerCase().includes(termo) ||
          c.descricao.toLowerCase().includes(termo) ||
          c.categoria.toLowerCase().includes(termo)
        );
      }
      if (entidadeId) {
        filtradas = filtradas.filter((c) => c.entidade.id === entidadeId);
      }

      return {
        data: filtradas,
        meta: { total: filtradas.length, page: 1, limit: 10, totalPages: 1 },
        isFallback: true,
        errorMessage: err.message
      };
    }
  },

  /**
   * Busca detalhes de uma campanha por ID
   */
  async buscarPorId(id) {
    const url = `${API_BASE_URL}/campanhas/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.status === 404) {
        return { data: null, notFound: true, isFallback: false };
      }

      if (!response.ok) {
        throw new Error(`Erro ao buscar campanha (${response.status})`);
      }

      const json = await response.json();
      return { data: json.data, notFound: false, isFallback: false };
    } catch (err) {
      console.warn("Backend offline. Buscando no fallback local:", err);
      const encontrada = MOCK_CAMPANHAS.find((c) => c.id === id);
      return {
        data: encontrada || null,
        notFound: !encontrada,
        isFallback: true,
        errorMessage: err.message
      };
    }
  }
};
