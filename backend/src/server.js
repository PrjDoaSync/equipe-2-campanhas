const express = require("express");
const cors = require("cors");
const campanhaRoutes = require("./routes/campanhaRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// Configuração de CORS para permitir acesso dos frontends locais
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// Log simples de requisições
app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
  next();
});

// Prefixo padrão oficial: /api/v1 e suporte direto à raiz /campanhas conforme CAM-T04
app.use("/api/v1", campanhaRoutes);
app.use("/", campanhaRoutes);

// Rota raiz de boas-vindas / metadados do serviço
app.get("/", (req, res) => {
  res.json({
    projeto: "DoaSync - Módulo de Campanhas",
    equipe: "Equipe 2 - Campanhas",
    status: "Servidor Ativo",
    documentacao: "/api/v1/health",
    rotasDisponiveis: [
      "GET /api/v1/health",
      "GET /api/v1/campanhas",
      "GET /api/v1/campanhas/:id"
    ]
  });
});

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint não encontrado na API do DoaSync." });
});

// Inicialização do servidor apenas se executado diretamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 DoaSync - Backend de Campanhas (Equipe 2)`);
    console.log(`📡 Servidor executando em: http://localhost:${PORT}`);
    console.log(`📌 Endpoints ativos:`);
    console.log(`   - GET http://localhost:${PORT}/api/v1/health`);
    console.log(`   - GET http://localhost:${PORT}/api/v1/campanhas`);
    console.log(`   - GET http://localhost:${PORT}/api/v1/campanhas/:id`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
