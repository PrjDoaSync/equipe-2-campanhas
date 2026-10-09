/**
 * Fixtures em memória com dados representativos das entidades assistenciais
 * prioritárias do DoaSync: APAE e Associação Amor Inclusivo.
 * Conforme estabelecido no critério de aceite da task CAM-T04:
 * - Pelo menos três campanhas vinculadas a entidades;
 * - Casos com status ATIVA, ENCERRADA e RASCUNHO;
 * - Campanhas em RASCUNHO não devem ser expostas na listagem pública.
 */

const entidades = {
  apae: {
    id: "a1b2c3d4-1111-4a8b-9c0d-1e2f3a4b5c01",
    razaoSocial: "Associação de Pais e Amigos dos Excepcionais - APAE",
    nomeFantasia: "APAE",
    cnpj: "12.345.678/0001-90",
    cidade: "São Paulo",
    estado: "SP",
    logoUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=150&q=80"
  },
  amorInclusivo: {
    id: "a1b2c3d4-2222-4a8b-9c0d-1e2f3a4b5c02",
    razaoSocial: "Associação Amor Inclusivo de Apoio Comunitário",
    nomeFantasia: "Amor Inclusivo",
    cnpj: "98.765.432/0001-10",
    cidade: "Campinas",
    estado: "SP",
    logoUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=150&q=80"
  }
};

const campanhasIniciais = [
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c01",
    titulo: "Cadeiras de Rodas Adaptadas para Alunos da APAE",
    descricao: "Aquisição de 5 cadeiras de rodas sob medida com apoio ergonômico para atendimento e reabilitação de crianças e jovens assistidos na unidade.",
    metaValor: 12000.00,
    valorArrecadado: 7800.00,
    dataInicio: "2026-09-15",
    dataFim: "2026-11-30",
    status: "ATIVA",
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80",
    categoria: "Saúde e Mobilidade",
    entidade: entidades.apae,
    createdAt: "2026-09-15T09:00:00Z",
    updatedAt: "2026-10-08T14:30:00Z"
  },
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c02",
    titulo: "Reforma e Equipamentos da Sala de Fisioterapia e Estímulo",
    descricao: "Modernização do espaço terapêutico da Associação Amor Inclusivo, incluindo tatames terapêuticos, barras paralelas e brinquedos sensoriais.",
    metaValor: 15000.00,
    valorArrecadado: 11250.00,
    dataInicio: "2026-09-20",
    dataFim: "2026-12-15",
    status: "ATIVA",
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    categoria: "Infraestrutura",
    entidade: entidades.amorInclusivo,
    createdAt: "2026-09-20T11:00:00Z",
    updatedAt: "2026-10-08T16:00:00Z"
  },
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c03",
    titulo: "Cestas Básicas e Kits de Higiene para Famílias Atendidas",
    descricao: "Fornecimento de apoio nutricional e produtos de higiene pessoal para 80 famílias em situação de vulnerabilidade assistidas pela APAE.",
    metaValor: 8000.00,
    valorArrecadado: 3200.00,
    dataInicio: "2026-10-01",
    dataFim: "2026-11-20",
    status: "ATIVA",
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    categoria: "Assistência e Nutrição",
    entidade: entidades.apae,
    createdAt: "2026-10-01T08:30:00Z",
    updatedAt: "2026-10-08T10:15:00Z"
  },
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c04",
    titulo: "Oficinas de Artes e Música para Inclusão Social",
    descricao: "Contratação de materiais de pintura, instrumentos de percussão e instrutores para oficinas terapêuticas de expressão artística.",
    metaValor: 6000.00,
    valorArrecadado: 6000.00,
    dataInicio: "2026-08-01",
    dataFim: "2026-09-30",
    status: "ENCERRADA",
    motivoDesativacao: null,
    imagemUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    categoria: "Cultura e Educação",
    entidade: entidades.amorInclusivo,
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-09-30T23:59:59Z"
  },
  {
    id: "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c05",
    titulo: "Campanha em Elaboração Interna (Rascunho)",
    descricao: "Planejamento preliminar para aquisição de computadores adaptados. Não deve ser visível para o público.",
    metaValor: 20000.00,
    valorArrecadado: 0.0,
    dataInicio: "2026-12-01",
    dataFim: "2027-01-31",
    status: "RASCUNHO",
    motivoDesativacao: null,
    imagemUrl: null,
    categoria: "Tecnologia Assistiva",
    entidade: entidades.apae,
    createdAt: "2026-10-08T09:00:00Z",
    updatedAt: "2026-10-08T09:00:00Z"
  }
];

module.exports = {
  entidades,
  campanhasIniciais
};
